import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NewGroupCreated,
  OwnershipTransferred
} from "../generated/PrivateGroupsFactory/PrivateGroupsFactory"

export function createNewGroupCreatedEvent(
  groupAddress: Address,
  groupName: string,
  groupId: BigInt,
  groupCreator: Address
): NewGroupCreated {
  let newGroupCreatedEvent = changetype<NewGroupCreated>(newMockEvent())

  newGroupCreatedEvent.parameters = new Array()

  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupAddress",
      ethereum.Value.fromAddress(groupAddress)
    )
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam("groupName", ethereum.Value.fromString(groupName))
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupCreator",
      ethereum.Value.fromAddress(groupCreator)
    )
  )

  return newGroupCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
