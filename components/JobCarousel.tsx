"use client"
import React from 'react'
import { JobCarouselCard } from './JobCarouselCard'
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function JobCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
        plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[410px] sm:h-[360px] md:h-[240px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 basis-3 sm:basis-1/3 md:basis-1/2">
            <div>
        <JobCarouselCard/>
        </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default JobCarousel