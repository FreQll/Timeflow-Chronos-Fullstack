import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import DatePickerWithRange from '@/components/DatePicker';
import ComboboxPopover from '@/components/ComboboxPopover';
import { enumEventTypesArray } from '../../helper/enumEventTypes';
import CloseButtonCircled from '@/components/buttons/CloseButtonCircled';
import { getTodayDate } from '../../helper/momentFunc';
import axios, { POST_CONFIG } from '../../API/axios';
import { objToJson } from '../../helper/stringFunc';
import { useToast } from '@/components/ui/use-toast';

const AddEvent = ({ handleOpenAddEvent, calendar, calendars }) => {
  const { toast } = useToast()
  
  const [ title, setTitle ] = useState('New event');
  const [ description, setDescription ] = useState('');
  const [ type, setType] = useState(null);
  const [ date, setDate ] = useState({
    from: new Date(getTodayDate()),
    to: new Date(getTodayDate().add(1, 'month')),
  });
  const color = 'ffffff';
  const [ selectedCalendar, setSelectedCalendar ] = useState(calendar); 
  

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const setEventCalendar = async (calendar) => {
    const response = await axios.get(`/api/calendar/calendarInfo/${calendar.calendar.id}`, { withCredentials: true });
    if (response) { setSelectedCalendar(response.data); } 
    else { console.log('Error creating event'); }
  }

  //TODO change userId

  const handleSave = async () => {
    const options = {
      name: title,
      content: description,
      type: type?.key,
      start: date.from,
      end: date.to,
      color: color,
      userId: 'clt9zw5rx0002a8mausu1v1lj',
      calendarId: selectedCalendar.id
    }
    
    try {
      const response = await axios.post(`/api/event`, objToJson(options), POST_CONFIG);
      console.log(response);
    } catch (error) {
      console.log('aa');
      toast();
    }
  }

  return (
    <div className='absolute top-0 left-0 z-[20] w-[100vw] h-[100vh] flex items-center justify-center'>
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