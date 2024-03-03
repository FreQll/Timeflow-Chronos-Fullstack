import React, { useState } from 'react'
import ButtonGradient from '../buttons/ButtonGradient'
import { Input } from '../ui/input'
import ButtonWithBorder from '../buttons/ButtonWithBorder';

const ResetPassword = ({ active }) => {
    const [ state, setState ] = useState('send_email');
    const [ email, setEmail ] = useState();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
                <div onClick={() => { if(email) setState('confirm_code')}}>
                    <ButtonWithBorder arrowType={'right'} text={'Next'} className={'w-[100px]'} />
                </div>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
            absolute top-0 left-[20%] h-[100%] w-[40%] form_transition opacity-0 z-[3]
            ${active == 'reset_password' && state == 'confirm_code' && 'z-[6] translate-x-[100%] opacity-100'}`}>
                <div>
                    <h1 className='uppercase text-[#7B6CEA] font-[600] text-[24px]'>Reset password</h1>
                    <div className='text-[14px] opacity-60'>Enter code and reset password</div>
                </div>
                <form className='flex flex-col gap-[10px] w-[100%]'>              
                    <Input type="text" placeholder="Code" className='w-[100%]' />
                    <Input type="password" placeholder="New password" className='w-[100%]' />
                    <Input type="password" placeholder="Confirm password" className='w-[100%]' />
                </form>
                <div className='flex gap-[10px]'>
                    <div onClick={() => setState('send_email')}>
                        <ButtonWithBorder arrowType={'left'} text={'Back'} className={'w-[100px]'} />
                    </div>
                    <ButtonGradient text={'Reset'} className={'w-[100px]'} />
                </div>
            </div>
        </>
    )
}

export default ResetPassword
