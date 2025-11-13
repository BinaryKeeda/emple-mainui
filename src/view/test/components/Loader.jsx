export default function Loader () {
  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='fixed inset-0 bg-gray-500/75 transition-opacity' />
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs'>
          <div className='bg-white py-7'>
            <div className='mt-3 text-center flex items-center justify-center gap-5 sm:mt-0 sm:text-left'>
              <h3 className={`text-base font-medium `} id='dialog-title'>
                Loading
              </h3>
              <div className='animate-spin rounded-full h-7 w-7 border-t-transparent border-2 border-gray-900'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
