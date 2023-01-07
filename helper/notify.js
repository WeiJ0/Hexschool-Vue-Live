import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11.6.16/src/sweetalert2.js";

export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    html: message,
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: "error",
    html: message,
  });
};

export const showComfirm = (message, callback) => {
  return Swal.fire({
    icon: "warning",
    text: message,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) callback();
  });
};
