import {
  GroupInfoChanged as GroupInfoChangedEvent,
  NewGroupCreated as NewGroupCreatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from '../generated/PrivateGroupFactory/PrivateGroupFactory';
import {
  GroupInfoChanged,
  NewGroupCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from '../generated/schema';
import { PrivateRounds } from '../generated/templates';

export function handleGroupInfoChanged(event: GroupInfoChangedEvent): void {
  let entity = new GroupInfoChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.groupId = event.params.groupId;
  entity.groupName = event.params.groupName;
  entity.groupDescription = event.params.groupDescription;
  entity.groupImageUrl = event.params.groupImageUrl;
  entity.groupInfoUrl = event.params.groupInfoUrl;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewGroupCreated(event: NewGroupCreatedEvent): void {
  PrivateRounds.create(event.params.groupAddress);

  let entity = new NewGroupCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.groupId = event.params.groupId;
  entity.groupAddress = event.params.groupAddress;
  entity.groupCreator = event.params.groupCreator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
