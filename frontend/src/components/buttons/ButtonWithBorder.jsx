import React from 'react'
import { Button } from '../ui/button'
import {ChevronRightIcon, ChevronLeftIcon} from "@radix-ui/react-icons";

const ButtonWithBorder = ({ text, className, arrowType, onClick }) => {
  return (
    <Button onClick={onClick} className={`border border-[#7B6CEA] text-[#7B6CEA] bg-transparent hover:bg-transparent cursor-pointer flex justify-between ${className}`}>
      {arrowType == 'right' ? (
        <>
          {text}
          <ChevronRightIcon />
        </>
      ) : (
        arrowType == 'left' ? (
          <>
            <ChevronLeftIcon />
            {text}
          </>
        ) : (
          <>
            {text}
          </>
        )
      )}
    </Button>
  )
}

export default ButtonWithBorder
