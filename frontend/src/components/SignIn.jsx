import React from 'react'
import { Input } from './ui/input'
import ButtonGradient from './ButtonGradient'
import ButtonUnderscore from './ButtonUnderscore'

const SignIn = ({ active, handleClick }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
    absolute top-0 left-[60%] h-[100%] w-[40%] z-[3] opacity-0 form_transition 
    ${active == 'login' && 'opacity-100 translate-x-[-150%] z-[5]'}`}>
      <div>
        <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Sign In</h1>
        <div className='text-[14px] opacity-60'>Use your email to log in to account</div>
      </div>
      <form className='flex flex-col gap-[10px] w-[100%]'>              
        <Input type="email" placeholder="Email" className='w-[100%]' />
        <Input type="password" placeholder="Password" className='w-[100%]' />
      </form>
      <div onClick={() => handleClick('reset_password')}>
        <ButtonUnderscore text={'Forgot your password?'} className={'text-[#7B6CEA] p-0 h-auto'} />
      </div>
      <ButtonGradient text={'Sign in'} className={'w-[100px]'} />
    </div>
  )
}

export default SignIn
