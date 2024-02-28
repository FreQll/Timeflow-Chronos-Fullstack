import React from 'react'
import Header from './Header'
import ScheduleHeader from './ScheduleHeader'
import GridDesktop from './GridDesktop'
import GridMobile from './GridMobile'

const Calendar = () => {
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <Header />
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <ScheduleHeader />
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <GridDesktop />
          <GridMobile />
        </div>
      </div>
    </div>
  )
}

export default Calendar
