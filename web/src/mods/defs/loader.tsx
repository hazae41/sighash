"use client";

import { Keccak256 } from "@hazae41/keccak256";
import { useEffect } from "react";

export function Loader() {
  useEffect(() => {
    Keccak256.set(Keccak256.fromNoble())
  }, [])

  return null
}