import ButtonWithBorder from "@/components/buttons/ButtonWithBorder";
import axios from "../../API/axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ConfirmAdding = () => {
  const { id, token } = useParams();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const confirmAdding = async () => {
      try {
        await axios.get(`/api/calendar/addUserToCalendar/${id}/${token}`);
        setResponse("success");
        setTimeout(() => {
          window.location.replace("/");
        }, 5000);
      } catch (error) {
        setResponse("error");
        console.log(error);
      }
    };

    confirmAdding();
  }, [id, token]);

  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] bg_gradient">
      <div className="text-[196px] font-bold text-white leading-[200px]">
        {response && response.toLocaleUpperCase()}
      </div>
      <div className="text-white">
        {response == "success" && (
          <div className="text-center flex flex-col gap-[20px] items-center">
            <div>
              <div className="text-[24px] font-semibold">
                You confirmed adding to calendar!
              </div>
              <div className="opacity-80">
                In 5 seconds you will be redirected to the calendar page. If
                not, click the button below.
              </div>
            </div>
            <Link to={"/"}>
              <ButtonWithBorder
                text={"Go To Calendar"}
                className={
                  "border-white text-white w-fit hover:bg-white hover:text-[#6352ed]"
                }
              />
            </Link>
          </div>
        )}
        {response == "error" && (
          <div className="text-center flex flex-col gap-[20px] items-center">
            <div>
              <div className="text-[24px] font-semibold">
                Error confirming adding to calendar
              </div>
              <div className="opacity-80">
                Please try again or contact support.
              </div>
            </div>
            <Link to={"/"}>
              <ButtonWithBorder
                text={"Go To Calendar"}
                className={
                  "border-white text-white w-fit hover:bg-white hover:text-[#6352ed]"
                }
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmAdding;
