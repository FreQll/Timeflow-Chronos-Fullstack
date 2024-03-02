import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import { DatePickerWithRange } from '@/components/DatePicker';
import ComboboxPopover from '@/components/ComboboxPopover';
import { enumEventTypesArray } from '../../helper/enumEventTypes';
import CloseButtonCircled from '@/components/CloseButtonCircled';

const AddEvent = ({ handleOpenAddEvent }) => {
  const [ title, setTitle ] = useState('New event');
  const [ description, setDescription ] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <div className='absolute top-0 left-0 z-[20] w-[100vw] h-[100vh] flex items-center justify-center'>
      <Card className='relative'>
          <CloseButtonCircled handleClose={handleOpenAddEvent} />
          <CardHeader>
            <CardTitle>
                <input type='text' value={title} onChange={handleTitleChange} className='outline-none' autoFocus />
            </CardTitle>
            <CardDescription>
              <input type='text' value={description} placeholder='Description' onChange={handleDescriptionChange} className='outline-none' />
            </CardDescription>
          </CardHeader>
          <CardContent className='border-t border-gray-200 pt-[15px] flex flex-col gap-[15px]'>
            <table className=' border-separate border-spacing-[10px]'>
              <tbody>
                <tr>
                  <td className='text-right'><Label>Duration: </Label></td>
                  <td><DatePickerWithRange /></td>
                </tr>
                <tr>
                  <td className='text-right'><Label>Type: </Label></td>
                  <td><ComboboxPopover statuses={enumEventTypesArray} /></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
          <CardFooter className='border-t border-gray-200 pt-[15px] flex flex-col gap-[15px]'>
            <div className='flex gap-[20px] justify-between w-[100%]'>
              <Button className='bg-indigo-600 hover:bg-indigo-500 w-[100%]'>Save</Button>
            </div>
          </CardFooter>
      </Card>
  </div>
  )
}

export default AddEvent


{/* <div className=''>
<div className="flex items-center justify-between border-b border-r border-gray-200 px-6 py-4 lg:flex-none w-[100%]">
    <h1 className="text-base font-semibold leading-[36px] text-gray-900 lg:text-[24px]">
        Add event
    </h1>
    <select>
      <option>1</option>
    </select>
</div>

<div>
  <form className='flex flex-col gap-[20px] p-[20px]'>
    <div>
      <input id='event_start' 
        value='New event'
        className='outline-none p-[5px] pl-[10px] bg-[#F8F9FD] border-[#DEDFE9] border-[1px] rounded-[4px]' />
    </div>

    <div>
      <label>Start: </label>
      <input id='event_start' className='outline-none p-[5px] pl-[10px] bg-[#F8F9FD] border-[#DEDFE9] border-[1px] rounded-[4px]' />
    </div>
    
    <div>
      <label>End: </label>
      <input id='event_start' className='outline-none p-[5px] pl-[10px] bg-[#F8F9FD] border-[#DEDFE9] border-[1px] rounded-[4px]' />
    </div>

    <Button>Confirm</Button>

  </form>
</div>

</div> */}