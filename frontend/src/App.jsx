import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Calendar from "./pages/Calendar";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import axios from "../API/axios";
import Auth from "./pages/Auth";
import { getSavedState } from "./redux/store";
import { enumEventTypes } from "./helper/enumEventTypes";
import { checkTokenExpiration } from "./redux/actions/authActions";
import { toastError } from "./helper/toastFunctions";
import AddEvent from "./components/calendar/AddEvent";
import ConfirmAdding from "./pages/ConfirmAdding";

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
  };

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
      toastError("Error get calendar info");
    }
  };

  useEffect(() => {
    if (user) setDefaultCalendar(user.id);
  }, []);

  useEffect(() => {
    dispatch(checkTokenExpiration());
    if (user) getCalendarsByUserId(user.id);
  }, [location]);

  return (
    <Routes>
      <Route path="/authentication" element={<Auth />} />

      <Route path="/confirmAdding/:id/:token" element={<ConfirmAdding />} />

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
      </Route>
    </Routes>
  );
}

export default App;
