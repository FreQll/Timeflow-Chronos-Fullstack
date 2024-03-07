import React from 'react'
import { Button } from '../ui/button'

const ButtonUnderscore = ({ text, className, type = 'button', onClick }) => {
  return (
    <Button variant="link" type={type} onClick={onClick} className={`cursor-pointer ${className}`}>{text}</Button>
  )
}

export default ButtonUnderscore
