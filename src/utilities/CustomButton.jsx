import { GoogleLogo } from '../components/Logo/GoogleLogo'
import { BASE_URL } from '../lib/config'
import { useCurrentPath } from './useCurrentPath'

export const CustomButton = ({ title, size }) => {
  return (
    <>
      <button
        className={`bg-[rgba(29,30,32,1)] text-gray-200 rounded-md p-2 w-[${size}] `}
      >
        {title}
      </button>
    </>
  )
}

export const GoogleAuthenticationButton = () => {
  const path = useCurrentPath()

  const handleGoogleAuth = () => {
    const d =localStorage.setItem('redirect_req', path)
    console.log(d);

    window.location.href = BASE_URL + '/auth/google'
  }

  return (
    <div className='flex justify-center items-center'>
      <a
        className='text-gray-200 w-full justify-center flex gap-3 bg-black hover:bg-black/60 transition-all duration-75 text-sm items-center px-4 py-3 rounded-md'
        onClick={handleGoogleAuth}
      >
        Continue with Google
        <GoogleLogo
          sx={{
            border: '1px solid #ccc',
            borderRadius: '50%',
            padding: '5px',
            fontSize: 26
          }}
          color='inherit'
        />
      </a>
    </div>
  )
}
