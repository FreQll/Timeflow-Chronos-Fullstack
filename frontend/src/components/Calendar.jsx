import React, { useState } from 'react'
import Monitor from './Monitor'
import ScheduleHeader from './ScheduleHeader'
import GridDesktop from './GridDesktop'
import GridMobile from './GridMobile'
import moment from 'moment/moment'
import { getStartAndEndDateOfCalendar, getTodayDate } from '../helper/momentFunc';

const Calendar = () => {
    moment.updateLocale('en', {week: {dow: 1}});

    const [ today, setToday ] = useState(moment());
    const startDay = getStartAndEndDateOfCalendar(today).start;

    const prevHandler = () => {
        setToday(prev => prev.clone().subtract(1, 'month'))
    }
  
    const todayHandler = () => {
        setToday(getTodayDate());
    }
  
    const nextHandler = () => {
        setToday(prev => prev.clone().add(1, 'month'))
    }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler} />
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <ScheduleHeader />
                <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                    <GridDesktop 
                        today={today} 
                        startOfCalendar={startDay} />
                    <GridMobile 
                        today={today} 
                        startOfCalendar={startDay} />
                </div>
            </div>
        </div>
    )
}

export default Calendar
