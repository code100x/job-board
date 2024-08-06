'use client'
import { FaGoogle } from 'react-icons/fa6'
import { Button } from './button'
 
const LoginWithGoogleButton = () => {
  return (
    <div  >
    <Button className='bg-violet-500   '>
        <span className="flex items-center text-md gap-2">
          <FaGoogle  className='h-5 w-5 '/>
          Login with Google
        </span>
      </Button>
    </div>
      
  )
}

export default LoginWithGoogleButton