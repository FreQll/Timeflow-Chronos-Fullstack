import { Outlet, useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Panel from '../components/Panel';
import Monitor from '../components/Monitor';

const Layout = ({ calendars, changeActiveEventTypes, activeCalendar, changeActiveCalendar }) => {
    return (
        <>
            <div className='flex h-[100vh] relative'>
                <Panel calendars={calendars} changeActiveEventTypes={changeActiveEventTypes} activeCalendar={activeCalendar} changeActiveCalendar={changeActiveCalendar} />
                <Outlet />
            </div>
        </>
    )
}

export default Layout