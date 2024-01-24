"use client";

import { useCopy } from "@/libs/copy/copy";
import { Outline } from "@/libs/heroicon";
import { SignatureData } from "./data";

export function SignatureRow(props: { data: SignatureData }) {
  const { data } = props

  const copyText = useCopy(data.text)
  const copyHash = useCopy(data.hash)

  return <div className="bg-contrast po-md rounded-xl">
    <div className="flex items-center">
      <input className="w-full bg-transparent outline-none"
        readOnly
        value={data.text} />
      <div className="w-2 grow" />
      <button className=""
        onClick={copyText.run}>
        {copyText.current
          ? <Outline.CheckIcon className="size-4" />
          : <Outline.ClipboardIcon className="size-4" />}
      </button>
    </div>
    <div className="flex items-center">
      <div className="text-contrast">
        {data.hash}
      </div>
      <div className="w-2 grow" />
      <button className=""
        onClick={copyHash.run}>
        {copyHash.current
          ? <Outline.CheckIcon className="size-4" />
          : <Outline.ClipboardIcon className="size-4" />}
      </button>
    </div>
  </div>
}