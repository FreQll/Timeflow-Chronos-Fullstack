import { useEffect, useState } from "react";
import { formatDate, formatStringToIso } from "../../helper/momentFunc";
import DatePickerWithRange from "../DatePicker";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import ComboboxPopover from "../ComboboxPopover";
import { enumEventTypesArray } from "../../helper/enumEventTypes";
import axios, { GET_CONFIG, POST_CONFIG } from "../../../API/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TrashIcon } from "@radix-ui/react-icons";
import { toastSuccess } from "@/helper/toastFunctions";
import { PopoverContent } from "@radix-ui/react-popover";

const EventDetails = ({ currentEvent, calendars, selectedCalendar }) => {
  const [newTitle, setNewTitle] = useState(currentEvent?.name);
  const [newDescription, setNewDescription] = useState(currentEvent?.content);
  const [eventCalendar, setEventCalendar] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const [type, setType] = useState(currentEvent.type);
  const [date, setDate] = useState({
    from: currentEvent.start,
    to: currentEvent.end,
  });
  const [time, setTime] = useState({
    from: {
      hour: formatDate(currentEvent?.start, "HH"),
      minutes: formatDate(currentEvent?.start, "mm"),
    },
    to: {
      hour: formatDate(currentEvent?.end, "HH"),
      minutes: formatDate(currentEvent?.end, "mm"),
    },
  });

  const getSelectedCalendar = async () => {
    const response = await axios.get(
      `/api/calendar/calendarByEvent/${currentEvent.id}`,
      GET_CONFIG
    );
    if (response.status == 200) setEventCalendar(response.data);
  };

  useEffect(() => {
    getSelectedCalendar();
  }, [location]);

  const updateData = async (data) => {
    const response = await axios.patch(
      `/api/event/${currentEvent.id}`,
      data,
      POST_CONFIG
    );
    if (response) {
      navigate("/");
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    const data = {
      name: e.target.value,
    };
    updateData(data);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    const data = {
      content: e.target.value,
    };
    updateData(data);
  };

  const handleDurationChange = (e) => {
    if (e) {
      if (!e.from) setDate({ from: e.to, to: e.to });
      else if (!e.to) setDate({ from: e.from, to: e.from });
      else setDate(e);
      const { formatDateStart, formatDateEnd } = formatStringToIso(
        time.from?.hour,
        time.from?.minutes,
        time.to?.hour,
        time.to?.minutes,
        e?.from || e?.to,
        e?.to || e?.from
      );
      const data = {
        start: formatDateStart,
        end: formatDateEnd,
      };
      updateData(data);
    } else {
      setDate(e);
    }
  };

  const changeTime = (time, field, timeType) => {
    setTime((prevTime) => ({
      ...prevTime,
      [field]: {
        ...prevTime[field],
        [timeType]: time,
      },
    }));
  };

  const handleChangeStartHour = (e) => {
    let value = e.target.value;
    if (parseInt(value) > 24) value = "24";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    changeTime(value, "from", "hour");
    if (value.length != 2) return;

    const { formatDateStart } = formatStringToIso(
      value,
      time.from?.minutes,
      time.to?.hour,
      time.to?.minutes,
      date.from,
      date.to
    );
    let data = {
      start: new Date(formatDateStart),
    };

    if (value > time.to.hour) {
      changeTime(parseInt(value) + 1, "to", "hour");
      const { formatDateEnd } = formatStringToIso(
        time.from?.hour,
        time.from?.minutes,
        parseInt(value) + 1,
        time.to?.minutes,
        date.from,
        date.to
      );
      data = {
        start: new Date(formatDateStart),
        end: new Date(formatDateEnd),
      };
    }

    updateData(data);
  };

  const handleChangeStartMinutes = (e) => {
    let value = e.target.value;
    if (parseInt(value) > 59) value = "59";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    changeTime(value, "from", "minutes");
    if (value.length != 2) return;

    const { formatDateStart } = formatStringToIso(
      time.from?.hour,
      value,
      time.to?.hour,
      time.to?.minutes,
      date.from,
      date.to
    );
    const data = {
      start: new Date(formatDateStart),
    };
    updateData(data);
  };

  const handleChangeEndHour = (e) => {
    let value = e.target.value;
    if (parseInt(value) > 24) value = "24";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    changeTime(value, "to", "hour");
    if (value.length != 2) return;

    const { formatDateEnd } = formatStringToIso(
      time.from?.hour,
      time.from?.minutes,
      value,
      time.to?.minutes,
      date.from,
      date.to
    );
    let data = {
      end: new Date(formatDateEnd),
    };

    if (value < time.from.hour) {
      changeTime(parseInt(value) - 1, "from", "hour");
      const { formatDateStart } = formatStringToIso(
        parseInt(value) - 1,
        time.from?.minutes,
        time.to?.hour,
        time.to?.minutes,
        date.from,
        date.to
      );
      data = {
        start: new Date(formatDateStart),
        end: new Date(formatDateEnd),
      };
    }

    updateData(data);
  };

  const handleChangeEndMinutes = (e) => {
    let value = e.target.value;
    if (parseInt(value) > 59) value = "59";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    changeTime(value, "to", "minutes");
    if (value.length != 2) return;

    const { formatDateEnd } = formatStringToIso(
      time.from?.hour,
      time.from?.minutes,
      time.to?.hour,
      value,
      date.from,
      date.to
    );
    const data = {
      end: new Date(formatDateEnd),
    };
    updateData(data);
  };

  const handleTypeChange = (e) => {
    setType(e);

    const data = {
      type: e.key,
    };
    updateData(data);
  };

  const handleCalendarChange = (e) => {
    setEventCalendar(e.calendar);

    const data = {
      calendarId: e.calendar.id,
    };
    updateData(data);
  };

  const eventDelete = async () => {
    const response = await axios.delete(
      `api/event/${currentEvent.id}`,
      GET_CONFIG
    );
    if (response.status == 200) {
      navigate("/");
      toastSuccess("Event deleted successfully!");
    }
  };

  return (
    <PopoverContent className="w-[500px] z-[20] bg-gray-100 border border-gray-400 rounded-[10px] p-[20px] box_shadow">
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="font-medium leading-none flex gap-[20px] justify-between">
            <input
              value={newTitle}
              onChange={handleTitleChange}
              className="text-[18px] p-0 border-0 outline-none active:outline-none bg-transparent"
            />
            <div
              onClick={eventDelete}
              className="cursor-pointer w-[20px] h-[20px] text-red-500"
            >
              <TrashIcon />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <input
              type="text"
              value={newDescription}
              placeholder="No description"
              onChange={handleDescriptionChange}
              className="outline-none bg-transparent"
            />
          </p>
        </div>
        <Separator className="bg-black h-[1px] opacity-10" />
        <div className="flex gap-[10px]">
          <DatePickerWithRange
            className={"bg-transparent w-max"}
            date={date}
            setDate={handleDurationChange}
          />

          <div className="flex items-center gap-[5px] text-[14px]">
            <div className="flex">
              <input
                className="w-[20px] bg-transparent text-end outline-none"
                value={time.from?.hour}
                onChange={(e) => handleChangeStartHour(e)}
              />
              <span>:</span>
              <input
                className="w-[20px] bg-transparent outline-none"
                value={time.from?.minutes}
                onChange={(e) => handleChangeStartMinutes(e)}
              />
            </div>
            <span>–</span>
            <div className="flex">
              <input
                className="w-[20px] bg-transparent text-end outline-none"
                value={time.to?.hour}
                onChange={(e) => handleChangeEndHour(e)}
              />
              <span>:</span>
              <input
                className="w-[20px] bg-transparent outline-none"
                value={time.to?.minutes}
                onChange={(e) => handleChangeEndMinutes(e)}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="type">Type</Label>
            <ComboboxPopover
              id="type"
              statuses={enumEventTypesArray}
              title={"Set type"}
              selectedStatus={type}
              setSelectedStatus={handleTypeChange}
              buttonColor={"bg-white"}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="calendar">Calendar</Label>
            {eventCalendar && (
              <ComboboxPopover
                id="calendar"
                statuses={calendars}
                title={"Set calendar"}
                selectedStatus={eventCalendar}
                setSelectedStatus={handleCalendarChange}
                buttonColor={"bg-white"}
              />
            )}
          </div>
        </div>
      </div>
    </PopoverContent>
  );
};
export default EventDetails;
