import Swal from "sweetalert2";
const signInDialog = (callback) => {
    Swal.fire({
        title: "You have to sign in before using our service",
        showDenyButton: true,
        confirmButtonText: "Sign in",
        denyButtonText: `Cancel`
      }), (result) => {
        if (result.isConfirmed) {
           callback();
          }
          else{

          }
      }
}

export default signInDialog;