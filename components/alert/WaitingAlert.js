import Swal from "sweetalert2";
const WaitingAlert = () => {
    Swal.fire({
        title: "This process needs from 1 to 3 minutes!, please wait...",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
}

export default WaitingAlert;