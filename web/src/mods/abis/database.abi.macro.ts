/**
 * @macro delete-next-lines
 */
import { $parse$ } from "./macros/parse";

function $pre$() {
  return `import { Abi } from "@hazae41/cubane"`
}

$pre$()

export namespace DatabaseAbi {
  export const get = $parse$("get(bytes4)")
  export const add = $parse$("add(string)")
}

export namespace BatcherAbi {
  export const add = $parse$("add(string[])")
}
