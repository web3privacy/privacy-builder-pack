import Image from "next/image"
import { useState } from "react"
import CoreComponentCard from "@/components/CoreComponentCard"
import coreComponents from "@/data/coreComponents.json"
import { useScreenSize } from "@/hooks/useScreenSize"
import { useDecryptAnimation } from "@/hooks/useDecryptAnimation"

export default function CoreComponents() {
  const [isHovered, setIsHovered] = useState(false)
  const isSmallScreen = useScreenSize()

  const originalTitle = "Core Components"
  const glitchedTitle = "©¢w§¶Ï"
  const displayTitle = useDecryptAnimation(originalTitle, glitchedTitle, isHovered)

  return (
    <div className="relative w-full flex flex-col gap-8">
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 bg-no-repeat bg-contain
          right-[-100px] top-[-90px] w-[370px] h-[370px]
          md:right-[-50px] md:top-[-140px] md:w-[500px] md:h-[500px]
          min-[960px]:top-[-170px] min-[960px]:right-[-200px]  min-[960px]:w-[600px] min-[960px]:h-[600px]
          lg:top-[-350px] lg:w-[900px] lg:h-[1000px] lg:right-[-50px]"
        style={{ backgroundImage: "url(/bg0.webp)" }}
      />
      <div
        className="relative z-10 w-full flex gap-2 space-x-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <Image
          src="/icons/locker.svg"
          alt="Core Components"
          width={28}
          height={28}
          className="w-auto h-auto"
        />
        <h1 className="text-white text-2xl font-bold">
          {isSmallScreen ? originalTitle : displayTitle}
        </h1>
      </div>
      <div className="relative z-10 target-div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {coreComponents.map((component) => (
          <CoreComponentCard key={component.title} component={component} />
        ))}
      </div>
    </div>
  )
}
