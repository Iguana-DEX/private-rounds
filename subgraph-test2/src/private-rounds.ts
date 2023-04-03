import {
  InvestorClaimedTokens as InvestorClaimedTokensEvent,
  InvestorRefunded as InvestorRefundedEvent,
  NewRoundCreated as NewRoundCreatedEvent,
  Pledged as PledgedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  RoundCanceled as RoundCanceledEvent,
  RoundInfoChanged as RoundInfoChangedEvent,
  TokensDeposited as TokensDepositedEvent,
  TokensWithdrawn as TokensWithdrawnEvent,
  TotalEthWithdrawn as TotalEthWithdrawnEvent,
  Unpledged as UnpledgedEvent
} from "../generated/PrivateRounds/PrivateRounds"
import {
  InvestorClaimedTokens,
  InvestorRefunded,
  NewRoundCreated,
  Pledged,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RoundCanceled,
  RoundInfoChanged,
  TokensDeposited,
  TokensWithdrawn,
  TotalEthWithdrawn,
  Unpledged
} from "../generated/schema"

export function handleInvestorClaimedTokens(
  event: InvestorClaimedTokensEvent
): void {
  let entity = new InvestorClaimedTokens(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.investorAddress = event.params.investorAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInvestorRefunded(event: InvestorRefundedEvent): void {
  let entity = new InvestorRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.caller = event.params.caller
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRoundCreated(event: NewRoundCreatedEvent): void {
  let entity = new NewRoundCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupAddress = event.params.groupAddress
  entity.roundId = event.params.roundId
  entity.target = event.params.target
  entity.groupAllocation = event.params.groupAllocation
  entity.startAt = event.params.startAt
  entity.endAt = event.params.endAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePledged(event: PledgedEvent): void {
  let entity = new Pledged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.caller = event.params.caller
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundCanceled(event: RoundCanceledEvent): void {
  let entity = new RoundCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundInfoChanged(event: RoundInfoChangedEvent): void {
  let entity = new RoundInfoChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupAddress = event.params.groupAddress
  entity.roundId = event.params.roundId
  entity.roundTitle = event.params.roundTitle
  entity.roundStory = event.params.roundStory
  entity.roundImageUrl = event.params.roundImageUrl
  entity.roundInfoUrl = event.params.roundInfoUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensDeposited(event: TokensDepositedEvent): void {
  let entity = new TokensDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.tokenAddress = event.params.tokenAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensWithdrawn(event: TokensWithdrawnEvent): void {
  let entity = new TokensWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.tokenAddress = event.params.tokenAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTotalEthWithdrawn(event: TotalEthWithdrawnEvent): void {
  let entity = new TotalEthWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpledged(event: UnpledgedEvent): void {
  let entity = new Unpledged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.caller = event.params.caller
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
