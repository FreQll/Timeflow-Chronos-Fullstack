import React from "react";
import { AvatarUpload } from "./AvatarUpload";

export const EditProfile = ({ setIsSettingsOpen }) => {
  return (
    <div className="flex flex-col gap-[15px] p-[10px] rounded-[10px] bg-[#ffffff99]">
      <div>
        <AvatarUpload />
      </div>

      <div>edit login and full name stuff</div>

      <div onClick={() => setIsSettingsOpen(false)}>back</div>
    </div>
  );
};
