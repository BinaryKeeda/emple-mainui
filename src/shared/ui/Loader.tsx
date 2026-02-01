import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <div className='animate-spin duration-300 flex justify-center items-center h-screen w-screen top-0 left-0 bg-white z-[999]'>
        <Loader2/>
    </div>
  )
}
