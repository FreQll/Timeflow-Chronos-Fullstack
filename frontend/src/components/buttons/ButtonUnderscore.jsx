import React from 'react'
import { Button } from '../ui/button'

const ButtonUnderscore = ({ text, className }) => {
  return (
    <Button variant="link" className={`cursor-pointer ${className}`}>{text}</Button>
  )
}

export default ButtonUnderscore
