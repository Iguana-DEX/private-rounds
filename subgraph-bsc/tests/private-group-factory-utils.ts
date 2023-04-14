import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  GroupInfoChanged,
  NewGroupCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
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
