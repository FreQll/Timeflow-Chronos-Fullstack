import React, { useEffect, useState } from 'react'
import Monitor from '../components/Monitor'
import ScheduleHeader from '../components/ScheduleHeader'
import Grid from '../components/Grid'
import moment from 'moment/moment'
import { getStartAndEndDateOfCalendar, getTodayDate } from '../../helper/momentFunc';
import axios from '../../API/axios';
import EventDetails from '../components/EventDetails'
import AddEvent from './AddEvent'
import { Input } from '@/components/ui/input'

const Calendar = ({ activeEventTypes, calendar, calendars }) => {
    moment.updateLocale('en', {week: {dow: 1}});

    const [ today, setToday ] = useState(moment());
    const startDay = getStartAndEndDateOfCalendar(today).start;
    const endDay = getStartAndEndDateOfCalendar(today).end;
    const [ events, setEvents ] = useState([]);
    const [ currentEvent, setCurrentEvent ] = useState(null);
    const [ isAddEventOpen, setIsAddEventOpen ] = useState(false);

    const prevHandler = () => {
        setToday(prev => prev.clone().subtract(1, 'month'))
    }
  
    const todayHandler = () => {
        setToday(getTodayDate());
    }
  
    const nextHandler = () => {
        setToday(prev => prev.clone().add(1, 'month'))
    }

    const getCalendarEvents = async () => {
        const options = {
            startDay: startDay,
            endDay: endDay
        }
        const response = await axios.get(`/api/calendar/events/${calendar.id}`, { withCredentials: true, options });
        if (response) { setEvents(response.data); } 
        else { console.log('Error getting calendar events'); }
    }

    const handleOpenAddEvent = () => {
        setIsAddEventOpen(isAddEventOpen => !isAddEventOpen);
    }

    useEffect(() => {
        getCalendarEvents();
    }, [calendar.id, activeEventTypes])

    return (
        <div className='flex w-[-webkit-fill-available]'>
            {isAddEventOpen && (
                <AddEvent handleOpenAddEvent={handleOpenAddEvent} calendar={calendar} calendars={calendars} />
            )}
            <div className="lg:flex lg:flex-col lg:h-full w-[-webkit-fill-available]">
                <Monitor
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                    handleOpenAddEvent={handleOpenAddEvent} />
                <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col relative">
                    <ScheduleHeader />
                    <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                        <Grid 
                            events={events}
                            today={today} 
                            startOfCalendar={startDay}
                            currentEvent={currentEvent}
                            setCurrentEvent={setCurrentEvent}
                            activeEventTypes={activeEventTypes}
                            calendarId={calendar.id} />
                    </div>
                </div>
                {/* {currentEvent && (
                    <EventDetails currentEvent={currentEvent} />
                )} */}
            </div>

        </div>
    )
}

export default Calendar
