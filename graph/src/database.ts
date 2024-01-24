import { BigInt } from "@graphprotocol/graph-ts"
import { Added as AddedEvent } from "../generated/Database/Database"
import { Added, Global } from "../generated/schema"

function getGlobal(): Global {
  let global = Global.load("1")

  if (!global) {
    global = new Global("1")
    global.count = BigInt.fromI32(0)
  }

  return global as Global
}

export function handleAdded(event: AddedEvent): void {
  const entity = new Added(event.transaction.hash.concatI32(event.logIndex.toI32()))
  const global = getGlobal()

  entity.no = global.count
  entity.hash = event.params.hash
  entity.text = event.params.text
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  global.count = global.count.plus(BigInt.fromI32(1))
  global.save()
}
