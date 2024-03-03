import React from 'react'
import RadioInput from '../RadioInput'
import { Button } from '../ui/button'
import Checkbox from '../Checkbox'
import { enumEventTypes } from '../../../helper/enumEventTypes'
import ButtonBlue from '../buttons/ButtonBlue'

const CalendarBlocks = ({ calendars, activeCalendar, changeActiveEventTypes }) => {
    const clickCheckboxEventTypes = (keyTitle) => {
        changeActiveEventTypes(keyTitle);
    }

    const clickCheckboxCalendars = (calendarId) => {
        changeActiveCalendar(calendarId)
    }

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col gap-[15px] p-[10px] rounded-[10px] bg-[#ffffff99]'>
                <div className='flex flex-col gap-[10px]'>
                    <h3 className='opacity-50'>Calendars</h3>

                    {calendars?.map(element => (
                        <RadioInput 
                            key={element} 
                            id={element.calendar.id}
                            selected={activeCalendar.id}
                            onChange={clickCheckboxCalendars}
                            title={element.calendar.name} 
                            color={element.calendar.color} />
                    ))}
                </div>
                
                <ButtonBlue text={'New calendar'} />
            </div>

            <div className='p-[10px] rounded-[10px] bg-[#ffffff99]'>
                <div>
                    <h3 className='mb-[10px] opacity-50'>Events</h3>
                    
                    {Object.keys(enumEventTypes).map(type => (
                    <Checkbox key={type} 
                        keyTitle={type} 
                        clickCheckbox={clickCheckboxEventTypes} 
                        title={enumEventTypes[type].title} 
                        color={enumEventTypes[type].color} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalendarBlocks
