import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { Input } from "../ui/input";
import ButtonBlue from "../buttons/ButtonBlue";
import { Button } from "../ui/button";
import ComboboxPopover from "../ComboboxPopover";
import axios, { GET_CONFIG, POST_CONFIG } from "../../../API/axios";
import { getSavedState } from "@/redux/store";
import { enumUsersRoles, enumUsersRolesArray } from "@/helper/enumUsersRoles";
import { toastMessage, toastSuccess } from "@/helper/toastFunctions";

const InviteUsers = ({ calendars }) => {
  const [email, setEmail] = useState("");
  console.log(calendars);
  const [selectedCalendar, setSelectedCalendar] = useState(
    calendars && calendars[0].calendar
  );
  const [selectedRole, setSelectedRole] = useState(enumUsersRoles.GUEST);
  const user = getSavedState()?.user;

  console.log(selectedCalendar);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = async () => {
    const inviteEmail = await axios.get(`/api/user/email/${email}`, GET_CONFIG);

    console.log(selectedCalendar.calendar.id);

    const data = {
      email: inviteEmail.data[0].email,
      ownerId: user.id,
      calendarId: selectedCalendar.calendar.id,
      role: selectedRole.title.toUpperCase(),
    };

    try {
      await axios.post("/api/calendar/addUserToCalendar", data, POST_CONFIG);
      await toastSuccess("User invited successfully!");
    } catch (error) {
      toastMessage(error.response.data.message);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-[600] text-[20px]">
          Invite users
        </DialogTitle>
        <Separator className="h-[1px] bg-gray-200" />
      </DialogHeader>
      <table className=" border-separate border-spacing-[10px] py-[10px]">
        <tbody>
          <tr>
            <td className="text-right">
              <Label htmlFor="title" className="">
                Email
              </Label>
            </td>
            <td>
              <Input
                type="text"
                id="title"
                value={email}
                onChange={handleEmailChange}
                className="outline-none bg-transparent text-black w-[100%]"
                autoFocus
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">
              <Label>Calendar: </Label>
            </td>
            <td>
              <ComboboxPopover
                className="w-[100%]"
                buttonColor={"bg-[#ffffffab]"}
                statuses={calendars}
                placeholder={"Set calendar"}
                selectedStatusName={selectedCalendar?.name}
                selectedStatus={selectedCalendar}
                setSelectedStatus={setSelectedCalendar}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">
              <Label>Role: </Label>
            </td>
            <td>
              <ComboboxPopover
                className="w-[100%]"
                buttonColor={"bg-[#ffffffab]"}
                statuses={enumUsersRolesArray}
                placeholder={"Set role"}
                selectedStatusName={selectedRole.title}
                selectedStatus={selectedRole}
                setSelectedStatus={setSelectedRole}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <DialogFooter>
        <ButtonBlue text={"Invite"} onClick={handleInvite} className="w-auto" />
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default InviteUsers;
