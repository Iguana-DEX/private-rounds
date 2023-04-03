import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  GroupInfoChanged,
  NewGroupCreated,
  OwnershipTransferred
} from "../generated/PrivateGroupFactory/PrivateGroupFactory"

export function createGroupInfoChangedEvent(
  groupId: BigInt,
  groupName: string,
  groupDescription: string,
  groupImageUrl: string,
  groupInfoUrl: string
): GroupInfoChanged {
  let groupInfoChangedEvent = changetype<GroupInfoChanged>(newMockEvent())

  groupInfoChangedEvent.parameters = new Array()

  groupInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  groupInfoChangedEvent.parameters.push(
    new ethereum.EventParam("groupName", ethereum.Value.fromString(groupName))
  )
  groupInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "groupDescription",
      ethereum.Value.fromString(groupDescription)
    )
  )
  groupInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "groupImageUrl",
      ethereum.Value.fromString(groupImageUrl)
    )
  )
  groupInfoChangedEvent.parameters.push(
    new ethereum.EventParam(
      "groupInfoUrl",
      ethereum.Value.fromString(groupInfoUrl)
    )
  )

  return groupInfoChangedEvent
}

export function createNewGroupCreatedEvent(
  groupId: BigInt,
  groupAddress: Address,
  groupCreator: Address
): NewGroupCreated {
  let newGroupCreatedEvent = changetype<NewGroupCreated>(newMockEvent())

  newGroupCreatedEvent.parameters = new Array()

  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  newGroupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupAddress",
      ethereum.Value.fromAddress(groupAddress)
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
