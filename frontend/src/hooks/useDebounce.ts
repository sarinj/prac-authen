import { useRef } from 'react'

type TimeoutType = ReturnType<typeof setTimeout>

export function useDebounce() {
  const timeout = useRef<number | TimeoutType | undefined>(undefined)

  return {
    debounce: (callback: () => void, duration: number) => {
      clearTimeout(timeout.current as TimeoutType)
      timeout.current = setTimeout(() => {
        if (typeof callback === 'function') {
          callback()
        }
      }, duration)
    },
  }
}
