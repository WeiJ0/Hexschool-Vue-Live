import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.6.16/src/sweetalert2.js';

export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    text: message,
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: "error",
    text: message,
  });
};
