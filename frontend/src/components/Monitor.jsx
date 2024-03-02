import React, { useState } from 'react'
import { enumScheduleModes } from '../../helper/enumScheduleModes';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
// import Button from './Button';

const Monitor = ({ today, prevHandler, todayHandler, nextHandler, handleOpenAddEvent }) => {
    const [ menuViewOpen, setMenuViewOpen ] = useState(false);
    const [ scheduleMode, setScheduleMode ] = useState(enumScheduleModes.MONTH);

    const currentMonth = today.format('MMMM YYYY');
    const currentDateFormat = today.format('YYYY-MM');

    const handleClickMenu = () => {
        setMenuViewOpen(menuViewOpen => !menuViewOpen);
    }

    const handleClickMode = (mode) => {
        setScheduleMode(mode);
        setMenuViewOpen(false);
    }

    return (
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
            <h1 className="text-base font-semibold leading-6 text-gray-900 lg:text-[24px]">
                <time dateTime={currentDateFormat}>{currentMonth}</time>
            </h1>
            <div className="flex items-center">
                <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                    <button onClick={prevHandler} type="button" className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                        <span className="sr-only">Previous {scheduleMode.toLocaleLowerCase()}</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button 
                        onClick={todayHandler}
                        type="button" 
                        className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative 
                        md:block">Today</button>
                    <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                    <button  onClick={nextHandler} type="button" className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                        <span className="sr-only">Next month</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:items-center">
                    <div className="relative">
                        <button onClick={handleClickMenu} type="button" className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">
                            {scheduleMode} view
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {menuViewOpen && (
                            <div className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <a href="#" onClick={() => handleClickMode(enumScheduleModes.DAY)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Day view</a>
                                    <a href="#" onClick={() => handleClickMode(enumScheduleModes.WEEK)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Week view</a>
                                    <a href="#" onClick={() => handleClickMode(enumScheduleModes.MONTH)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Month view</a>
                                    <a href="#" onClick={() => handleClickMode(enumScheduleModes.YEAR)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Year view</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="ml-6 h-6 w-px bg-gray-300"></div>
                    <div className="add_event-link" onClick={handleOpenAddEvent}>
                        {/* <Button text={'Add event'} className={'ml-6'} /> */}
                        <Button className='bg-indigo-600 hover:bg-indigo-500'>Add event</Button>
                    </div>
                </div>

                <div className="relative ml-6 md:hidden">
                    <button type="button" onClick={handleClickMenu} className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open menu</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                        </svg>
                    </button>

                    {menuViewOpen && (
                        <div className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-0-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-0-item-0">Create event</a>
                            </div>
                            <div onClick={() => { todayHandler(); setMenuViewOpen(false) }} className="py-1" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-0-item-1">Go to today</a>
                            </div>
                            <div className="py-1" role="none">
                                <a href="#" onClick={() => handleClickMode(enumScheduleModes.DAY)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Day view</a>
                                <a href="#" onClick={() => handleClickMode(enumScheduleModes.WEEK)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Week view</a>
                                <a href="#" onClick={() => handleClickMode(enumScheduleModes.MONTH)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Month view</a>
                                <a href="#" onClick={() => handleClickMode(enumScheduleModes.YEAR)} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Year view</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Monitor
