import React, { useEffect, useState } from 'react'
import './App.css'
import Calendar from './components/Calendar';
import Panel from './components/Panel';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import AddEvent from './pages/AddEvent';
import axios from '../API/axios';

function App() {
  const [ calendars, setCalendars ] = useState();
  const [ activeEventTypes, setActiveEventTypes ] = useState([]);

  const getCalendarsByUserId = async (userId) => {
    const response = await axios.get(`/api/calendar/${userId}`, { withCredentials: true });
    console.log(response);
    if (response) { setCalendars(response.data); } 
    else { console.log('Error getting calendars'); }
  }

  const changeActiveEventTypes = (typeName) => {
    if (activeEventTypes?.includes(typeName)) {
      setActiveEventTypes(activeEventTypes => activeEventTypes.filter(current => current != typeName));
    } else {
      setActiveEventTypes(activeEventTypes => [...activeEventTypes, typeName]);
    }
  }

  useEffect(() => {
    const id = 'clrryqxh60000su3y7hxk1br8';
    getCalendarsByUserId(id)
  }, [])

  return (
    <Routes>
      {/* <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} /> */}

      <Route path='/' element={<Layout calendars={calendars} changeActiveEventTypes={changeActiveEventTypes} />}>
        <Route path='/' element={<Calendar activeEventTypes={activeEventTypes} />} />
        <Route path='/add-event' element={<AddEvent />} />

        {/* <Route path='/settings' element={<Settings />}>
          <Route path='/settings' element={<SettingsMain />} />
          <Route path='/settings/change-password' element={<ChangePassword />} />
          <Route path='/settings/change-email' element={<ChangeEmail />} />
          <Route path='/settings/change-name' element={<ChangeName />} />
        </Route> */}
        
        
      </Route>
    </Routes>
  );
}

export default App
