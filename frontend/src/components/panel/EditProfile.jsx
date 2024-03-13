import { AvatarUpload } from "./AvatarUpload";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Save, Undo2 } from "lucide-react";
import { savedState } from "@/redux/store";
import { useState } from "react";
import { toastSuccess } from "@/helper/toastFunctions";
import axios, { POST_CONFIG } from "../../../API/axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/authActions";

export const EditProfile = ({ setIsSettingsOpen }) => {
  console.log(savedState.user);
  const [userLogin, setUserLogin] = useState(savedState.user.login);
  const [userEmail, setUserEmail] = useState(savedState.user.email);
  const [userFullName, setUserFullName] = useState(savedState.user.fullName);

  // const dispatch = useDispatch();

  const saveUpdates = async () => {
    try {
      const response = await axios.patch(
        `/api/user/${savedState.user.id}`,
        {
          login: userLogin,
          email: userEmail,
          full_name: userFullName,
        },
        POST_CONFIG
      );
      if (response.status === 200) {
        setIsSettingsOpen(false);
        toastSuccess("Profile updated");
        // dispatch(
        //   login({
        //     login: userLogin,
        //     email: userEmail,
        //     full_name: userFullName,
        //     id: savedState.user.id,
        //   })
        // );
        //! тут нужно ебануть диспатчем обновление данных про юзера
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollArea className="h-[80vh]">
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

          <Button onClick={() => saveUpdates()}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>

        <Button variant="secondary" onClick={() => setIsSettingsOpen(false)}>
          <Undo2 className="mr-2 h-4 w-4" /> Return
        </Button>
      </div>
    </ScrollArea>
  );
};
