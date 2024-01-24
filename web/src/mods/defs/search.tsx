"use client";

import { Nullable, Optional } from "@hazae41/option";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface SearchHandle {
  readonly search: Optional<string>
  setSearch(search: Optional<string>): void
}

export const SearchContext = createContext<Nullable<SearchHandle>>(undefined)

export function SearchProvider(props: { children: ReactNode }) {
  const { children } = props

  const [search, setSearch] = useState<string>()

  const handle = { search, setSearch }

  return <SearchContext.Provider value={handle}>
    {children}
  </SearchContext.Provider>
}

export function SearchLoader(props: { children?: ReactNode } & { search?: string }) {
  const { children, search } = props

  const { setSearch } = useContext(SearchContext)!

  useEffect(() => {
    setSearch(search)
  }, [search, setSearch])

  return <>{children}</>
}

export function SearchBar(props: {}) {
  const router = useRouter()
  const { search, setSearch } = useContext(SearchContext)!

  const [rawSearch = ""] = [useMemo(() => {
    if (search == null)
      return
    return decodeURI(search)
  }, [search])]

  const onRawSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)

    if (search == null)
      router.push(`/search/${encodeURI(event.target.value)}`)
    else
      router.replace(`/search/${encodeURI(event.target.value)}`)
  }, [router, search, setSearch])

  return <div className="po-md bg-contrast rounded-xl">
    <input className="w-full outline-none bg-transparent"
      placeholder="0xa9059cbb"
      value={rawSearch}
      onChange={onRawSearchChange} />
  </div>
}