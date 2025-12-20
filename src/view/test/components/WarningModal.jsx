import React, { useState } from 'react'
import { useEffect } from 'react'

export const colorMap = {
  red: {
    bg: 'bg-red-100',
    icon: 'text-red-600',
    button: 'bg-red-600 hover:bg-red-500',
    text: 'text-red-800'
  },
  yellow: {
    bg: 'bg-yellow-100',
    icon: 'text-yellow-600',
    button: 'bg-yellow-600 hover:bg-yellow-500',
    text: 'text-yellow-800'
  },
  green: {
    bg: 'bg-green-100',
    icon: 'text-green-600',
    button: 'bg-green-600 hover:bg-green-500',
    text: 'text-green-800'
  }
}

const WarningModal = ({
  count = 1,
  warning = 'Are you sure you want to proceed?',
  title = 'Warning',
  color = 'green',
  justCame,
  onConfirm
}) => {
  const styles = colorMap[color] || colorMap.yellow



  return (
    <>
      <div className='fixed inset-0 z-[9999] overflow-y-auto'>
        <div
          className='fixed inset-0  bg-gray-500/75 transition-opacity'
        />

        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div
                  className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${styles.bg} sm:mx-0 sm:size-10`}
                >
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    className={`size-6 ${styles.icon}`}
                    aria-hidden='true'
                  >
                    <path
                      d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className={`text-base font-semibold ${styles.text}`}
                    id='dialog-title'
                  >
                    {title}
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-700'>{warning}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              {justCame ? (
                <>
                  <button
                    onClick={onConfirm}
                    className={`inline-flex cursor-pointer w-full justify-center rounded-md ${styles.button} px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto`}
                  >
                    Switch to Full Screen
                  </button>
                </>
              ) : (
                <button
                  onClick={onConfirm}
                  className={`inline-flex cursor-pointer w-full justify-center rounded-md ${styles.button} px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto`}
                >
                  Close 
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WarningModal
