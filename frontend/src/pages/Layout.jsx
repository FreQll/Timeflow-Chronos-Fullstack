import { Outlet, useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Panel from '../components/Panel';
import Monitor from '../components/Monitor';

const Layout = ({ calendars, changeActiveEventTypes }) => {
    return (
        <>
            <div className='flex h-[100vh]'>
                <Panel calendars={calendars} changeActiveEventTypes={changeActiveEventTypes} />
                <Outlet />
            </div>
        </>
    )
}

export default Layout