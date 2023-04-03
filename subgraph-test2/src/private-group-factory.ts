import {
  GroupInfoChanged as GroupInfoChangedEvent,
  NewGroupCreated as NewGroupCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from '../generated/PrivateGroupFactory/PrivateGroupFactory';
import {
  GroupInfoChanged,
  NewGroupCreated,
  OwnershipTransferred,
} from '../generated/schema';

// Added by Styliann
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
  // Added by Styliann
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

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
