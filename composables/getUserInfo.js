import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getUserInfo = async () => {
    const url = `https://writing-assistant-app.onrender.com/api/user`;
    
    try {
        const response = await axios.post(
            url,
            {},
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log(response.data.body);
        return response.data.body;
    } catch (error) {
        console.error(error);
        failAlert("Please wait for a minute before trying again!");
        throw error;
    }
};

export default getUserInfo;

