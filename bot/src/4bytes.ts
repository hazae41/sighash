import { TransactionResponse, ethers } from "ethers"

interface Page {
  "next": string,
  "previous": null,
  "count": number,
  "results": Element[]
}

interface Element {
  "id": number
  "text_signature": string
  "bytes_signature": string,
  "hex_signature": string,
}

const gnosis = new ethers.JsonRpcProvider("https://rpc.ankr.com/gnosis")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, gnosis)

const abi = [
  {
    "inputs": [
      {
        "internalType": "contract Database",
        "name": "_database",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "texts",
        "type": "string[]"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

const batcher = new ethers.Contract("0x43CD01f6FcA80eE204d69F5F16393cE56CBA631E", abi, wallet)

let nonce = await wallet.getNonce()

const txs: TransactionResponse[] = []

async function doFetch(url = "https://www.4byte.directory/api/v1/signatures/?page=1") {
  while (true) {
    try {
      console.log(`[${new Date().toLocaleString()}]`, "Fetching", url)
      const res = await fetch(url)

      if (!res.ok)
        throw new Error(await res.text())

      const page = await res.json() as Page
      const names = page.results.map(e => e.text_signature).filter(e => e.length <= 4096)

      if (txs.length > 10) {
        const receipt = await txs.shift()?.wait()

        if (receipt == null)
          throw new Error("Receipt is null")

        if (receipt.logs.length < 100) {
          console.log(`[${new Date().toLocaleString()}]`, "Done")
          return
        }
      }

      while (true) {
        const feeData = await gnosis.getFeeData()

        console.log(`[${new Date().toLocaleString()}]`, "Gas price", feeData.gasPrice)

        if (feeData.gasPrice == null) {
          console.log(`[${new Date().toLocaleString()}]`, "Can't fetch gas price")
          await new Promise(resolve => setTimeout(resolve, 60 * 1000))
          continue
        }

        // if (feeData.gasPrice > (20n * (10n ** 8n))) {
        //   console.log(`[${new Date().toLocaleString()}]`, "Gas price too high", feeData.gasPrice, (16n * (10n ** 8n)))
        //   await new Promise(resolve => setTimeout(resolve, 60 * 1000))
        //   continue
        // }

        break
      }

      console.log(`[${new Date().toLocaleString()}]`, "Nonce", nonce)
      txs.push(await batcher.add(names, { nonce }))

      nonce++

      if (page.next == null) {
        console.log(`[${new Date().toLocaleString()}]`, "Done")
        return
      }

      url = page.next
    } catch (e: unknown) {
      console.error(`[${new Date().toLocaleString()}]`, "An error occured")
      await new Promise(resolve => setTimeout(resolve, 60 * 1000))
    }
  }
}

await doFetch()