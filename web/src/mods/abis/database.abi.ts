import { Abi } from "@hazae41/cubane"

export namespace DatabaseAbi {
  export const get = Abi.FunctionSelectorAndArguments.create(Abi.FunctionSelector.from([98,162,207,12]),Abi.Tuple.create(Abi.Bytes4))
  export const add = Abi.FunctionSelectorAndArguments.create(Abi.FunctionSelector.from([176,200,249,220]),Abi.Tuple.create(Abi.String))
}

export namespace BatcherAbi {
  export const add = Abi.FunctionSelectorAndArguments.create(Abi.FunctionSelector.from([221,23,86,145]),Abi.Tuple.create(Abi.Vector.create(Abi.String)))
}
