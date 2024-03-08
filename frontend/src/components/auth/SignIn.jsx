import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import ButtonGradient from "../buttons/ButtonGradient";
import ButtonUnderscore from "../buttons/ButtonUnderscore";
import axios, { POST_CONFIG } from "../../../API/axios";
import { objToJson } from "../../helper/stringFunc";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { getSavedState } from "@/redux/store";
import { toastError, toastSuccess } from "@/helper/toastFunctions";

const SignIn = ({ active, handleClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const clickSend = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `/api/auth/login`,
        objToJson(data),
        POST_CONFIG
      );
      if (response) {
        dispatch(login(response.data.user));
        console.log(getSavedState());
        if (getSavedState().isAuthenticated) navigate("/");
        toastSuccess("Logged in successfully");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toastError(error.response.data.message);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-[20px] text-center py-[20px] px-[40px]
    absolute top-0 left-[60%] h-[100%] w-[40%] z-[3] opacity-0 form_transition 
    ${active == "login" && "opacity-100 translate-x-[-150%] z-[5]"}`}
    >
      <div>
        <h1 className="uppercase text-[#7B6CEA] font-[600] text-[24px]">
          Sign In
        </h1>
        <div className="text-[14px] opacity-60">
          Use your email to log in to account
        </div>
      </div>
      <form
        onSubmit={clickSend}
        className="flex flex-col gap-[20px] w-[100%] items-center"
      >
        <div className="flex flex-col gap-[10px] w-[100%]">
          <Input
            type="email"
            onChange={handleChangeEmail}
            placeholder="Email"
            className="w-[100%]"
          />
          <Input
            type="password"
            onChange={handleChangePassword}
            placeholder="Password"
            className="w-[100%]"
          />
        </div>
        <div onClick={() => handleClick("reset_password")}>
          <ButtonUnderscore
            type="button"
            text={"Forgot your password?"}
            className={"text-[#7B6CEA] p-0 h-auto"}
          />
        </div>
        <ButtonGradient
          type="submit"
          text={"Sign in"}
          className={"w-[100px]"}
        />
      </form>
    </div>
  );
};

export default SignIn;
