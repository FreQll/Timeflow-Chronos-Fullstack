import { Fragment, useEffect, useRef } from 'react'

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DayView = () => {
    const container = useRef(null)
    const containerOffset = useRef(null)

    const hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

    useEffect(() => {
        // Set the container scroll position based on the current time.
        const currentMinute = new Date().getHours() * 60
        container.current.scrollTop =
        ((container.current.scrollHeight - - containerOffset.current.offsetHeight) *
            currentMinute) /
        1440
    }, [])

    return (
        <div className="flex h-full flex-col">
            <div className="isolate flex flex-auto overflow-hidden bg-white">
                <div ref={container} className="flex flex-auto flex-col overflow-auto">
                <div className="flex w-full flex-auto">
                    <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
                    <div className="grid flex-auto grid-cols-1 grid-rows-1">
                    <div
                        className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                        style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                    >
                        <div ref={containerOffset} className="row-end-1 h-7"></div>
                        {
                            hours.map((hour, index) => (
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
                        className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                        style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                    >
                        <li className="relative mt-px flex" style={{ gridRow: '74 / span 12' }}>
                        <a
                            href="#"
                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                        >
                            <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                            <p className="text-blue-500 group-hover:text-blue-700">
                            <time dateTime="2022-01-22T06:00">6:00 AM</time>
                            </p>
                        </a>
                        </li>
                        <li className="relative mt-px flex" style={{ gridRow: '92 / span 30' }}>
                        <a
                            href="#"
                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                        >
                            <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                            <p className="order-1 text-pink-500 group-hover:text-pink-700">
                            John F. Kennedy International Airport
                            </p>
                            <p className="text-pink-500 group-hover:text-pink-700">
                            <time dateTime="2022-01-22T07:30">7:30 AM</time>
                            </p>
                        </a>
                        </li>
                        <li className="relative mt-px flex" style={{ gridRow: '134 / span 18' }}>
                        <a
                            href="#"
                            className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
                        >
                            <p className="order-1 font-semibold text-indigo-700">Sightseeing</p>
                            <p className="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
                            <p className="text-indigo-500 group-hover:text-indigo-700">
                            <time dateTime="2022-01-22T11:00">11:00 AM</time>
                            </p>
                        </a>
                        </li>
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