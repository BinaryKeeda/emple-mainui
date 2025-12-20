import {
  LockClosed16Filled,
  CheckmarkSquare20Filled,
  ArrowNext20Filled
} from '@fluentui/react-icons';
import { Stepper } from '@mui/material';

const MainScreen = ({ test, current, startSection }) => {
  return (
    <section className='bg-gradient-to-r mt-[60px] from-sky-50 to-sky-100 h-[calc(100vh-60px)] w-screen mx-auto flex flex-col items-center space-y-6 px-4 py-8'>
      {/* Stepper */}
      <Stepper test={test} current={current} startSection={startSection} />

      {/* Section Header */}
      <h2 className='text-xl font-semibold text-gray-700 mt-6'>
        Upcoming Sections
      </h2>

      {/* Section Cards */}
      <div className='w-full max-w-3xl space-y-4'>
        {test.map((s, index) => {
          let status;
          if (current === -1) {
            status = index === 0 ? 'unlocked' : 'locked';
          } else if (index < current) {
            status = 'done';
          } else if (index === current) {
            status = 'unlocked';
          } else {
            status = 'locked';
          }

          return (
            <div
              key={index}
              onClick={() => {
                if (status === 'unlocked') {
                  startSection();
                }
              }}
              className={`w-full z-50 flex items-center justify-between px-6 py-4 rounded-lg shadow-md border-l-4 transition-all duration-200
                ${status === 'done' ? 'border-green-500 bg-green-50' : ''}
                ${status === 'unlocked' ? 'border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer' : ''}
                ${status === 'locked' ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
              `}
            >
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>{s.title}</h2>
                <span className='text-sm capitalize text-gray-500'>{s.type}</span>
                <span className='text-sm text-gray-800'>
                  {s?.questions?.length || s?.problems?.length} Questions for {s.maxTime} minutes
                </span>

                {status === 'unlocked' && (
                  <span className='text-sm text-blue-600 mt-1'>
                    👉 Click to attempt this section
                  </span>
                )}
              </div>

              <div className='ml-4'>
                {status === 'locked' ? (
                  <LockClosed16Filled className='w-5 h-5' />
                ) : status === 'done' ? (
                  <CheckmarkSquare20Filled className='w-5 h-5 text-green-600' />
                ) : (
                  <ArrowNext20Filled className='w-5 h-5 text-blue-600' />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Note */}
      <p className='text-sm text-center text-gray-600 max-w-xl'>
        Note: All sections are mandatory to attempt for your submission to be counted.
      </p>
    </section>
  );
};

export default MainScreen;
