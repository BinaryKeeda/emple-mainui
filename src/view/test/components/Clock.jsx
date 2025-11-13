import { Clock20Regular } from '@fluentui/react-icons'

const Clock = ({ timeLeft }) => (
  
    Number.MAX_SAFE_INTEGER == timeLeft ? 
      <>
        <div className='flex border-2  rounded-full border-t-transparent border-black h-4 w-4 animate-spin'></div>
      </>
     : (
      <div className='flex gap-4 items-center py-1 px-2 bg-gray-100 text-gray-700 rounded-md shadow-sm font-medium'>
        <div className='flex items-center gap-1 text-sm'>
          <Clock20Regular />
          <span>
            {String(Math.floor(timeLeft / 3600000)).padStart(2, '0')}:
            {String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2, '0')}:
            {String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')}
          </span>
        </div>
      </div>
    )
  
)
export default Clock
