

import React from 'react'

export default function UnlockProFeatures() {
  return (
    <div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md py-8 px-8 text-center h-[450px]'>
      {/* Rocket Icon */}
      <div className='text-5xl mb-3'>
        🚀
      </div>
      
      {/* Title */}
      <h2 className='text-xl font-bold text-gray-800 mb-3'>
        Unlock Pro Features
      </h2>
      
      {/* Description */}
      <p className='text-gray-500 text-sm mb-5 max-w-xs leading-relaxed'>
        Get unlimited access to premium content, advanced analytics, and exclusive features!
      </p>
      
      {/* Upgrade Button */}
      <button className='bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'>
        Upgrade Now
      </button>
    </div>
  )
}
