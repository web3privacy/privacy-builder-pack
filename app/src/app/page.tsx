"use client"
import CoreComponents from "@/components/CoreComponents"
import Hero from "@/components/Hero"
import GetStarted from "@/components/GetStarted"

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#030303] flex flex-col items-center
        bg-no-repeat bg-[url('/bg1.webp')] bg-bottom-left
        bg-size-[370px_auto] md:bg-size-[500px_auto] min-[960px]:bg-size-[600px_auto] lg:bg-size-[800px_auto]"
    >
      <Hero />
      <div className="relative flex flex-col gap-8 items-center sm:items-start p-6 px-4 sm:px-6 pb-20 sm:p-20 container mt-20 lg:mt-40 xl:mt-60">
        <CoreComponents />
        <GetStarted />
      </div>
    </main>
  )
}
