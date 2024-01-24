import { SearchLoader } from "@/mods/defs/search"
import { ReactNode } from "react"

export default function Page() {
  return <SearchLoader>
    <Card title={`What's a function signature?`}>
      {`Function calls in the Ethereum Virtual Machine are specified by the first four bytes of data sent with a transaction. These 4-byte signatures are defined as the first four bytes of the Keccak hash (SHA3) of the canonical representation of the function signature. Since this is a one-way operation, it is not possible to derive the human-readable representation of the function or event from the bytes signature. This database is meant to allow mapping those bytes signatures back to their human-readable versions.`}
    </Card>
    <div className="h-4" />
    <Card title={`How is this website different from 4Bytes and similar websites?`}>
      {`Those websites are not decentralized and you can only access their data through their API. This website uses public data freely available on the Gnosis chain and indexed by The Graph. This means any developer can access the data by using its favorite RPC and won't be limited by an API that may throttle or go down.`}
    </Card>
    <div className="h-4" />
    <Card title={`How to add a signature?`}>
      {`You can call the add(text) function on the database contract.`}
      <a className="block text-violet-500 truncate"
        target="_blank" rel="noreferrer"
        href="https://gnosisscan.io/address/0xbb59b5cc543746a16011bc011f4db742f918672f#writeContract">
        https://gnosisscan.io/address/0xbb59b5cc543746a16011bc011f4db742f918672f#writeContract
      </a>
      <div className="h-2" />
      {`You can also add multiple signatures at once using the batcher contract.`}
      <a className="block text-violet-500 truncate"
        target="_blank" rel="noreferrer"
        href="https://gnosisscan.io/address/0x43cd01f6fca80ee204d69f5f16393ce56cba631e#writeContract">
        https://gnosisscan.io/address/0x43cd01f6fca80ee204d69f5f16393ce56cba631e#writeContract
      </a>
    </Card>
    <div className="h-4" />
    <Card title={`How to resolve a signature?`}>
      {`You can call the get(hash) function on the database contract.`}
      <a className="block text-violet-500 truncate"
        target="_blank" rel="noreferrer"
        href="https://gnosisscan.io/address/0xbb59b5cc543746a16011bc011f4db742f918672f#readContract">
        https://gnosisscan.io/address/0xbb59b5cc543746a16011bc011f4db742f918672f#readContract
      </a>
      {`It will return all the signatures that match the hash.`}
    </Card>
  </SearchLoader>
}

function Card(props: { title: string } & { children: ReactNode }) {
  const { title, children } = props

  return <div className="bg-contrast p-4 rounded-xl">
    <div className="font-medium">
      {title}
    </div>
    <div className="h-2" />
    <div className="text-contrast">
      {children}
    </div>
  </div>
}