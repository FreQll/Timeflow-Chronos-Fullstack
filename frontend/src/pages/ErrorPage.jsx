import ButtonWithBorder from "@/components/buttons/ButtonWithBorder";
import { Link } from "react-router-dom";

const ErrorPage = ({ errorCode }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] bg_gradient">
      <div className="text-[196px] font-bold text-white leading-[200px]">
        {errorCode}
      </div>
      <div className="text-white">
        {errorCode == "401" && (
          <div className="text-center flex flex-col gap-[20px] items-center">
            <div>
              <div className="text-[24px] font-semibold">Not authorized!</div>
              <div className="opacity-80">
                You must be logged in to access the calendar
              </div>
            </div>
            <Link to={"/authentication"}>
              <ButtonWithBorder
                text={"Back to registration"}
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

export default ErrorPage;
