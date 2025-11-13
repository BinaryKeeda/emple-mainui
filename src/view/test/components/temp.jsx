import {
  LockClosed16Filled,
  CheckmarkSquare20Filled,
  ArrowNext20Filled
} from '@fluentui/react-icons'
import { ArrowRight } from '@mui/icons-material'

const Stepper = ({ test, current, startSection }) => {
  return (
    <main className='max-w-5xl w-full mx-auto py-10'>
      <div className='flex justify-center items-center px-4'>
        {test.map((s, index) => {
          let status
          if (current === -1) {
            status = index === 0 ? 'unlocked' : 'locked'
          } else if (index < current) {
            status = 'done'
          } else if (index === current) {
            status = 'unlocked'
          } else {
            status = 'locked'
          }

          const isClickable = status === 'unlocked'

          return (
            <div key={index} className='flex items-center relative'>
              {/* Left line */}
              {index !== 0 && (
                <div className='flex items-center'>
                  <div className='w-10 h-0.5 bg-gray-300 mr-3'></div>
                  <ArrowRight />
                </div>
              )}

              {/* Step */}
              <div className='flex flex-col items-center text-center group relative'>
                {/* Dot */}
                <div
                  onClick={() => {
                    if (isClickable) startSection()
                  }}
                  className={`w-10 h-10 z-10 rounded-full flex items-center justify-center border-4 transition-all duration-300
                    ${
                      status === 'done'
                        ? 'bg-green-500 border-green-500 text-white'
                        : status === 'unlocked'
                        ? 'bg-blue-500 border-blue-500 text-white cursor-pointer'
                        : 'bg-gray-300 border-gray-300 text-white cursor-not-allowed'
                    }`}
                >
                  {status === 'done' ? (
                    <CheckmarkSquare20Filled className='w-5 h-5' />
                  ) : status === 'locked' ? (
                    <LockClosed16Filled className='w-5 h-5' />
                  ) : (
                    <ArrowNext20Filled className='w-5 h-5' />
                  )}
                </div>

                {/* Labels */}
                <div className='mt-2 w-32'>
                  <h2 className='text-sm font-medium truncate'>{s.title}</h2>
                  <p className='text-xs text-gray-500 capitalize'>{s.type}</p>
                  <p className='text-xs text-gray-600'>
                    {s?.questions?.length || s?.problems?.length} Questions –{' '}
                    {s.maxTime} min
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className='text-sm text-center text-gray-600 mt-6'>
        Note: All sections are mandatory to attempt for your submission to be
        counted.
      </p>
    </main>
  )
}

export default Stepper
