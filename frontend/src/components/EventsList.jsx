import React, { useEffect, useState } from 'react'
import axios from '../../API/axios';
import { cutString } from '../../helper/stringFunc';

const EventsList = ({ date, currentEvent, setCurrentEvent, activeEventTypes }) => {
    const [ events, setEvents ] = useState();

    const getEventByDay = async (date) => {
        const options = {
            startDay: date,
            endDay: date
        }
        const response = await axios.get(`/api/calendar/events/clrryqxhp000bsu3y1q0aebnd`, { withCredentials: true, options });
        if (response) { setEvents(response.data); } 
        else { console.log('Error getting day events'); }
    }

    const getEventById = async (id) => {
        const response = await axios.get(`/api/event/eventInfo/${id}`, { withCredentials: true });
        console.log(response);
        if (response) { setCurrentEvent(response.data); } 
        else { console.log('Error getting day events'); }
    }

    const handleClickEvent = async (event) => {
        if (currentEvent) setCurrentEvent(null);
        else getEventById(event.id);
    }

    console.log(events);

    useEffect(() => {
        getEventByDay(date);
    }, [])
    
    return (
        <ol className="mt-2">
            {events?.map(element => {
                activeEventTypes.includes(element?.event.type) && (
                    <li key={element} onClick={() => handleClickEvent(element.event)}>
                        <a href="#" className="hidden lg:flex group">
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"> 
                                <span className='hidden lg:flex'>{cutString(element?.event.name, 20, '...')}</span>
                                <span className='flex lg:hidden'>{cutString(element?.event.name, 10, '...')}</span>
                            </p>
                            <time dateTime="2022-01-03T10:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">10AM</time>
                        </a>
                        <span className="flex flex-wrap-reverse lg:hidden -mx-0.5 mt-auto">
                            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}

export default EventsList
