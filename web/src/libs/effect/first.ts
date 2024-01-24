"use client";

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useEffectButNotFirstTime(effect: EffectCallback, deps?: DependencyList) {
  const first = useRef(true)

  return useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}