import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes } from "@graphprotocol/graph-ts"
import { Added } from "../generated/Database/Database"

export function createAddedEvent(hash: Bytes, text: string): Added {
  let addedEvent = changetype<Added>(newMockEvent())

  addedEvent.parameters = new Array()

  addedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytes(hash))
  )
  addedEvent.parameters.push(
    new ethereum.EventParam("text", ethereum.Value.fromString(text))
  )

  return addedEvent
}
