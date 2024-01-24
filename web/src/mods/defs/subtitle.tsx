"use client";

import { useAllSignaturesCount } from "../entities/signatures/data";

export function Subtitle() {
  const countQuery = useAllSignaturesCount()
  const maybeCount = countQuery.current?.ok().get()

  return <h1 className="text-contrast">
    {maybeCount == null &&
      <>Already indexing 1,000,000 function signatures</>}
    {maybeCount != null &&
      <>Already indexing {maybeCount.toLocaleString("en-US")} function signatures</>}
  </h1>
}
