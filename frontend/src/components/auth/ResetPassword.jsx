import React, { useState } from 'react'
import ButtonGradient from '../buttons/ButtonGradient'
import { Input } from '../ui/input'
import ButtonWithBorder from '../buttons/ButtonWithBorder';
import axios, { POST_CONFIG } from '../../../API/axios';
import { getSavedState } from '@/redux/store';
import { toastError } from '@/helper/toastFunctions';
import CodeInput from './CodeInput';

const ResetPassword = ({ active, setActive }) => {
    const [ state, setState ] = useState('send_email');
    const [ email, setEmail ] = useState();
    const [ code, setCode ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const savedState = getSavedState();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleClickNext = async () => {
        const response = await axios.get('/api/user/email/' + email);
        if (response.data.length == 0) {
            toastError('This email is not registered');
            setState('send_email')
        } else {
            setState('confirm_code');
            const data = {
                email: email
            }
            const response = await axios.post('/api/auth/reset-password', data, POST_CONFIG);
            // if ()
        }
    }

    const handleReset = async () => {
        if (password !== confirmPassword) {
            toastError("Passwords don't match");
        } else {
            const data = {
                newPassword: password,
                code: code,
                email: email
            }
            try {
                await axios.post('/api/auth/reset-password/confirm', data, POST_CONFIG)
                setActive('login');
                setState('send_email')
                
            } catch (error) {
                toastError(error.response.data.message)
            }
        }
    }

    return (
        <>
            <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
            absolute top-0 left-0 h-[100%] w-[40%] form_transition opacity-0 z-[3]
            ${active == 'reset_password' && 'z-[6] translate-x-[150%] opacity-100'}
            ${state == 'confirm_code' && 'translate-x-[250%] opacity-0'}`}>
                <div>
                    <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Reset password</h1>
                    <div className='text-[14px] opacity-60'>Use your email for reset password</div>
                </div>
                <form className='flex flex-col gap-[10px] w-[100%]'>              
                    <Input type="email" placeholder="Email" className='w-[100%]' onChange={handleChangeEmail} />
                </form>
                <div>
                    <ButtonWithBorder onClick={handleClickNext} arrowType={'right'} text={'Next'} className={'w-[100px]'} />
                </div>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
            absolute top-0 left-[20%] h-[100%] w-[40%] form_transition opacity-0 z-[3]
            ${active == 'reset_password' && state == 'confirm_code' && 'z-[6] translate-x-[100%] opacity-100'}`}>
                <div>
                    <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Reset password</h1>
                    <div className='text-[14px] opacity-60'>Check your mail, enter code and reset password</div>
                </div>
                <form className='flex flex-col gap-[10px] w-[100%]'>              
                    {/* <Input type="text" placeholder="Code" className='w-[100%]' /> */}
                    <CodeInput value={code} setValue={setCode} />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New password" className='w-[100%]' />
                    <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" className='w-[100%]' />
                </form>
                <div className='flex gap-[10px]'>
                    <div onClick={() => setState('send_email')}>
                        <ButtonWithBorder arrowType={'left'} text={'Back'} className={'w-[100px]'} />
                    </div>
                    <ButtonGradient onClick={handleReset} text={'Reset'} className={'w-[100px]'} />
                </div>
            </div>
        </>
    )
}

export default ResetPassword
