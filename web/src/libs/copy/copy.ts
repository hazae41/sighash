import { useCallback, useState } from "react"

export function useCopy(text?: string) {
  const [current, setCurrent] = useState(false)

  const run = useCallback(async () => {
    try {
      if (!text)
        return

      await navigator.clipboard.writeText(text)

      setCurrent(true)

      setTimeout(() => {
        setCurrent(false)
      }, 600)
    } catch { }
  }, [text])

  return { current, run }
}