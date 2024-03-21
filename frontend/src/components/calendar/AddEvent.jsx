import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import DatePickerWithRange from "@/components/DatePicker";
import ComboboxPopover from "@/components/ComboboxPopover";
import {
  enumEventTypes,
  enumEventTypesArray,
} from "../../helper/enumEventTypes";
import CloseButtonCircled from "@/components/buttons/CloseButtonCircled";
import { formatDate, formatStringToIso, getTodayDate } from "../../helper/momentFunc";
import axios, { POST_CONFIG } from "../../../API/axios";
import { objToJson } from "../../helper/stringFunc";
import { getSavedState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Separator } from "@radix-ui/react-separator";

const AddEvent = ({ handleOpenAddEvent, calendars }) => {
  const user = getSavedState().user;
  const navigate = useNavigate();

  const [title, setTitle] = useState("New event");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(enumEventTypes["ARRANGEMENT"]);
  const [date, setDate] = useState({
    from: new Date(getTodayDate()),
    to: new Date(getTodayDate().add(1, "month")),
  });
  const [time, setTime] = useState({
    from: {
      hour: "09",
      minutes: "00",
    },
    to: {
      hour: "10",
      minutes: "00",
    },
  });
  const color = "ffffff";
  const [selectedCalendar, setSelectedCalendar] = useState();

  const setEventCalendar = async (calendar) => {
    if (calendar) {
      const response = await axios.get(
        `/api/calendar/calendarInfo/${calendar.calendar.id}`,
        { withCredentials: true }
      );
      if (response) {
        setSelectedCalendar(response.data);
      } else {
        console.log("Error creating event");
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeHour = (e, field) => {
    let value = e.target.value;
    if (parseInt(value) > 24) value = "24";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    setTime((prevTime) => ({
      ...prevTime,
      [field]: {
        ...prevTime[field],
        hour: value,
      },
    }));
  };

  const handleChangeMinutes = (e, field) => {
    let value = e.target.value;
    if (parseInt(value) > 59) value = "59";
    if (!parseInt(value)) value = "0";
    if (value.length >= 3 && value.charAt(0) == "0")
      value = value.charAt(1) + value.charAt(2);
    if (value.length == 1) value = "0" + value;

    setTime((prevTime) => ({
      ...prevTime,
      [field]: {
        ...prevTime[field],
        minutes: value,
      },
    }));
  };

  const handleSave = async () => {
    const { formatDateStart, formatDateEnd } = formatStringToIso(time.from?.hour, time.from?.minutes, time.to?.hour, time.to?.minutes, date.from || date.to, date.to || date.from)

    const options = {
      name: title,
      content: description,
      type: type?.key || type.title.toUpperCase(),
      start: formatDateStart,
      end: formatDateEnd,
      color: color,
      userId: user?.id,
      calendarId: selectedCalendar?.id || calendars[0].calendar.id,
    };

    try {
      const resp = await axios.post(
        `/api/event`,
        objToJson(options),
        POST_CONFIG
      );
      if (resp) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error creating event", error);
    }
  };

  return (
    <DrawerContent className="bg-[url('./images/form_bg.png')] bg-bottom bg-cover flex flex-col items-center">
      {calendars && (
        <div className="max-w-lg px-[20px] pt-[10px] pb-[40px] bg-[#f8f8f8a0] rounded-tl-[10px] rounded-tr-[10px] mt-[10px] backdrop-blur-[10px]">
          <DrawerHeader>
            <DrawerTitle>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="outline-none bg-transparent text-[40px]"
                autoFocus
              />
            </DrawerTitle>
            <DrawerDescription className="mt-[5px]">
              <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={handleDescriptionChange}
                className="outline-none bg-transparent text-[16px] text-black"
              />
            </DrawerDescription>
          </DrawerHeader>
          <Separator className="h-[1px] bg-black opacity-10" />
          <table className=" border-separate border-spacing-[10px] py-[10px]">
            <tbody>
              <tr>
                <td className="text-right">
                  <Label>Duration: </Label>
                </td>
                <td>
                  <DatePickerWithRange
                    bgColor={"#ffffffab"}
                    className={"w-max"}
                    date={date}
                    setDate={setDate}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">
                  <Label>Time: </Label>
                </td>
                <td className="flex items-center gap-[5px] text-[14px]">
                  <div className="flex">
                    <input
                      className="w-[20px] bg-transparent text-end outline-none"
                      value={time.from?.hour}
                      onChange={(e) => handleChangeHour(e, "from")}
                    />
                    <span>:</span>
                    <input
                      className="w-[20px] bg-transparent outline-none"
                      value={time.from?.minutes}
                      onChange={(e) => handleChangeMinutes(e, "from")}
                    />
                  </div>
                  <span>–</span>
                  <div className="flex">
                    <input
                      className="w-[20px] bg-transparent text-end outline-none"
                      value={time.to?.hour}
                      onChange={(e) => handleChangeHour(e, "to")}
                    />
                    <span>:</span>
                    <input
                      className="w-[20px] bg-transparent outline-none"
                      value={time.to?.minutes}
                      onChange={(e) => handleChangeMinutes(e, "to")}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-right">
                  <Label>Type: </Label>
                </td>
                <td>
                  <ComboboxPopover
                    buttonColor={"bg-[#ffffffab]"}
                    statuses={enumEventTypesArray}
                    placeholder={"Set type"}
                    selectedStatusName={enumEventTypes[type]?.title}
                    selectedStatus={type}
                    setSelectedStatus={setType}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">
                  <Label>Calendar: </Label>
                </td>
                <td>
                  <ComboboxPopover
                    buttonColor={"bg-[#ffffffab]"}
                    statuses={calendars}
                    placeholder={"Set calendar"}
                    selectedStatusName={
                      selectedCalendar?.name || calendars[0].calendar.name
                    }
                    selectedStatus={selectedCalendar}
                    setSelectedStatus={setEventCalendar}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Separator className="h-[1px] bg-black opacity-10" />
          <DrawerFooter>
            <div
              className="flex gap-[20px] justify-between w-[100%]"
              onClick={handleSave}
            >
              <Button
                variant="outline"
                className="w-[-webkit-fill-available] bg-indigo-600 hover:bg-indigo-500 text-white hover:text-white"
              >
                Save
              </Button>
            </div>
          </DrawerFooter>
        </div>
      )}
    </DrawerContent>
  );
};

export default AddEvent;
