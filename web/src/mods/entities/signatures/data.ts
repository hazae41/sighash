import { DatabaseAbi } from "@/mods/abis/database.abi"
import { Abi, ZeroHexString } from "@hazae41/cubane"
import { Data, Fail, Fetched, createQuery, useError, useFetch, useQuery } from "@hazae41/glacier"
import { RpcRequest, RpcResponse } from "@hazae41/jsonrpc"
import { Nullable } from "@hazae41/option"
import { Catched } from "@hazae41/result"

export interface SignatureData {
  readonly text: string
  readonly hash: ZeroHexString
}

export type GraphResponse<T> =
  | GraphOk<T>
  | GraphErr

export interface GraphOk<T> {
  readonly data: T
}

export interface GraphErr {
  readonly error: {
    readonly message: string
  }
}

export namespace Signature {

  export namespace All {

    export namespace Count {

      export type Key = string
      export type Data = bigint
      export type Fail = Error

      export function key() {
        return `signatures/all/count`
      }

      export function schema() {
        const fetcher = async () => {
          try {
            const query = `{\n  globals(first: 1) {\n    count\n  }\n}`

            const headers = { "Content-Type": "application/json" }
            const body = JSON.stringify({ query })

            const res = await fetch("https://api.thegraph.com/subgraphs/name/hazae41/sighash", { method: "POST", headers, body })

            if (!res.ok)
              throw new Error(await res.text())

            const response = await res.json() as GraphResponse<{ globals: [{ count: string }] }>

            if ("error" in response)
              throw new Error(response.error.message)

            return new Data(BigInt(response.data.globals[0].count))
          } catch (e: unknown) {
            return new Fail(Catched.from(e))
          }
        }

        return createQuery<Key, Data, Error>({
          key: key(),
          fetcher
        })
      }

    }

    export type Key = string
    export type Data = SignatureData[]
    export type Fail = Error

    export function key(offset: number) {
      return `signatures/all/${offset}`
    }

    export function schema(offset: Nullable<number>) {
      if (offset == null)
        return

      const fetcher = async () => {
        try {
          const query = `{\n  addeds(first: 20, skip: ${offset}) {\n    hash\n    text\n  }\n}`

          const headers = { "Content-Type": "application/json" }
          const body = JSON.stringify({ query })

          const res = await fetch("https://api.thegraph.com/subgraphs/name/hazae41/sighash", { method: "POST", headers, body })

          if (!res.ok)
            throw new Error(await res.text())

          const response = await res.json() as GraphResponse<{ addeds: SignatureData[] }>

          if ("error" in response)
            throw new Error(response.error.message)

          return new Data(response.data.addeds)
        } catch (e: unknown) {
          return new Fail(Catched.from(e))
        }
      }

      return createQuery<Key, Data, Error>({
        key: key(offset),
        fetcher
      })
    }

  }

  export namespace ByHash {

    export type Key = string
    export type Data = SignatureData[]
    export type Fail = Error

    export function key(hash: ZeroHexString) {
      return `signatures/${hash}`
    }

    export function schema(hash: Nullable<ZeroHexString>) {
      if (hash == null)
        return

      const fetcher = async () => {
        try {
          const request = new RpcRequest(0, "eth_call", [{
            to: "0xBB59B5Cc543746A16011BC011F4db742F918672F",
            data: Abi.encodeOrThrow(DatabaseAbi.get.from(hash))
          }])

          const headers = { "Content-Type": "application/json" }
          const body = JSON.stringify(request)

          const res = await fetch("https://gnosis.publicnode.com", { method: "POST", headers, body })

          if (!res.ok)
            throw new Error(await res.text())

          const response = RpcResponse.from<ZeroHexString>(await res.json())

          if (response.isErr())
            return Fetched.rewrap(response)

          const abi = Abi.Tuple.create(Abi.Vector.create(Abi.String))
          const [texts] = Abi.decodeOrThrow(abi, response.get()).intoOrThrow()

          return new Data(texts.map(text => ({ text, hash } as const)))
        } catch (e: unknown) {
          return new Fail(Catched.from(e))
        }
      }

      return createQuery<Key, Data, Error>({
        key: key(hash),
        fetcher
      })
    }

  }

}

export function useSignaturesByHash(hash: Nullable<ZeroHexString>) {
  const query = useQuery(Signature.ByHash.schema, [hash])
  useFetch(query)
  useError(query, console.error)
  return query
}

export function useAllSignatures(offset: Nullable<number>) {
  const query = useQuery(Signature.All.schema, [offset])
  useFetch(query)
  useError(query, console.error)
  return query
}

export function useAllSignaturesCount() {
  const query = useQuery(Signature.All.Count.schema, [])
  useFetch(query)
  useError(query, console.error)
  return query
}