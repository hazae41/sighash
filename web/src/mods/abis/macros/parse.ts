import "@hazae41/symbol-dispose-polyfill"

import { Cubane } from "@hazae41/cubane"
import { Keccak256 } from "@hazae41/keccak256"

export function $parse$(signature: string): any {
  return (async () => {
    Keccak256.set(Keccak256.fromNoble())
    return Cubane.Abi.FunctionSignature.$parse$(signature)
  })() as any
}