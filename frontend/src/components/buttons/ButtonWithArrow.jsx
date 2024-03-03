import React from 'react'
import { Button } from '../ui/button'
import {ChevronRightIcon, ChevronLeftIcon} from "@radix-ui/react-icons";

const ButtonWithArrow = ({ text, className, arrowType }) => {
  return (
    <Button className={`border border-[#7B6CEA] text-[#7B6CEA] bg-transparent hover:bg-transparent cursor-pointer flex justify-between ${className}`}>
      {arrowType == 'right' && (
        <>
          {text}
          <ChevronRightIcon />
        </>
      )}
      {arrowType == 'left' && (
      <>
        <ChevronLeftIcon />
        {text}
      </>
    )}
    </Button>
  )
}

export default ButtonWithArrow
