import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getGrammarCheck = async (params) => {

    const url = `http://localhost:8686/api/assistant/grammar-checker`;

    try {
        const response = await axios.post(
            url,
            { "text": params }, 
            {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.response);
        failAlert("Failed to check grammar.");
        throw error; // Re-throw error after logging and showing alert
    }
};

export default getGrammarCheck;
