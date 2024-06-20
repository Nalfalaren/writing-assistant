import successMessage from "~/components/alert/SuccessAlert";
import FailAlert from "~/components/alert/FailAlert";
import axios from "axios";

const GetUserInfo = async () => {
    const url = `https://writing-assistant-app.onrender.com/api/auth/user`;
    
    try {
        const response = await axios.get(
            url
        );
        return response.data.body;
    } catch (error) {
        console.error(error);
        FailAlert("Please wait for a minute before trying again!");
        throw error;
    }
};

export default GetUserInfo;

