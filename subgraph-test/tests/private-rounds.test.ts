import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { InvestorClaimedTokens } from "../generated/schema"
import { InvestorClaimedTokens as InvestorClaimedTokensEvent } from "../generated/PrivateRounds/PrivateRounds"
import { handleInvestorClaimedTokens } from "../src/private-rounds"
import { createInvestorClaimedTokensEvent } from "./private-rounds-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let roundId = BigInt.fromI32(234)
    let investorAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newInvestorClaimedTokensEvent = createInvestorClaimedTokensEvent(
      roundId,
      investorAddress,
      amount
    )
    handleInvestorClaimedTokens(newInvestorClaimedTokensEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("InvestorClaimedTokens created and stored", () => {
    assert.entityCount("InvestorClaimedTokens", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "InvestorClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "roundId",
      "234"
    )
    assert.fieldEquals(
      "InvestorClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "investorAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "InvestorClaimedTokens",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
