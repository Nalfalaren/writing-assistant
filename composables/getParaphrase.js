import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
import axios from "axios";

const getParaphrase = async (type, params) => {
    console.log(params);
    console.log({text : params});
    const url = `http://localhost:8686/api/assistant/paraphrase`;
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
        failAlert("OOps! Some problems occurs.");
        throw error; 
    }
};

export default getParaphrase;
