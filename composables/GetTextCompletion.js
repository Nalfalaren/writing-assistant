import failAlert from "~/components/alert/FailAlert";
import successMessage from "~/components/alert/SuccessAlert";

const getTextCompletion = async (paragraph, types) => {
    const url = `http://localhost:8686/api/assistant/text-completion`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text : paragraph, type: types})
    });

    if (response.ok) {
        const data = await response.json();
        if(data.status === 500){
            failAlert('Problem occured! Please try again!');
            return;
        }
        successMessage(data.message);
        console.log(data.status);
        return data;
    } else if (response.status === 403) { 
        const error = await response.json();
        return error;
    }
    return;
}

export default getTextCompletion;
