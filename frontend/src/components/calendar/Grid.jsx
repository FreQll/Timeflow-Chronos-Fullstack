import React, { useEffect, useState } from 'react'
import { getCalendarDates, getStartAndEndDateOfMonth, getTodayDate, isDateBeforeDate, isCurrentDate } from '../../helper/momentFunc';
import moment from 'moment';
import EventsList from './EventsList';

const Grid = ({ events, today, startOfCalendar, currentEvent, setCurrentEvent, activeEventTypes, calendars, selectedCalendar }) => {
    const totalDays = 42;
    const calendarId = selectedCalendar?.id;

    const day = startOfCalendar.clone().subtract(1, 'day')
    const datesArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const startOfMonth = getStartAndEndDateOfMonth(today).start;
    const endOfMonth = getStartAndEndDateOfMonth(today).end;

    const isEventOnDay = (date) => {
        let flag = false;
        events.forEach(element => {
            const start = moment(element.event.start);
            const end = moment(element.event.end);

            // console.log(date.format('DD MM') + ' ' + isDateBeforeDate(start, date));
            
            if (isDateBeforeDate(start, date) && isDateBeforeDate(date, end)) {
                flag = true;
                return true;
            }
        });
        return flag;
    } 

    return (
        <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">
            {datesArray.map((date) => (
                <div key={date} className={`relative px-3 py-2
                    ${isDateBeforeDate(date, startOfMonth) || isDateBeforeDate(endOfMonth, date) ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'} 
                `}>
                    <time className={`flex justify-end items-center md:justify-start 
                        ${isCurrentDate(date) && 'md:h-6 md:w-6 md:justify-center rounded-full md:bg-indigo-600 font-semibold md:text-white text-indigo-600'}
                    `}>{date.date()}</time>
                    
                        {isEventOnDay(date) && (
                            <EventsList 
                                date={date} 
                                currentEvent={currentEvent}
                                setCurrentEvent={setCurrentEvent}
                                activeEventTypes={activeEventTypes}
                                calendarId={calendarId}
                                calendars={calendars} 
                                selectedCalendar={selectedCalendar} />
                        )}
                </div>
            ))}
        </div>
    )
}

export default Grid


// <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2021-12-27">27</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2021-12-28">28</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2021-12-29">29</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2021-12-30">30</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2021-12-31">31</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-01">1</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-01">2</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-03">3</time>
// <ol className="mt-2">
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Design review</p>
//         <time dateTime="2022-01-03T10:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">10AM</time>
//     </a>
//     </li>
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sales meeting</p>
//         <time dateTime="2022-01-03T14:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM</time>
//     </a>
//     </li>
// </ol>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-04">4</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-05">5</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-06">6</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-07">7</time>
// <ol className="mt-2">
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Date night</p>
//         <time dateTime="2022-01-08T18:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">6PM</time>
//     </a>
//     </li>
// </ol>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-08">8</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-09">9</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-10">10</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-11">11</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-12" className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</time>
// <ol className="mt-2">
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sam's birthday party</p>
//         <time dateTime="2022-01-25T14:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM</time>
//     </a>
//     </li>
// </ol>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-13">13</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-14">14</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-15">15</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-16">16</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-17">17</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-18">18</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-19">19</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-20">20</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-21">21</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-22">22</time>
// <ol className="mt-2">
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Maple syrup museum</p>
//         <time dateTime="2022-01-22T15:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">3PM</time>
//     </a>
//     </li>
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Hockey game</p>
//         <time dateTime="2022-01-22T19:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">7PM</time>
//     </a>
//     </li>
// </ol>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-23">23</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-24">24</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-25">25</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-26">26</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-27">27</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-28">28</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-29">29</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-30">30</time>
// </div>
// <div className="relative bg-white px-3 py-2">
// <time dateTime="2022-01-31">31</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-01">1</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-02">2</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-03">3</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-04">4</time>
// <ol className="mt-2">
//     <li>
//     <a href="#" className="group flex">
//         <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Cinema with friends</p>
//         <time dateTime="2022-02-04T21:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">9PM</time>
//     </a>
//     </li>
// </ol>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-05">5</time>
// </div>
// <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
// <time dateTime="2022-02-06">6</time>
// </div>
// </div>