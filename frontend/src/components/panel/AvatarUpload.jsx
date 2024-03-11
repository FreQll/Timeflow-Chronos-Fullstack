import { savedState } from "@/redux/store";
import { toastSuccess } from "@/helper/toastFunctions";
import axios from "../../../API/axios";

export const AvatarUpload = () => {
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      await axios.patch(`/api/user/avatar/${savedState.user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await toastSuccess("Avatar updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-3 center mx-auto">
      <div className="px-4 py-5 rounded-lg text-center flex justify-center flex-col items-center">
        <div className="mb-4">
          <img
            src={`http://localhost:3000/api/user/avatar/${savedState.user.email}`}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <label className="cursor-pointer mt-6">
          <span className="mt-2 text-sm leading-normal px-4 py-2 bg-blue-500 text-white rounded-full">
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
