import React from 'react'
import { Button } from '../ui/button'

const ButtonGradient = ({ text, className, type, onClick }) => {
  return (
    <Button type={type} onClick={onClick} className={`bg_gradient_left_right w-[100px] cursor-pointer ${className}`}>{text}</Button>
  )
}

export default ButtonGradient
