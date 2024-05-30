import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getPlagiarismCheck = async (params) => {
    console.log(params);
    console.log({text : params});
    const url = `http://localhost:8686/api/assistant/plagiarism-checker`;
    try {
        const response = await axios.post(
            url,
            {"text" : params}, 
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
        failAlert("Failed to check grammar.");
        throw error; 
    }
};

export default getPlagiarismCheck;
