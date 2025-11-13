import {
  LockClosed16Filled,
  CheckmarkSquare20Filled,
  ArrowNext20Filled
} from '@fluentui/react-icons'

const Stepper = ({ test, current, startSection }) => {
  return (
    <main className='max-w-5xl w-full mx-auto pt-10'>
      <div className='flex gap-7 justify-center items-center px-4'>
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
            <div
              key={index}
              className='relative flex flex-col items-center text-center group'
            >
              {/* Connector line (except for the first dot) */}
              {index !== 0 && (
                <div className='absolute -left-[50%]  top-5 w-[80%] h-[2px] bg-gray-300 z-0'></div>
              )}

              {/* Dot */}
              <div
                // onClick={() => {
                //   if (isClickable) startSection()
                // }}
                className={`w-13 h-13 z-10 rounded-full flex items-center justify-center border-4 transition-all duration-300
                ${
                  status === 'done'
                    ? 'bg-green-500 border-green-500 text-white'
                    : status === 'unlocked'
                    ? 'bg-blue-500 border-blue-500 text-white cursor-'
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
