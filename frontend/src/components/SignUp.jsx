import React from 'react'
import { Input } from './ui/input'
import ButtonGradient from './ButtonGradient'

const SignUp = ({ active }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
    absolute top-0 left-[60%] h-[100%] w-[40%] form_transition z-[5] 
    ${active == 'login' && 'translate-x-[-150%] opacity-0 z-[1]'}
    ${active == 'reset_password' && 'translate-x-0 opacity-0 z-[1]'}`}>
      <div>
        <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Create Account</h1>
        <div className='text-[14px] opacity-60'>Use your email for registration</div>
      </div>
      <form className='flex flex-col gap-[10px] w-[100%]'>              
        <Input type="text" placeholder="Full name" className='w-[100%]' />
        <Input type="email" placeholder="Email" className='w-[100%]' />
        <Input type="password" placeholder="Password" className='w-[100%]' />
      </form>
      <ButtonGradient text={'Sign up'} className={'w-[100px]'} />
    </div>
  )
}

export default SignUp
