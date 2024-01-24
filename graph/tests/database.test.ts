import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes } from "@graphprotocol/graph-ts"
import { Added } from "../generated/schema"
import { Added as AddedEvent } from "../generated/Database/Database"
import { handleAdded } from "../src/database"
import { createAddedEvent } from "./database-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let hash = Bytes.fromI32(1234567890)
    let text = "Example string value"
    let newAddedEvent = createAddedEvent(hash, text)
    handleAdded(newAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Added created and stored", () => {
    assert.entityCount("Added", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Added",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hash",
      "1234567890"
    )
    assert.fieldEquals(
      "Added",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "text",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
