import { useScreenSize } from "@/hooks/useScreenSize"
import { useState } from "react"
import { useDecryptAnimation } from "@/hooks/useDecryptAnimation"
import TerminalCursor from "@/components/TerminalCursor"
import VideoPlayer from "@/components/VideoPlayer"
import Link from "next/link"

const title = "Privacy Builder Pack"
const subtitle = "Your toolkit for digital sovereignty in the surveillance age"

const glitchedTitle = ">¸¯íº)]z³ٲO"
const glitchedSubtitle = "b«¶%+_¢·b+Zȯz·¢{r{az˫½襕©۹¨"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const isSmallScreen = useScreenSize()

  const displayTitle = useDecryptAnimation(title, glitchedTitle, isHovered)
  const displaySubtitle = useDecryptAnimation(subtitle, glitchedSubtitle, isHovered, 20)

  return (
    <section className="relative w-full overflow-hidden flex flex-col pt-18 sm:pt-0 sm:min-h-[min(56.25vw,100vh)] sm:justify-center">
      <div className="relative w-full h-[56.25vw] mb-14 shrink-0 sm:mb-0 sm:absolute sm:inset-0 sm:h-auto sm:w-auto">
        <VideoPlayer />
      </div>
      <div
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 bg-black/60 pointer-events-none"
      />
      <div
        className="relative container mx-auto flex flex-col items-start p-6 px-4 sm:px-6 sm:p-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
          {isSmallScreen ? title : displayTitle}
          <TerminalCursor />
        </h1>
        <p className="text-lg xl:text-xl">{isSmallScreen ? subtitle : displaySubtitle}</p>
        <div className="flex space-x-4 mt-6">
          <Link
            href="#get-started"
            className="bg-white text-black px-4 sm:px-12 py-2 rounded-md disabled:opacity-50 cursor-pointer disabled:hover:cursor-default text-xs sm:text-base hover-shine"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/web3privacy/privacy-builder-pack"
            className="bg-white text-black px-4 sm:px-12 py-2 rounded-md disabled:opacity-50 cursor-pointer disabled:hover:cursor-default text-xs sm:text-base hover-shine"
          >
            Documentation
          </Link>
        </div>
      </div>
    </section>
  )
}
