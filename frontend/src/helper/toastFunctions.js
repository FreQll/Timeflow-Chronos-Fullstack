// import { toastr } from "react-redux-toastr";
import { toast } from "react-toastify";

export const toastError = (error, title = null) => {
  const message = error || error.message;

  // toastr.error(title || 'Error request', message);
  toast.error(message);
  throw message;
};

export const toastSuccess = (mes, title = null) => {
  const message = mes || mes.message;

  // toastr.success(title || 'Success', message);
  toast.success(message);
  throw message;
};

export const toastMessage = (mes, title = null) => {
  const message = mes || mes.message;

  toast.message(message);
};
