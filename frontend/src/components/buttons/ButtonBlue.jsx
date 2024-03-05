import React from 'react'
import { Button } from '../ui/button'

const ButtonBlue = React.forwardRef(({ className, text, onClick }, ref) => {
  return (
    <Button className={`w-[100%] bg-indigo-600 hover:bg-indigo-500 ${className}`} onClick={onClick}>{text}</Button>
  )
});

export default ButtonBlue
