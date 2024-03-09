import { formatDate } from '@/helper/momentFunc';
import moment from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react'
import EventDetails from './EventDetails';
import { PopoverTrigger, Popover } from '@radix-ui/react-popover';
import { useLocation } from 'react-router-dom';
import { enumEventTypes } from '@/helper/enumEventTypes';
import { addBgOpacity } from '@/helper/stringFunc';

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30' },
  { date: '2021-12-31' },
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true },
  { date: '2022-01-12', isCurrentMonth: true },
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true, isToday: true },
  { date: '2022-01-21', isCurrentMonth: true },
  { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
  { date: '2022-01-23', isCurrentMonth: true },
  { date: '2022-01-24', isCurrentMonth: true },
  { date: '2022-01-25', isCurrentMonth: true },
  { date: '2022-01-26', isCurrentMonth: true },
  { date: '2022-01-27', isCurrentMonth: true },
  { date: '2022-01-28', isCurrentMonth: true },
  { date: '2022-01-29', isCurrentMonth: true },
  { date: '2022-01-30', isCurrentMonth: true },
  { date: '2022-01-31', isCurrentMonth: true },
  { date: '2022-02-01' },
  { date: '2022-02-02' },
  { date: '2022-02-03' },
  { date: '2022-02-04' },
  { date: '2022-02-05' },
  { date: '2022-02-06' },
]

const DayView = ({ events, today, startOfCalendar, currentEvent, setCurrentEvent, activeEventTypes, calendars, selectedCalendar }) => {
    const container = useRef(null);
    const containerOffset = useRef(null);
    const [ dailyEvents, setDailyEvents ] = useState([]);
    const location = useLocation();

    const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

    const isOverlap = (start1, end1, start2, end2) => {
        console.log(start1 + '\n' + end2);
        console.log(start1 < end2);
        return start1 < end2 && end1 > start2;
    };

    useEffect(() => {
        let overlappingCount = 1;
        events?.forEach(element => {
            console.log(element);
            const startTime = formatDate(element.event.start, 'HH:mm') 
            const startTimeHour = formatDate(element.event.start, 'HH');
            const startTimeMinutes = formatDate(element.event.start, 'mm');
            const endTime = formatDate(element.event.end, 'HH:mm');
    
            const durationMinutes = moment(element.event.end).diff(moment(element.event.start), 'minutes') / 60;
    
            events?.forEach(item => {
                if (item !== element) {
                    if (isOverlap(element.event.start, element.event.end, item.event.start, item.event.end)) {
                        overlappingCount++;
                    }
                }
            });

            console.log(overlappingCount);
    
            // Добавляем обновленное событие в состояние dailyEvents с учетом количества пересекающихся событий
            setDailyEvents(prevState => {
                const newDailyEvents = prevState.filter(item => item.event.id !== element.event.id);
                console.log(`${overlappingCount <= 2 ? 1 : parseInt(48 / (overlappingCount - 1))} / span ${overlappingCount <= 2 ? parseInt(24 - 1/48) : parseInt(48 / (overlappingCount))}`);
                return [
                    ...newDailyEvents,
                    {
                        event: element.event,
                        gridRow: `${2 + 12 * startTimeHour + startTimeMinutes * 0.2} / span ${parseInt(12 * durationMinutes)}`,
                        gridColumn: `${overlappingCount <= 2 ? 1 : parseInt(48 / (overlappingCount - 1))} / span ${overlappingCount <= 2 ? parseInt(24 - 1/48) : parseInt(48 / (overlappingCount))}`,
                        overlappingCount: overlappingCount
                    }
                ];
            });
        });

        // events?.forEach(element => {
        //     console.log(element);
        //     const startTime = formatDate(element.event.start, 'HH:mm') 
        //     const startTimeHour = formatDate(element.event.start, 'HH');
        //     const startTimeMinutes = formatDate(element.event.start, 'mm');
        //     const endTime = formatDate(element.event.end, 'HH:mm');

        //     const durationMinutes = moment(element.event.end).diff(moment(element.event.start), 'minutes') / 60;

        //     console.log(durationMinutes);

        //     setDailyEvents(prevState => {
        //         const newDailyEvents = prevState.filter(item => item.event.id !== element.event.id);
        //         return [
        //           ...newDailyEvents,
        //           {
        //             event: element.event,
        //             gridRow: `${2 + 12 * startTimeHour + startTimeMinutes * 0.2} / span ${parseInt(12 * durationMinutes)}`,
        //             gridColumn: '1 / span 48'
        //           }
        //         ];
        //       });
        // });
    }, [events]);


    // useEffect(() => {
    //     const currentMinute = new Date().getHours() * 60
    //     container.current.scrollTop =
    //     ((container.current.scrollHeight - - containerOffset.current.offsetHeight) *
    //         currentMinute) /
    //     1440
    // }, [])

    return (
        <div className="flex h-full flex-col">
            <div className="isolate flex flex-auto overflow-hidden bg-white">
                <div ref={container} className="flex flex-auto flex-col overflow-auto">
                <div className="flex w-full flex-auto">
                    <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
                    <div 
                        style={{ gridTemplateColumns: 'repeat(48, minmax(auto, 1fr))' }}
                        className="grid flex-auto grid-rows-1">
                        <div
                            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                        >
                            <div ref={containerOffset} className="row-end-1 h-7"></div>
                            {hours.map((hour, index) => (
                                <>
                                    <div>
                                        <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                            {hour}
                                        </div>
                                    </div>
                                    <div />
                                </>
                            ))}
                            <div />
                        </div>

                    {/* Events */}
                        <ol
                            className="col-start-1 col-end-[48] row-start-1 grid"
                            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto', gridTemplateColumns: '1.75rem repeat(48, minmax(0, 1fr)) auto' }}
                        >
                            {dailyEvents?.map((element, index) => (
                                <li key={index} 
                                    className="relative mt-px flex" 
                                    style={{ gridRow: element.gridRow, gridColumn: element.gridColumn }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <a
                                                href="#"
                                                style={{backgroundColor: addBgOpacity(enumEventTypes[element?.event.type].color, '20')}}
                                                className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 hover:bg-blue-100"
                                            >
                                                <p style={{color: enumEventTypes[element?.event.type].color}} className="order-1 text-[14px] font-semibold">{element.event?.name}</p>
                                                <p style={{color: enumEventTypes[element?.event.type].color}} className="group-hover:text-blue-700">
                                                <time>{formatDate(element.event.start, 'HH:mm')}</time>
                                                </p>
                                            </a>
                                        </PopoverTrigger>
                                        <EventDetails
                                            currentEvent={element?.event}
                                            calendars={calendars}
                                            selectedCalendar={selectedCalendar}
                                        />
                                    </Popover>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                </div>
                {/* <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                <div className="flex items-center text-center text-gray-900">
                    <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="flex-auto text-sm font-semibold">January 2022</div>
                    <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                </div>
                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                    {days.map((day, dayIdx) => (
                    <button
                        key={day.date}
                        type="button"
                        className={classNames(
                        'py-1.5 hover:bg-gray-100 focus:z-10',
                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                        (day.isSelected || day.isToday) && 'font-semibold',
                        day.isSelected && 'text-white',
                        !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                        !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                        day.isToday && !day.isSelected && 'text-indigo-600',
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === days.length - 7 && 'rounded-bl-lg',
                        dayIdx === days.length - 1 && 'rounded-br-lg'
                        )}
                    >
                        <time
                        dateTime={day.date}
                        className={classNames(
                            'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                            day.isSelected && day.isToday && 'bg-indigo-600',
                            day.isSelected && !day.isToday && 'bg-gray-900'
                        )}
                        >
                        {day.date.split('-').pop().replace(/^0/, '')}
                        </time>
                    </button>
                    ))}
                </div>
                </div> */}
            </div>
        </div>
    )
}

export default DayView;