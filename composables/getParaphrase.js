import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getParaphrase = async (type, params) => {
    console.log(params);
    console.log({text : params});
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
        console.log(response.data.body);
        return response.data.body.versions;
    } catch (error) {
        console.error(error);
        failAlert("Please wait for a minute before trying again!");
        throw error; 
    }
};

export default getParaphrase;
