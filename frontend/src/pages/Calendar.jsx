import React, { useEffect, useState } from 'react'
import Monitor from '../components/calendar/Monitor'
import ScheduleHeader from '../components/calendar/ScheduleHeader'
import MonthView from '../components/calendar/MonthView'
import moment from 'moment/moment'
import { getStartAndEndDateOfCalendar, getTodayDate } from '../helper/momentFunc';
import axios from '../../API/axios';
import EventDetails from '../components/calendar/EventDetails'
import AddEvent from '../components/calendar/AddEvent'
import { Input } from '@/components/ui/input'
import { useLocation } from 'react-router-dom'
import { enumScheduleModes } from '@/helper/enumScheduleModes'
import DayView from '@/components/calendar/DayView'

const Calendar = ({ activeEventTypes, calendar, calendars }) => {
    moment.updateLocale('en', {week: {dow: 1}});

    const [ scheduleMode, setScheduleMode ] = useState(enumScheduleModes.MONTH);

    const [ today, setToday ] = useState(moment());
    const startDay = getStartAndEndDateOfCalendar(today).start;
    const endDay = getStartAndEndDateOfCalendar(today).end;
    const [ events, setEvents ] = useState([]);
    const [ currentEvent, setCurrentEvent ] = useState(null);

    const location = useLocation();

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
        try {
            const response = await axios.get(`/api/calendar/allEvents/${calendar.id}`, { withCredentials: true, options });
            if (response) { setEvents(response.data); } 
        } catch (error) {
            console.log('Error getting calendar events');
        }
    }

    // const handleOpenAddEvent = () => {
    //     setIsAddEventOpen(isAddEventOpen => !isAddEventOpen);
    // }

    useEffect(() => {
        getCalendarEvents();
    }, [calendar.id, activeEventTypes, location])

    return (
        <div className='flex w-[-webkit-fill-available] h-[-webkit-fill-available]'>
            {/* {isAddEventOpen && (
                <AddEvent handleOpenAddEvent={handleOpenAddEvent} calendar={calendar} calendars={calendars} />
            )} */}
            <div className="lg:flex lg:flex-col lg:h-full w-[-webkit-fill-available]">
                <Monitor
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                    calendar={calendar} 
                    calendars={calendars}
                    scheduleMode={scheduleMode}
                    setScheduleMode={setScheduleMode} />
                {scheduleMode == enumScheduleModes.MONTH && (
                    <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col relative">
                        <ScheduleHeader />
                        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                            <MonthView 
                                events={events}
                                today={today} 
                                startOfCalendar={startDay}
                                currentEvent={currentEvent}
                                setCurrentEvent={setCurrentEvent}
                                activeEventTypes={activeEventTypes}
                                calendars={calendars} 
                                selectedCalendar={calendar} />
                        </div>
                    </div>
                )}
                {scheduleMode == enumScheduleModes.DAY && (
                    <DayView />
                )}
                {/* {currentEvent && (
                    <EventDetails currentEvent={currentEvent} />
                )} */}
            </div>

        </div>
    )
}

export default Calendar
