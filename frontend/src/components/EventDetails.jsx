import React from 'react'
import { formatDate } from '../../helper/momentFunc'

const EventDetails = ({ currentEvent }) => {
    const formatDateFunc = (date) => {
        return formatDate(date, 'DD MMMM YYYY')
    }

    return (
        <div className='w-[-webkit-fill-available] min-h-[100px] absolute z-20 bottom-0 bg-slate-500 
        rounded-[10px] mx-[10px] mb-[10px] p-[10px] opacity-85 backdrop-blur-lg'>
            <h3>{currentEvent.name}</h3>
            <div>{formatDateFunc(currentEvent.start)} – {formatDateFunc(currentEvent.end)}</div>
            <button>Add users</button>
        </div>
    )
}
export default EventDetails
