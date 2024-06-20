import successMessage from "~/components/alert/SuccessAlert";
import FailAlert from "~/components/alert/FailAlert";
import axios from "axios";

const GetPlagiarismCheck = async (params) => {
    console.log(params);
    console.log({text : params});
    const url = `https://writing-assistant-app.onrender.com/api/assistant/plagiarism-checker`;
    
    try {
        const response = await axios.post(
            url,
            { "text": params },
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
        FailAlert("Please wait for a minute before trying again!");
        throw error;
    }
};

export default GetPlagiarismCheck;

