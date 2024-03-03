import { Outlet, useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Panel from '../components/panel/Panel';
import Monitor from '../components/Monitor';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "../components/ui/resizable"
import ErrorPage from './ErrorPage';
import { savedState } from '../redux/store';

const Layout = ({ calendars, changeActiveEventTypes, activeCalendar, changeActiveCalendar }) => {
  const isAuth = savedState?.isAuthenticated;

  return (
        <div className='w-[100vw] h-[100vh]'>
            {isAuth ? (
                <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[200px]"
                >
                    <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
                        <Panel calendars={calendars} changeActiveEventTypes={changeActiveEventTypes} activeCalendar={activeCalendar} changeActiveCalendar={changeActiveCalendar} />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75}>
                        <Outlet />
                    </ResizablePanel>
                </ResizablePanelGroup>
            ) : (
                <ErrorPage errorCode={'401'} />
            )}
        </div>
    )
}

export default Layout