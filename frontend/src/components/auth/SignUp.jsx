import React, { useState } from 'react'
import { Input } from '../ui/input'
import ButtonGradient from '../buttons/ButtonGradient'
import axios, { POST_CONFIG } from '../../../API/axios';
import { objToJson } from '../../../helper/stringFunc';
import { checkFormData } from '../../../helper/checkForm';

const SignUp = ({ active, setActive }) => {
  const [ fullName, setFullName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const clickSend = async (e) => {
    e.preventDefault();
    const data = {
      full_name: fullName,
      email: email,
      password: password,
    }

    if (checkFormData(data).message) {
      try {
        const response = await axios.post(`/api/user`, objToJson(data), POST_CONFIG);
        if (response) setActive('login');
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      console.log(checkFormData(data).error);
    }

  }

  return (
    <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
    absolute top-0 left-[60%] h-[100%] w-[40%] form_transition z-[5] 
    ${active == 'login' && 'translate-x-[-150%] opacity-0 z-[1]'}
    ${active == 'reset_password' && 'translate-x-0 opacity-0 z-[1]'}`}>
      <div>
        <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Create Account</h1>
        <div className='text-[14px] opacity-60'>Use your email for registration</div>
      </div>
      <form onSubmit={clickSend} className='flex flex-col gap-[20px] w-[100%] items-center'>
        <div className='flex flex-col gap-[10px] w-[100%]'>
          <Input type="text" onChange={handleChangeFullName} placeholder="Full name" className='w-[100%]' />
          <Input type="email" onChange={handleChangeEmail} placeholder="Email" className='w-[100%]' />
          <Input type="password" onChange={handleChangePassword} placeholder="Password" className='w-[100%]' />
        </div>
        <ButtonGradient text={'Sign up'} className={'w-[100px]'} type="submit" />
      </form>
    </div>
  )
}

export default SignUp
