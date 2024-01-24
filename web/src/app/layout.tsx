import "@/styles/index.css";

import { Loader } from "@/mods/defs/loader";

import { Home } from "@/mods/defs/home";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sighash",
  description: "Ethereum function signature database",
};

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props

  return <html lang="en">
    <body>
      <Loader />
      <Home>
        {children}
      </Home>
    </body>
  </html>
}