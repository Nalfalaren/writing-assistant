import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getGrammarCheck = async (params) => {
    console.log(params);
    
    const url = `http://localhost:8686/api/assistant/grammar-checker`;

    try {
        console.log(params);
        const response = await axios.post(
            url,
            { "text": params }, 
            {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true,
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response);
        failAlert("Please wait for a minute before trying again!");
        throw error; 
    }
};

export default getGrammarCheck;
