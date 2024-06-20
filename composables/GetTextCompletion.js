import FailAlert from "~/components/alert/FailAlert";
import axios from "axios";

const GetTextCompletion = async (params) => {

    try {
        const response = await axios.post(
            'https://writing-assistant-app.onrender.com/api/assistant/text-completion',
            {text: params},
            {
                withCredentials: true,
            }
        );
        return response.data.body.versions;
    } catch (error) {
        console.error(error.response);
        FailAlert("Please wait for a minute before trying again!");
        throw error;
    }
};

export default GetTextCompletion;
