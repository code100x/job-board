"use client"
import * as React from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function JobCarouselCard() {
  return (
    <Card className="w-full max-w-2xl sm:max-w-2xl mx-auto hover:cursor-pointer bg-gradient-to-r from-blue-100 to-indigo-400 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center p-4">
        <div className="w-12 h-12 mr-4">  
          <Image
            src="/components/next.svg"
            className="rounded-full bg-white"
            width={60}
            height={60}
            alt=""
          />
        </div>
        <div className="flex-grow">
          <CardHeader className="p-2">
            <CardTitle className="text-lg font-medium text-left">
              Superteam -- <span className="font-bold">Blockchain Developer</span>
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex flex-col sm:flex-row sm:justify-between text-base text-black  text-left">
                <div>$100k+, Full Time, Marketing</div>
                <div>Bangalore, 4 days ago</div>
              </div>
            </CardDescription>
          </CardHeader>
        </div>
      </div>
    </Card>
  )
}
