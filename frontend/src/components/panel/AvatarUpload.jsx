import { getSavedState } from "@/redux/store";
import { toastError, toastSuccess } from "@/helper/toastFunctions";
import axios from "../../../API/axios";
import { useNavigate } from "react-router-dom";

export const AvatarUpload = () => {
  const navigate = useNavigate();
  const user = getSavedState().user;

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      await axios.patch(`/api/user/avatar/${user?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastSuccess("Avatar updated");
      navigate('/');
    } catch (error) {
      // console.log(error);
      toastError(error.message);
    }
  };

  return (
    <div className="py-3 center mx-auto">
      <div className="px-4 py-5 rounded-lg text-center flex justify-center flex-col items-center">
        <div className="mb-4">
          <img
            src={`http://localhost:3000/api/user/avatar/${user?.email}`}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <label className="cursor-pointer mt-6">
          <span className="mt-2 text-sm leading-normal px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded-md font-bold">
            Select Avatar
          </span>
          <input
            type="file"
            className="hidden"
            multiple="multiple"
            accept="accept"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      </div>
    </div>
  );
};
