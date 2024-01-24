import Link from "next/link"
import { ReactNode } from "react"
import { SearchBar, SearchProvider } from "./search"
import { Subtitle } from "./subtitle"

export function Home(props: { children?: ReactNode }) {
  const { children } = props

  return <SearchProvider>
    <main className="grow w-full flex flex-col p-8 overflow-y-scroll">
      <div className="grow w-full flex flex-col m-auto max-w-xl">
        <div className="h-[35vh]" />
        <Title />
        <div className="h-1" />
        <Subtitle />
        <div className="h-2" />
        <SearchBar />
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <LinkChip href="/">Home</LinkChip>
          <LinkChip href="/all">Recents</LinkChip>
          <LinkChip href="/faq">FAQ</LinkChip>
        </div>
        <div className="h-8" />
        {children}
      </div>
    </main>
  </SearchProvider>
}

export function Title() {
  return <h1 className="text-5xl font-bold">
    Sighash
  </h1>
}

export function LinkChip(props: { children: ReactNode } & { href: string }) {
  const { children, href } = props

  return <Link className="bg-contrast rounded-full px-2"
    href={href}>
    {children}
  </Link>
}