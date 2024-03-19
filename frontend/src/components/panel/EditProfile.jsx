import { AvatarUpload } from "./AvatarUpload";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { getSavedState } from "@/redux/store";
import { useState } from "react";
import { toastError, toastSuccess } from "@/helper/toastFunctions";
import axios from "../../../API/axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/authActions";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import ButtonBlue from "../buttons/ButtonBlue";

export const EditProfile = () => {
  const user = getSavedState().user;
  const [userLogin, setUserLogin] = useState(user?.login);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userFullName, setUserFullName] = useState(user?.fullName);

  const dispatch = useDispatch();

  const saveUpdates = async () => {
    try {
      const response = await axios.patch(`/api/user/${user?.id}`, {
        login: userLogin,
        email: userEmail,
        full_name: userFullName,
      });
      if (response.status === 200) {
        toastSuccess("Profile updated");
        dispatch(
          login({
            login: userLogin,
            email: userEmail,
            full_name: userFullName,
            id: user.id,
          })
        );
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-[600] text-[20px]">
          Edit Profile
        </DialogTitle>
        <Separator className="h-[1px] bg-gray-200" />
      </DialogHeader>

      <div className="flex flex-col gap-[15px] p-[10px] rounded-[10px] bg-[#ffffff99]">
        <div>
          <AvatarUpload />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div>
            <Label htmlFor="login">Login</Label>
            <Input
              label="Login"
              id="login"
              placeholder="Login"
              className="bg-white mt-1"
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Email"
              type="email"
              id="email"
              className="bg-white mt-1"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              placeholder="Full Name"
              id="full_name"
              className="bg-white mt-1"
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <ButtonBlue text={"Save"} onClick={saveUpdates} className="w-auto" />
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};
