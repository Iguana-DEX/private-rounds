import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { GroupInfoChanged } from "../generated/schema"
import { GroupInfoChanged as GroupInfoChangedEvent } from "../generated/PrivateGroupFactory/PrivateGroupFactory"
import { handleGroupInfoChanged } from "../src/private-group-factory"
import { createGroupInfoChangedEvent } from "./private-group-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let groupId = BigInt.fromI32(234)
    let groupName = "Example string value"
    let groupDescription = "Example string value"
    let groupImageUrl = "Example string value"
    let groupInfoUrl = "Example string value"
    let newGroupInfoChangedEvent = createGroupInfoChangedEvent(
      groupId,
      groupName,
      groupDescription,
      groupImageUrl,
      groupInfoUrl
    )
    handleGroupInfoChanged(newGroupInfoChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GroupInfoChanged created and stored", () => {
    assert.entityCount("GroupInfoChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GroupInfoChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupId",
      "234"
    )
    assert.fieldEquals(
      "GroupInfoChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupName",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfoChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupDescription",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfoChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupImageUrl",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfoChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupInfoUrl",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
