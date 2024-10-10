"use client"
import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '../components/SearchBar'
export default function Home() {
  return (
   
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      <h1>This is the kiosk mode</h1>
      
      <SearchBar/>
        
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        <p> This is a project made by William Steqvist</p>
      </footer>
    </div>
  )
}
