'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface LogoProps{
    className?: string
}

export function Logo ({className}: LogoProps) {
  return (
    <div>
        <Link href="/">
          <h3 className={cn(`${className} bg-red-400 animate-text-gradient text-xl font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-400 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-600 dark:to-neutral-400`)}>
            100xJobs
          </h3>
        </Link>
    </div>
  )
}
