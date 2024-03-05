import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import DatePickerWithRange from '@/components/DatePicker';
import ComboboxPopover from '@/components/ComboboxPopover';
import { enumEventTypes, enumEventTypesArray } from '../../helper/enumEventTypes';
import CloseButtonCircled from '@/components/buttons/CloseButtonCircled';
import { getTodayDate } from '../../helper/momentFunc';
import axios, { POST_CONFIG } from '../../API/axios';
import { objToJson } from '../../helper/stringFunc';
import { useToast } from '@/components/ui/use-toast';
import ButtonBlue from '@/components/buttons/ButtonBlue';
import { savedState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Separator } from '@radix-ui/react-separator';

const AddEvent = ({ handleOpenAddEvent, calendars }) => {
  const user = savedState?.user;
  const navigate = useNavigate();
  
  const [ title, setTitle ] = useState('New event');
  const [ description, setDescription ] = useState('');
  const [ type, setType] = useState(null);
  const [ date, setDate ] = useState({
    from: new Date(getTodayDate()),
    to: new Date(getTodayDate().add(1, 'month')),
  });
  const color = 'ffffff';
  const [ selectedCalendar, setSelectedCalendar ] = useState(); 

  
  const setEventCalendar = async (calendar) => {
    if (calendar) {
      const response = await axios.get(`/api/calendar/calendarInfo/${calendar.calendar.id}`, { withCredentials: true });
      if (response) { console.log(response); setSelectedCalendar(response.data); } 
      else { console.log('Error creating event'); }
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSave = async () => {
    const options = {
      name: title,
      content: description,
      type: type?.key,
      start: date.from,
      end: date.to,
      color: color,
      userId: user.id,
      calendarId: selectedCalendar?.id
    }
    
    try {
      await axios.post(`/api/event`, objToJson(options), POST_CONFIG);
      navigate('/');
    } catch (error) {
    }
  }

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-lg h-[450px]">
        <DrawerHeader>
          <DrawerTitle>
            <input type='text' value={title} onChange={handleTitleChange} className='outline-none bg-transparent text-[40px]' autoFocus />
          </DrawerTitle>
          <DrawerDescription className='mt-[5px]'>
            <input type='text' value={description} placeholder='Description' onChange={handleDescriptionChange} className='outline-none bg-transparent text-[16px]' />
          </DrawerDescription>
        </DrawerHeader>
        <Separator className='h-[1px] bg-gray-200' />
        <table className=' border-separate border-spacing-[10px] py-[10px]'>
          <tbody>
            <tr>
              <td className='text-right'><Label>Duration: </Label></td>
              <td><DatePickerWithRange className={'bg-transparent w-max'} date={date} setDate={setDate} /></td>
            </tr>
            <tr>
              <td className='text-right'><Label>Type: </Label></td>
              <td><ComboboxPopover statuses={enumEventTypesArray} placeholder={'Set type'} selectedStatusName={enumEventTypes[type]?.title} selectedStatus={type} setSelectedStatus={setType} /></td>
            </tr>
            <tr>
              <td className='text-right'><Label>Calendar: </Label></td>
              <td><ComboboxPopover statuses={calendars} placeholder={'Set calendar'} selectedStatusName={selectedCalendar?.name} selectedStatus={selectedCalendar} setSelectedStatus={setEventCalendar} /></td>
            </tr>
          </tbody>
        </table>
        <Separator className='h-[1px] bg-gray-200' />
        <DrawerFooter>
          <div className='flex gap-[20px] justify-between w-[100%]' onClick={handleSave} >
            <Button variant="outline" className='w-[-webkit-fill-available] bg-indigo-600 hover:bg-indigo-500 text-white hover:text-white'>Save</Button>
          </div>
          <DrawerClose className='w-100%' asChild>
              <Button variant="outline" className='w-[-webkit-fill-available]'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}

export default AddEvent





    {/* <div className='absolute top-0 left-0 z-[20] w-[100vw] h-[100vh] flex items-center justify-center'>
      <Card className='relative'>
          <CloseButtonCircled handleClose={handleOpenAddEvent} />
          <CardHeader>
            <CardTitle>
              <input type='text' value={title} onChange={handleTitleChange} className='outline-none bg-transparent' autoFocus />
            </CardTitle>
            <CardDescription>
              <input type='text' value={description} placeholder='Description' onChange={handleDescriptionChange} className='outline-none bg-transparent' />
            </CardDescription>
          </CardHeader>
          <CardContent className='border-t border-gray-200 pt-[15px] flex flex-col gap-[15px]'>
            <table className=' border-separate border-spacing-[10px]'>
              <tbody>
                <tr>
                  <td className='text-right'><Label>Duration: </Label></td>
                  <td><DatePickerWithRange className={'bg-transparent w-max'} date={date} setDate={setDate} /></td>
                </tr>
                <tr>
                  <td className='text-right'><Label>Type: </Label></td>
                  <td><ComboboxPopover statuses={enumEventTypesArray} title={'Set type'} selectedStatus={type} setSelectedStatus={setType} /></td>
                </tr>
                <tr>
                  <td className='text-right'><Label>Calendar: </Label></td>
                  <td><ComboboxPopover statuses={calendars} title={'Set calendar'} selectedStatus={selectedCalendar} setSelectedStatus={setEventCalendar} /></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
          <CardFooter className='border-t border-gray-200 pt-[15px] flex flex-col gap-[15px]'>
            <div className='flex gap-[20px] justify-between w-[100%]' onClick={handleSave}>
              <ButtonBlue text={'Save'} />
            </div>
          </CardFooter>
      </Card>
    </div> */}

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