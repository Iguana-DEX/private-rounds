// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.9;

/// @title PrivateRoundsv1 - MEMBER_ROLE holders pledge stablecoins in exchange for tokens
/// @author styliann.eth <ns2808@proton.me>

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Custom errors
error RoundNotStarted(uint startAt, uint blockTimestamp);
error RoundEnded(uint endAt, uint blockTimestamp);
error TxUnsuccessful();

contract PrivateRounds is AccessControl {
    event NewRoundCreated(
        address groupAddress,
        uint32 roundId,
        uint target,
        uint groupAllocation,
        uint maxPledge,
        uint32 startAt,
        uint32 endAt
    );
    event RoundInfoChanged(
        address groupAddress,
        uint32 roundId,
        string roundTitle,
        string roundStory,
        string roundImageUrl,
        string roundInfoUrl
    );
    event RoundCanceled(uint32 roundId);
    event Pledged(uint32 indexed roundId, address indexed caller, uint amount);
    event Unpledged(
        uint32 indexed roundId,
        address indexed caller,
        uint amount
    );
    event TotalUsdPledgedChanged(uint32 indexed roundId, uint totalEthPledged);
    event TotalUsdWithdrawn(uint32 indexed roundId);
    event InvestorRefunded(
        uint32 indexed roundId,
        address indexed caller,
        uint amount
    );
    event TokensDeposited(
        uint32 indexed roundId,
        address tokenAddress,
        uint amount
    );
    event InvestorClaimedTokens(
        uint32 indexed roundId,
        address investorAddress,
        uint amount
    );
    event TokensWithdrawn(
        uint32 indexed roundId,
        address tokenAddress,
        uint amount
    );

    struct Round {
        uint target;
        uint groupAllocation;
        uint maxPledge;
        uint totalUsdPledged;
        uint32 startAt;
        uint32 endAt;
        bool isUsdClaimed;
        uint totalTokensReceived;
        address tokenAddress;
    }

    uint32 public numOfRounds;
    string public groupName;
    IERC20 public stablecoinContract;
    mapping(uint => Round) public rounds;
    mapping(uint => mapping(address => uint)) public pledgedAmounts;

    // Investor addresses must be granted MEMBER_ROLE by contract deployer
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    constructor(string memory _groupName, address _stablecoinAddress) {
        // Contract deployer gets DEFAULT_ADMIN_ROLE
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MEMBER_ROLE, msg.sender);

        groupName = _groupName;
        stablecoinContract = IERC20(_stablecoinAddress);
    }

    function createNewRound(
        uint _target,
        uint _groupAllocation,
        uint _maxPledge,
        uint32 _startAt,
        uint32 _endAt,
        string memory _roundTitle,
        string memory _roundStory,
        string memory _roundImageUrl,
        string memory _roundInfoUrl
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_startAt >= block.timestamp, "start at < now");
        require(_endAt >= _startAt, "end at < start at");
        require(_endAt <= block.timestamp + 90 days, "end at is too far");
        require(_target <= _groupAllocation, "target > groupAllocation");

        rounds[numOfRounds] = Round({
            target: _target,
            groupAllocation: _groupAllocation,
            maxPledge: _maxPledge,
            totalUsdPledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            isUsdClaimed: false,
            totalTokensReceived: 0,
            tokenAddress: address(0)
        });

        emit NewRoundCreated(
            address(this),
            numOfRounds,
            _target,
            _groupAllocation,
            _maxPledge,
            _startAt,
            _endAt
        );
        emit RoundInfoChanged(
            address(this),
            numOfRounds,
            _roundTitle,
            _roundStory,
            _roundImageUrl,
            _roundInfoUrl
        );

        numOfRounds += 1;
    }

    function changeRoundInfo(
        uint32 _roundId,
        string memory _roundTitle,
        string memory _roundStory,
        string memory _roundImageUrl,
        string memory _roundInfoUrl
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        emit RoundInfoChanged(
            address(this),
            _roundId,
            _roundTitle,
            _roundStory,
            _roundImageUrl,
            _roundInfoUrl
        );
    }

    function cancelRound(
        uint32 _roundId
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round memory round = rounds[_roundId];
        require(block.timestamp < round.startAt, "started");
        delete rounds[_roundId];
        emit RoundCanceled(_roundId);
    }

    function pledge(
        uint32 _roundId,
        uint _amount
    ) external onlyRole(MEMBER_ROLE) {
        Round storage round = rounds[_roundId];

        if (block.timestamp < round.startAt)
            revert RoundNotStarted({
                startAt: round.startAt,
                blockTimestamp: block.timestamp
            });

        if (block.timestamp > round.endAt)
            revert RoundEnded({
                endAt: round.endAt,
                blockTimestamp: block.timestamp
            });

        require(
            pledgedAmounts[_roundId][msg.sender] + _amount <= round.maxPledge,
            "cumulative pledge > maxPledge"
        );
        require(
            round.totalUsdPledged + _amount <= round.groupAllocation,
            "exceeds groupAllocation"
        );

        bool received = stablecoinContract.transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        if (!received) {
            revert TxUnsuccessful();
        }

        round.totalUsdPledged += _amount;
        pledgedAmounts[_roundId][msg.sender] += _amount;

        emit Pledged(_roundId, msg.sender, _amount);
        emit TotalUsdPledgedChanged(_roundId, round.totalUsdPledged);
    }

    function unpledge(
        uint32 _roundId,
        uint _amount
    ) external onlyRole(MEMBER_ROLE) {
        Round storage round = rounds[_roundId];
        require(block.timestamp <= round.endAt, "ended");

        uint pledgedAmountBySender = pledgedAmounts[_roundId][msg.sender];

        uint amountToUnpledge = _amount <= pledgedAmountBySender
            ? _amount
            : pledgedAmountBySender;

        round.totalUsdPledged -= amountToUnpledge;
        pledgedAmounts[_roundId][msg.sender] -= amountToUnpledge;

        bool received = stablecoinContract.transfer(
            msg.sender,
            amountToUnpledge
        );

        if (!received) {
            revert TxUnsuccessful();
        }

        emit Unpledged(_roundId, msg.sender, amountToUnpledge);
        emit TotalUsdPledgedChanged(_roundId, round.totalUsdPledged);
    }

    function withdrawTotalUsdPledged(
        uint32 _roundId
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalUsdPledged >= round.target, "round failed");
        require(!round.isUsdClaimed, "already claimed");

        round.isUsdClaimed = true;

        bool sent = stablecoinContract.transfer(
            msg.sender,
            round.totalUsdPledged
        );

        if (!sent) {
            revert TxUnsuccessful();
        }

        emit TotalUsdWithdrawn(_roundId);
    }

    function refund(uint32 _roundId) external {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalUsdPledged < round.target, "round succeeded");

        uint balance = pledgedAmounts[_roundId][msg.sender];
        pledgedAmounts[_roundId][msg.sender] = 0;

        require(balance > 0, "nothing to refund");

        bool sent = stablecoinContract.transfer(msg.sender, balance);

        if (!sent) {
            revert TxUnsuccessful();
        }

        emit InvestorRefunded(_roundId, msg.sender, balance);
    }

    function depositTokens(
        uint32 _roundId,
        address _tokenAddress,
        uint _amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalUsdPledged >= round.target, "round failed");
        require(round.totalTokensReceived == 0, "tokens already deposited");

        bool receivedTokens = IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        if (!receivedTokens) {
            revert TxUnsuccessful();
        }

        round.totalTokensReceived = _amount;
        round.tokenAddress = _tokenAddress;

        emit TokensDeposited(_roundId, _tokenAddress, _amount);
    }

    function withdrawTokens(
        uint32 _roundId
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalUsdPledged >= round.target, "round failed");
        require(round.totalTokensReceived > 0, "no tokens to withdraw");

        uint remainingTokenBalance = IERC20(round.tokenAddress).balanceOf(
            address(this)
        );
        bool sentTokens = IERC20(round.tokenAddress).transfer(
            msg.sender,
            remainingTokenBalance
        );

        if (!sentTokens) {
            revert TxUnsuccessful();
        }

        round.totalTokensReceived = 0;

        emit TokensWithdrawn(
            _roundId,
            round.tokenAddress,
            remainingTokenBalance
        );
    }

    function claimTokens(uint32 _roundId) external {
        Round storage round = rounds[_roundId];

        require(round.totalTokensReceived > 0, "still awaiting tokens");

        uint pledgedEthAmount = pledgedAmounts[_roundId][msg.sender];

        require(pledgedEthAmount > 0, "no claim");

        uint tokensToBeClaimed = (pledgedEthAmount *
            round.totalTokensReceived) / round.totalUsdPledged;

        pledgedAmounts[_roundId][msg.sender] = 0;
        bool sentTokens = IERC20(round.tokenAddress).transfer(
            msg.sender,
            tokensToBeClaimed
        );

        if (!sentTokens) {
            revert TxUnsuccessful();
        }

        emit InvestorClaimedTokens(_roundId, msg.sender, tokensToBeClaimed);
    }

    function getTotalUsdPledged(
        uint32 _roundId
    ) external view returns (uint totalUsdPledged) {
        return rounds[_roundId].totalUsdPledged;
    }
}
