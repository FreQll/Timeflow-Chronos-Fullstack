import React, { useReducer, useState } from "react";
import { enumEventTypes } from "../../helper/enumEventTypes";
import RadioInput from "../RadioInput";
import { Button } from "../ui/button";
import Dropdown from "../profile/Dropdown";
import AvatarBlock from "../profile/AvatarBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CalendarBlocks from "./CalendarBlocks";
import { CalendarIcon, HomeIcon } from "@radix-ui/react-icons";
import ProfileBlocks from "./ProfileBlocks";
import { getSavedState, savedState } from "@/redux/store";

const Panel = ({
  calendars,
  changeActiveEventTypes,
  activeCalendar,
  changeActiveCalendar,
}) => {
  const user = getSavedState().user;
  return (
    <div className="min-w-[200px] bg_gradient_2 h-[100%] p-[20px] z-30 flex flex-col gap-[20px]">
      <Tabs defaultValue="calendar" className="w-[100%]">
        <div className="flex gap-[20px] items-center justify-between">
          <AvatarBlock email={user?.email} />
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="calendar"
              className="py-[5px] px-[8px] data-[state=active]:bg-[#ffffffba]"
            >
              <CalendarIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="py-[5px] px-[8px] data-[state=active]:bg-[#ffffffba]"
            >
              <HomeIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="calendar" className="mt-[20px]">
          <CalendarBlocks
            calendars={calendars}
            activeCalendar={activeCalendar}
            changeActiveEventTypes={changeActiveEventTypes}
            changeActiveCalendar={changeActiveCalendar}
          />
        </TabsContent>
        <TabsContent value="profile" className="mt-[20px]">
          <ProfileBlocks calendars={calendars} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Panel;
