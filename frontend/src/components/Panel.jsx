import React from 'react'
import Checkbox from './Checkbox'
import Button from './Button'
import { enumEventTypes } from '../../helper/enumEventTypes'

const Panel = ({ calendars, changeActiveEventTypes }) => {

  return (
    <div className='min-w-[200px] bg-slate-100 h-[100%] p-[20px] border-r border-gray-200 z-30 flex flex-col gap-[20px]'>
      <div>
        <div>
          <h3 className='mb-[10px] opacity-50'>Calendars</h3>

          {calendars?.map(element => (
            <Checkbox key={element} title={element.calendar.name} color={element.calendar.color} />
          ))}
        </div>

        <Button text={'New calendar'} className={'w-[100%] mt-[20px]'} />
      </div>

      <div>
        <div>
          <h3 className='mb-[10px] opacity-50'>Events</h3>

          {Object.keys(enumEventTypes).map(type => (
            <Checkbox key={type} keyTitle={type} onClick={changeActiveEventTypes} title={enumEventTypes[type].title} color={enumEventTypes[type].color} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Panel

{/*             
            <input id={`checkbox_for_${element.calendar.name}`} type='checkbox' className='hidden' />
            <label 
              className='relative pl-[30px]
                before:absolute before:left-0 before:top-0 before:translate-y-[50%] before:w-[10px] before:h-[10px] before:border before:border-black before:rounded-[3px]
               checked:before:bg-black'
               htmlFor={`checkbox_for_${element.calendar.name}`}
              >{element.calendar.name}</label> */}