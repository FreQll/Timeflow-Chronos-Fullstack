import React from 'react'
import Button from '../components/Button'

const AddEvent = ({ handleOpenAddEvent }) => {
  return (
    <div className=''>
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

          <Button text={'Confirm'} className={'w-[100px]'} />

        </form>
      </div>

    </div>
  )
}

export default AddEvent
