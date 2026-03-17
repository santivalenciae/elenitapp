import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

const soundCache = {}

export function useSound(src, options = {}) {
  const soundRef = useRef(null)

  useEffect(() => {
    if (!src) return
    if (!soundCache[src]) {
      soundCache[src] = new Howl({ src: [src], volume: options.volume ?? 0.5, ...options })
    }
    soundRef.current = soundCache[src]
  }, [src])

  const play = () => soundRef.current?.play()
  const stop = () => soundRef.current?.stop()

  return { play, stop }
}
