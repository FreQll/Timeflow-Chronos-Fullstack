import ButtonGradient from '@/components/buttons/ButtonGradient';
import ButtonUnderscore from '@/components/buttons/ButtonUnderscore';
import ResetPassword from '@/components/auth/ResetPassword';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

const Auth = () => {
  const [active, setActive] = useState(null);

  const handleClick = (name) => {
    setActive(active => name);
  }

  return (
    <div className='w-[100vw] h-[100vh] bg_gradient flex align-center justify-center'>
        <div className='relative min-w-[900px] min-h-[500px] self-center bg-white rounded-[10px] overflow-hidden box_shadow'>

          <div className={`absolute top-0 left-[0] h-[100%] w-[60%] bg-[url(../../public/images/form_bg.png)] bg-cover form_transition z-[8]
          ${active == 'login' && 'translate-x-[67%]'}`}></div>

          <div className={`absolute top-0 left-[0] h-[100%] w-[100%] bg-white form_transition z-[2]`}></div>

          <SignUp active={active} setActive={setActive} />
          <SignIn active={active} handleClick={handleClick} />
          <ResetPassword active={active} />


          <div className={`flex flex-col gap-[20px] py-[20px] px-[40px] mt-[10%] text-left
          absolute top-0 left-0 h-[100%] w-[60%] form_transition z-[10] 
          ${active == 'login' && 'translate-x-[-100%] opacity-0'}
          ${active == 'reset_password' && 'translate-x-[-100%] opacity-0'}`}>
            <div>
              <h1 className='uppercase text-white font-[600] text-[36px]'>Join our calendar</h1>
              <div className='text-[14px] opacity-60 text-white'>
              Simply fill out the registration form and start organizing your life.
              </div>
            </div>
            <div className='flex gap-[10px] items-center'>
              <div className='text-white'>Already registered?</div>
              <div onClick={() => handleClick('login')}>
                <ButtonUnderscore text={'Sign in'} className={'text-white p-0'} />
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-[20px] py-[20px] px-[40px] mt-[10%] text-left
          absolute top-0 left-[100%] h-[100%] w-[60%] opacity-0 z-[10] form_transition ${active == 'login' && 'translate-x-[-100%] opacity-100'}`}>
            <div>
              <h1 className='uppercase text-white font-[600] text-[36px]'>Welcome back!</h1>
              <div className='text-[14px] opacity-60 text-white'>
                Enter your credentials and log in to your account to access your calendar.
              </div>
            </div>
            <div className='flex gap-[10px] items-center'>
              <div className='text-white'>New member?</div>
              <div onClick={() => handleClick('register')}>
                <ButtonUnderscore text={'Sign up'} className={'text-white p-0'} />
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-[20px] py-[20px] px-[40px] mt-[10%] text-left
          absolute top-0 left-[-60%] h-[100%] w-[60%] form_transition z-[9] opacity-0 ${active == 'reset_password' && 'translate-x-[100%] opacity-100'}`}>
            <div>
              <h1 className='uppercase text-white font-[600] text-[36px]'>Forgot your password?</h1>
              <div className='text-[14px] opacity-60 text-white'>
                No worries, we've got you covered. Enter your email address to get six-digit code, reset your password and regain access to your calendar.
              </div>
            </div>
            <div className='flex gap-[10px] items-center'>
              <div className='text-white'>Remember your password?</div>
              <div onClick={() => handleClick('login')}>
                <ButtonUnderscore text={'Sign in'} className={'text-white p-0'} />
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Auth
