import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NewGroupCreated,
  OwnershipTransferred
} from "../generated/PrivateGroupFactory/PrivateGroupFactory"

export function createNewGroupCreatedEvent(
  groupAddress: Address,
  groupName: string,
  groupId: BigInt,
  groupCreator: Address,
  groupDescription: string,
  groupImageUrl: string,
  groupInfoUrl: string
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
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupDescription",
      ethereum.Value.fromString(groupDescription)
    )
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupImageUrl",
      ethereum.Value.fromString(groupImageUrl)
    )
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupInfoUrl",
      ethereum.Value.fromString(groupInfoUrl)
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
