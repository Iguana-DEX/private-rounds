import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/PrivateRounds/PrivateRounds"

export function createInvestorClaimedTokensEvent(
  roundId: BigInt,
  investorAddress: Address,
  amount: BigInt
): InvestorClaimedTokens {
  let investorClaimedTokensEvent = changetype<InvestorClaimedTokens>(
    newMockEvent()
  )

  investorClaimedTokensEvent.parameters = new Array()

  investorClaimedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  investorClaimedTokensEvent.parameters.push(
    new ethereum.EventParam(
      "investorAddress",
      ethereum.Value.fromAddress(investorAddress)
    )
  )
  investorClaimedTokensEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return investorClaimedTokensEvent
}

export function createInvestorRefundedEvent(
  roundId: BigInt,
  caller: Address,
  amount: BigInt
): InvestorRefunded {
  let investorRefundedEvent = changetype<InvestorRefunded>(newMockEvent())

  investorRefundedEvent.parameters = new Array()

  investorRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  investorRefundedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  investorRefundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return investorRefundedEvent
}

export function createNewRoundCreatedEvent(
  groupAddress: Address,
  roundId: BigInt,
  target: BigInt,
  groupAllocation: BigInt,
  startAt: BigInt,
  endAt: BigInt
): NewRoundCreated {
  let newRoundCreatedEvent = changetype<NewRoundCreated>(newMockEvent())

  newRoundCreatedEvent.parameters = new Array()

  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupAddress",
      ethereum.Value.fromAddress(groupAddress)
    )
  )
  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromUnsignedBigInt(target))
  )
  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupAllocation",
      ethereum.Value.fromUnsignedBigInt(groupAllocation)
    )
  )
  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startAt",
      ethereum.Value.fromUnsignedBigInt(startAt)
    )
  )
  newRoundCreatedEvent.parameters.push(
    new ethereum.EventParam("endAt", ethereum.Value.fromUnsignedBigInt(endAt))
  )

  return newRoundCreatedEvent
}

export function createPledgedEvent(
  roundId: BigInt,
  caller: Address,
  amount: BigInt
): Pledged {
  let pledgedEvent = changetype<Pledged>(newMockEvent())

  pledgedEvent.parameters = new Array()

  pledgedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  pledgedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  pledgedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return pledgedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createRoundCanceledEvent(roundId: BigInt): RoundCanceled {
  let roundCanceledEvent = changetype<RoundCanceled>(newMockEvent())

  roundCanceledEvent.parameters = new Array()

  roundCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )

  return roundCanceledEvent
}

export function createRoundInfoChangedEvent(
  groupAddress: Address,
  roundId: BigInt,
  roundTitle: string,
  roundStory: string,
  roundImageUrl: string,
  roundInfoUrl: string
): RoundInfoChanged {
  let roundInfoChangedEvent = changetype<RoundInfoChanged>(newMockEvent())

  roundInfoChangedEvent.parameters = new Array()

  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "groupAddress",
      ethereum.Value.fromAddress(groupAddress)
    )
  )
  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam("roundTitle", ethereum.Value.fromString(roundTitle))
  )
  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam("roundStory", ethereum.Value.fromString(roundStory))
  )
  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "roundImageUrl",
      ethereum.Value.fromString(roundImageUrl)
    )
  )
  roundInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "roundInfoUrl",
      ethereum.Value.fromString(roundInfoUrl)
    )
  )

  return roundInfoChangedEvent
}

export function createTokensDepositedEvent(
  roundId: BigInt,
  tokenAddress: Address,
  amount: BigInt
): TokensDeposited {
  let tokensDepositedEvent = changetype<TokensDeposited>(newMockEvent())

  tokensDepositedEvent.parameters = new Array()

  tokensDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  tokensDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokensDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensDepositedEvent
}

export function createTokensWithdrawnEvent(
  roundId: BigInt,
  tokenAddress: Address,
  amount: BigInt
): TokensWithdrawn {
  let tokensWithdrawnEvent = changetype<TokensWithdrawn>(newMockEvent())

  tokensWithdrawnEvent.parameters = new Array()

  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensWithdrawnEvent
}

export function createTotalEthWithdrawnEvent(
  roundId: BigInt
): TotalEthWithdrawn {
  let totalEthWithdrawnEvent = changetype<TotalEthWithdrawn>(newMockEvent())

  totalEthWithdrawnEvent.parameters = new Array()

  totalEthWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )

  return totalEthWithdrawnEvent
}

export function createUnpledgedEvent(
  roundId: BigInt,
  caller: Address,
  amount: BigInt
): Unpledged {
  let unpledgedEvent = changetype<Unpledged>(newMockEvent())

  unpledgedEvent.parameters = new Array()

  unpledgedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  unpledgedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  unpledgedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unpledgedEvent
}
