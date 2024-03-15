import { toast } from "react-toastify";

export const toastError = (error) => {
  const message = error || error.message;

  toast.error(message);
};

export const toastSuccess = (mes) => {
  const message = mes || mes.message;

  toast.success(message);
};

export const toastMessage = (mes) => {
  const message = mes || mes.message;

  toast.info(message);
};
