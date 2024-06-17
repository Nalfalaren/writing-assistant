import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getGrammarCheck = async (params) => {

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
        failAlert("Please wait for a minute before trying again!");
        throw error;
    }
};

export default getGrammarCheck;
