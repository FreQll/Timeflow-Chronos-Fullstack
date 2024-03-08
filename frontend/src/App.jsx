import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Calendar from "./pages/Calendar";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import axios from "../API/axios";
import Auth from "./pages/Auth";
import store, { getSavedState } from "./redux/store";
import ErrorPage from "./pages/ErrorPage";
import { enumEventTypes, enumEventTypesArray } from "./helper/enumEventTypes";
import { checkTokenExpiration } from "./redux/actions/authActions";
import { toastError } from "./helper/toastFunctions";
import AddEvent from "./components/calendar/AddEvent";

function App() {
  const user = getSavedState()?.user;
  const dispatch = useDispatch();
  const location = useLocation();

  const [calendars, setCalendars] = useState();
  const [activeEventTypes, setActiveEventTypes] = useState(() =>
    Object.entries(enumEventTypes).map(([key]) => key)
  );
  const [activeCalendar, setActiveCalendar] = useState([]);

  const getCalendarsByUserId = async (userId) => {
    try {
      const response = await axios.get(`/api/calendar/${userId}`, {
        withCredentials: true,
      });
      setCalendars(response.data);
    } catch (error) {
      // console.log("Error getting calendars");
      toastError("Error getting calendars");
    }
  };

  const setDefaultCalendar = async (userId) => {
    try {
      const response = await axios.get(`/api/calendar/${userId}`, {
        withCredentials: true,
      });
      setActiveCalendar(response.data[0].calendar);
    } catch (error) {
      toastError("Error getting calendars");
    }
  }

  const changeActiveEventTypes = (typeName) => {
    if (activeEventTypes?.includes(typeName)) {
      setActiveEventTypes((activeEventTypes) =>
        activeEventTypes.filter((current) => current != typeName)
      );
    } else {
      setActiveEventTypes((activeEventTypes) => [
        ...activeEventTypes,
        typeName,
      ]);
    }
  };

  const changeActiveCalendar = async (calendarId) => {
    try {
      const response = await axios.get(
        `/api/calendar/calendarInfo/${calendarId}`,
        { withCredentials: true }
      );
      setActiveCalendar(response.data);
    } catch (error) {
      // console.log("Error get calendar info");
      toastError("Error get calendar info");
    }
  };

  useEffect(() => {
    if (user) setDefaultCalendar(user.id);
  }, [])

  useEffect(() => {
    dispatch(checkTokenExpiration());
    if (user) getCalendarsByUserId(user.id);
  }, [location]);

  return (
    <Routes>
      <Route path="/authentication" element={<Auth />} />
      {/* <Route path='/registration' element={<Registration />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />  */}

      <Route
        path="/"
        element={
          <Layout
            calendars={calendars}
            changeActiveEventTypes={changeActiveEventTypes}
            activeCalendar={activeCalendar}
            changeActiveCalendar={changeActiveCalendar}
          />
        }
      >
        <Route
          path="/"
          element={
            <Calendar
              activeEventTypes={activeEventTypes}
              calendar={activeCalendar}
              calendars={calendars}
            />
          }
        />
        <Route path="/add-event" element={<AddEvent />} />

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

export default App;
