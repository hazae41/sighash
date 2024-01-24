"use client";

import { SearchLoader } from "@/mods/defs/search";
import { useAllSignatures } from "@/mods/entities/signatures/data";
import { SignatureRow } from "@/mods/entities/signatures/row";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function Page(props: { params: { slug?: string[] } }) {
  const { params } = props
  const { slug = [] } = params
  const [rawOffset] = slug

  const offset = useMemo(() => {
    if (rawOffset == null)
      return 0
    return parseInt(rawOffset)
  }, [rawOffset])

  const signaturesQuery = useAllSignatures(offset)
  const triedSignatures = signaturesQuery.current

  return <SearchLoader>
    <NavBar
      offset={offset}
      count={triedSignatures?.ok().get()?.length} />
    <div className="h-4" />
    {triedSignatures == null &&
      <div className="font-medium">
        Loading...
      </div>}
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
    <div className="h-4" />
    <NavBar
      offset={offset}
      count={triedSignatures?.ok().get()?.length} />
  </SearchLoader>
}

function NavBar(props: { offset: number, count?: number }) {
  const router = useRouter()
  const { offset, count } = props

  const onNext = useCallback(() => {
    router.push(`/all/${offset + 20}`)
  }, [router, offset])

  const onPrevious = useCallback(() => {
    router.push(`/all/${Math.max(0, offset - 20)}`)
  }, [router, offset])

  return <div className="flex justify-center">
    <button className="po-sm bg-contrast rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={offset === 0}
      onClick={onPrevious}>
      Previous
    </button>
    <div className="grow" />
    <button className="po-sm bg-contrast rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={count == null || count < 20}
      onClick={onNext}>
      Next
    </button>
  </div>
}