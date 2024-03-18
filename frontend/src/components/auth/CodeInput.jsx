import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'

const CodeInput = ({value, setValue}) => {
  return (
    <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        render={({ slots }) => (
            <>
                <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                    ))}{" "}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                    <InputOTPSlot key={index + 3} {...slot} />
                    ))}
                </InputOTPGroup>
            </>
        )}
    />
  )
}

export default CodeInput
