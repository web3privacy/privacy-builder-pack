"use client"
import { useEffect, useRef, useState, type ChangeEvent } from "react"

const POSTER_SRC =
  "https://okay-green-rodent.myfilebase.com/ipfs/QmXyDYGxmivom2vaxLtYf89yNbMPrbRDxZ5nmqVFdJgxuP"
const VIDEO_DESKTOP_SRC =
  "https://okay-green-rodent.myfilebase.com/ipfs/QmS1H28Xj4KoVmwVmc8mfChLBSqSsuwag3M5WQxRxJZtmy"
const VIDEO_MOBILE_SRC =
  "https://okay-green-rodent.myfilebase.com/ipfs/QmRh8c3Y6MEkt8AxmLXBAfZwTpWNSmZQZDw9hgMqkV81bQ"
const DESKTOP_MEDIA = "(min-width: 768px)"
const TITLE = "Privacy Builder Pack intro"

type VideoWithIOSFullscreen = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void
}

export default function VideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    const onLoad = () => setPageLoaded(true)
    if (document.readyState === "complete") {
      queueMicrotask(onLoad)
      return
    }
    window.addEventListener("load", onLoad, { once: true })
    return () => window.removeEventListener("load", onLoad)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !pageLoaded) return

    video.load()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          video.play().catch(() => {})
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [pageLoaded])

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().catch(() => {})
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return
    video.volume = v
    if (video.muted && v > 0) {
      video.muted = false
      setMuted(false)
    }
    setVolume(v)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
      return
    }
    const container = containerRef.current
    const video = videoRef.current as VideoWithIOSFullscreen | null
    if (container?.requestFullscreen) {
      container.requestFullscreen().catch(() => {
        video?.webkitEnterFullscreen?.()
      })
    } else {
      video?.webkitEnterFullscreen?.()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`bg-black ${
        fullscreen
          ? "relative w-full h-full flex items-center justify-center overflow-hidden"
          : "absolute inset-0"
      }`}
    >
      <video
        ref={videoRef}
        aria-label={TITLE}
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-contain"
        onPlay={() => {
          setPlaying(true)
          userPausedRef.current = false
        }}
        onPause={() => {
          setPlaying(false)
          if (!userPausedRef.current) {
            videoRef.current?.play().catch(() => {})
          }
        }}
      >
        {pageLoaded && (
          <>
            <source src={VIDEO_DESKTOP_SRC} type="video/mp4" media={DESKTOP_MEDIA} />
            <source src={VIDEO_MOBILE_SRC} type="video/mp4" />
          </>
        )}
      </video>

      <div className="absolute right-3 top-full mt-2 sm:top-auto sm:mt-0 sm:bottom-3 flex items-center gap-2 z-10">
        <div className="relative group">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="flex items-center justify-center h-11 w-11 rounded bg-black/40 hover:bg-black/60 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green transition"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91c-.36.15-.58.53-.58.92c0 .72.73 1.18 1.39.91c.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 1 0 1.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0M19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87c0-3.83-2.4-7.11-5.78-8.4c-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12m-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7M16.5 12A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1m13.5 2A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02M14 3.23v.41c0 .38.25.71.6.85C17.18 5.54 19 8.06 19 11s-1.82 5.46-4.4 6.5c-.36.14-.6.47-.6.85v.41c0 .63.63 1.07 1.21.85C18.6 18.25 21 14.92 21 11s-2.4-7.25-5.79-8.6c-.58-.23-1.21.22-1.21.85" />
              </svg>
            )}
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto">
            <div className="px-2 py-3 rounded bg-black/70">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={onVolumeChange}
                aria-label="Volume"
                style={{ writingMode: "vertical-lr", direction: "rtl" }}
                className="h-24 w-2 cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="flex items-center justify-center h-11 w-11 rounded bg-black/40 hover:bg-black/60 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green transition"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="flex items-center justify-center h-11 w-11 rounded bg-black/40 hover:bg-black/60 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green transition"
        >
          {fullscreen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
