import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewGroupCreated } from "../generated/schema"
import { NewGroupCreated as NewGroupCreatedEvent } from "../generated/PrivateGroupsFactory/PrivateGroupsFactory"
import { handleNewGroupCreated } from "../src/private-groups-factory"
import { createNewGroupCreatedEvent } from "./private-groups-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let groupAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let groupName = "Example string value"
    let groupId = BigInt.fromI32(234)
    let groupCreator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newNewGroupCreatedEvent = createNewGroupCreatedEvent(
      groupAddress,
      groupName,
      groupId,
      groupCreator
    )
    handleNewGroupCreated(newNewGroupCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewGroupCreated created and stored", () => {
    assert.entityCount("NewGroupCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewGroupCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewGroupCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupName",
      "Example string value"
    )
    assert.fieldEquals(
      "NewGroupCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupId",
      "234"
    )
    assert.fieldEquals(
      "NewGroupCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupCreator",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
