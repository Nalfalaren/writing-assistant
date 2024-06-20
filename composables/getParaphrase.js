import successMessage from "~/components/alert/SuccessAlert";
import FailAlert from "~/components/alert/FailAlert";
import axios from "axios";

const GetParaphrase = async (type, params) => {
    const url = `https://writing-assistant-app.onrender.com/api/assistant/paraphrase`;
    try {
        const response = await axios.post(
            url,
            {"form": type, "text" : params}, 
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        return response.data.body.versions;
    } catch (error) {
        console.error(error);
        FailAlert("Please wait for a minute before trying again!");
        throw error; 
    }
};

export default GetParaphrase;
