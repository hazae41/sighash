"use client";

import { SearchLoader } from "@/mods/defs/search";
import { useSignaturesByHash } from "@/mods/entities/signatures/data";
import { SignatureRow } from "@/mods/entities/signatures/row";
import { ZeroHexString } from "@hazae41/cubane";
import { useMemo } from "react";

export default function Page(props: { params: { slug?: string[] } }) {
  const { params } = props
  const { slug = [] } = params
  const [rawSearch = ""] = slug

  const hash = useMemo(() => {
    if (!ZeroHexString.is(rawSearch))
      return
    return rawSearch
  }, [rawSearch])

  const signaturesQuery = useSignaturesByHash(hash)
  const triedSignatures = signaturesQuery.current

  return <SearchLoader search={rawSearch}>
    {triedSignatures?.isErr() && <>
      <div className="font-medium">
        An error occurred
      </div>
      <div className="text-contrast">
        {triedSignatures.getErr().message}
      </div>
    </>}
    {triedSignatures?.isOk() &&
      <div className="flex flex-col gap-2">
        {triedSignatures.get().map((data) =>
          <SignatureRow key={data.text} data={data} />)}
      </div>}
  </SearchLoader>
}