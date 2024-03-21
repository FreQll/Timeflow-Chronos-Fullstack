import { Cross2Icon } from "@radix-ui/react-icons";

const CloseButtonCircled = ({ handleClose }) => {
  return (
    <div
      className="rounded-[50%] bg-red-500 hover:bg-red-400 text-white h-fit p-[1px] flex cursor-pointer
    absolute top-[10px] right-[10px]"
    >
      <Cross2Icon
        onClick={handleClose}
        width={9}
        height={9}
        className="opacity-0 hover:opacity-100"
      />
    </div>
  );
};

export default CloseButtonCircled;
