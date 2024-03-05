import React from 'react'
import RadioInput from '../RadioInput'
import { Button } from '../ui/button'
import { enumEventTypes } from '../../../helper/enumEventTypes'
import ButtonBlue from '../buttons/ButtonBlue'
import { savedState } from '@/redux/store'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import AddCalendar from '@/pages/AddCalendar'

const CalendarBlocks = ({ calendars, activeCalendar, changeActiveEventTypes, changeActiveCalendar }) => {
    const user = savedState.user;

    const clickCheckboxEventTypes = (keyTitle) => {
        changeActiveEventTypes(keyTitle);
    }

    const clickCheckboxCalendars = (calendarId) => {
        changeActiveCalendar(calendarId)
    }

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col gap-[15px] p-[10px] rounded-[10px] bg-[#ffffff99]'>
                <div className='flex flex-col gap-[10px] w-[100%]'>
                    <h3 className='opacity-50'>Calendars</h3>

                    <RadioGroup defaultValue={activeCalendar.name} className='flex max-w-[100%] flex-col gap-0'>
                        {calendars?.map(element => (
                            <div key={element.calendar.id} className="flex items-center space-x-2 max-w-[100%]" onClick={() => clickCheckboxCalendars(element.calendar.id)}>
                                <RadioGroupItem value={element.calendar.name} id={element.calendar.name} style={{ backgroundColor: element.calendar.color }} className={`rounded-[4px] text-white border-0 box_shadow`} />
                                <div  className='text-ellipsis max-w-[100%] overflow-hidden'>
                                    <Label htmlFor={element.calendar.name}>{element.calendar.name}</Label>
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                

                <Dialog>
                    <DialogTrigger asChild>
                        <ButtonBlue text={'New calendar'} />
                    </DialogTrigger>
                    <AddCalendar />
                </Dialog>

                {/* <Drawer>
                    <DrawerTrigger asChild>
                        <ButtonBlue text={'Add event'} onClick={handleOpenAddEvent} />
                    </DrawerTrigger>
                    <AddEvent calendars={calendars} />
                </Drawer> */}
                
            </div>

            <div className='p-[10px] rounded-[10px] bg-[#ffffff99]'>
                <div>
                    <h3 className='mb-[10px] opacity-50'>Events</h3>

                    <div className='flex flex-col gap-[5px]'>
                        {Object.keys(enumEventTypes).map(type => (
                            <div key={type} className="flex items-center space-x-2" onClick={() => clickCheckboxEventTypes(type)}>
                                <Checkbox id={type} style={{ backgroundColor: enumEventTypes[type].color }} className='border-0 text-white' defaultChecked />
                                <label
                                    htmlFor={type}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {enumEventTypes[type].title} 
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarBlocks

{/* <RadioInput 
key={element} 
id={element.calendar.id}
selected={activeCalendar.id}
onChange={clickCheckboxCalendars}
title={element.calendar.name} 
color={element.calendar.color} /> */}


{/* <Checkbox key={type} 
keyTitle={type} 
clickCheckbox={clickCheckboxEventTypes} 
title={enumEventTypes[type].title} 
color={enumEventTypes[type].color} /> */}