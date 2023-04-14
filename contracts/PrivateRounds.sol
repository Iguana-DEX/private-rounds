// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.9;

/// @title PrivateRounds - MEMBER_ROLE holders pledge eth in exchange for tokens
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
    event Pledged(
        address groupAddress,
        uint32 indexed roundId,
        address indexed caller,
        uint amount
    );
    event Unpledged(
        address groupAddress,
        uint32 indexed roundId,
        address indexed caller,
        uint amount
    );
    event TotalEthPledgedChanged(
        address groupAddress,
        uint32 indexed roundId,
        uint totalEthPledged
    );
    event TotalEthWithdrawn(uint32 indexed roundId);
    event InvestorRefunded(
        address groupAddress,
        uint32 indexed roundId,
        address indexed caller,
        uint amount
    );
    event TokensDeposited(
        address groupAddress,
        uint32 indexed roundId,
        address tokenAddress,
        uint amount
    );
    event InvestorClaimedTokens(
        address groupAddress,
        uint32 indexed roundId,
        address investorAddress,
        uint amount
    );
    event TokensWithdrawn(
        address groupAddress,
        uint32 indexed roundId,
        address tokenAddress,
        uint amount
    );

    struct Round {
        uint target;
        uint groupAllocation;
        uint maxPledge;
        uint totalEthPledged;
        uint32 startAt;
        uint32 endAt;
        bool isEthClaimed;
        uint totalTokensReceived;
        address tokenAddress;
    }

    uint32 public numOfRounds;
    string public groupName;
    mapping(uint => Round) public rounds;
    mapping(uint => mapping(address => uint)) public pledgedAmounts;

    // Investor addresses must be granted MEMBER_ROLE by contract deployer
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    constructor(address _groupCreator, string memory _groupName) {
        // Contract deployer gets DEFAULT_ADMIN_ROLE
        _grantRole(DEFAULT_ADMIN_ROLE, _groupCreator);
        _grantRole(MEMBER_ROLE, _groupCreator);

        groupName = _groupName;
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
        require(_target >= 0.5 ether, "target < 1 ETH");
        require(_target <= _groupAllocation, "target > groupAllocation");

        rounds[numOfRounds] = Round({
            target: _target,
            groupAllocation: _groupAllocation,
            maxPledge: _maxPledge,
            totalEthPledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            isEthClaimed: false,
            totalTokensReceived: 0,
            tokenAddress: address(0)
        });

        emit NewRoundCreated(
            address(this),
            numOfRounds,
            _target,
            _groupAllocation,
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

    function pledge(uint32 _roundId) external payable onlyRole(MEMBER_ROLE) {
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
            pledgedAmounts[_roundId][msg.sender] + msg.value <= round.maxPledge,
            "cumulative pledge > maxPledge"
        );
        require(
            round.totalEthPledged + msg.value <= round.groupAllocation,
            "exceeds groupAllocation"
        );

        round.totalEthPledged += msg.value;
        pledgedAmounts[_roundId][msg.sender] += msg.value;

        emit Pledged(address(this), _roundId, msg.sender, msg.value);
        emit TotalEthPledgedChanged(
            address(this),
            _roundId,
            round.totalEthPledged
        );
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

        round.totalEthPledged -= amountToUnpledge;
        pledgedAmounts[_roundId][msg.sender] -= amountToUnpledge;

        (bool sent, ) = payable(msg.sender).call{value: amountToUnpledge}("");

        if (!sent) {
            revert TxUnsuccessful();
        }

        emit Unpledged(address(this), _roundId, msg.sender, amountToUnpledge);
        emit TotalEthPledgedChanged(
            address(this),
            _roundId,
            round.totalEthPledged
        );
    }

    function withdrawTotalEthPledged(
        uint32 _roundId
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalEthPledged >= round.target, "round failed");
        require(!round.isEthClaimed, "already claimed");

        round.isEthClaimed = true;

        uint iguanaFee = (round.totalEthPledged * 80) / 10_000;

        (bool sent, ) = payable(0xE6ae1e6B67ad5D92F9a16B4CcaB45210DA43c8Da)
            .call{value: iguanaFee}("");

        (bool sent2, ) = payable(msg.sender).call{
            value: round.totalEthPledged - iguanaFee
        }("");

        if (!sent || !sent2) {
            revert TxUnsuccessful();
        }

        emit TotalEthWithdrawn(_roundId);
    }

    function refund(uint32 _roundId) external {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalEthPledged < round.target, "round succeeded");

        uint balance = pledgedAmounts[_roundId][msg.sender];
        pledgedAmounts[_roundId][msg.sender] = 0;

        require(balance > 0, "nothing to refund");

        (bool sent, ) = payable(msg.sender).call{value: balance}("");

        if (!sent) {
            revert TxUnsuccessful();
        }

        emit InvestorRefunded(address(this), _roundId, msg.sender, balance);
    }

    function depositTokens(
        uint32 _roundId,
        address _tokenAddress,
        uint _amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalEthPledged >= round.target, "round failed");
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

        emit TokensDeposited(address(this), _roundId, _tokenAddress, _amount);
    }

    function withdrawTokens(
        uint32 _roundId
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Round storage round = rounds[_roundId];

        require(block.timestamp > round.endAt, "not ended");
        require(round.totalEthPledged >= round.target, "round failed");
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
            address(this),
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
            round.totalTokensReceived) / round.totalEthPledged;

        pledgedAmounts[_roundId][msg.sender] = 0;
        bool sentTokens = IERC20(round.tokenAddress).transfer(
            msg.sender,
            tokensToBeClaimed
        );

        if (!sentTokens) {
            revert TxUnsuccessful();
        }

        emit InvestorClaimedTokens(
            address(this),
            _roundId,
            msg.sender,
            tokensToBeClaimed
        );
    }

    function getTotalEthPledged(
        uint32 _roundId
    ) external view returns (uint totalEthPledged) {
        return rounds[_roundId].totalEthPledged;
    }

    function getPledgedAmount(
        uint32 _roundId,
        address memberAddress
    ) external view returns (uint amountPledged) {
        return pledgedAmounts[_roundId][memberAddress];
    }

    function grantMemberRole(
        address[] memory newMemberAddresses
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint32 i = 0; i < newMemberAddresses.length; i++) {
            _grantRole(MEMBER_ROLE, newMemberAddresses[i]);
        }
    }

    function revokeMemberRole(
        address[] memory oldMemberAddresses
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint32 i = 0; i < oldMemberAddresses.length; i++) {
            _revokeRole(MEMBER_ROLE, oldMemberAddresses[i]);
        }
    }
}
