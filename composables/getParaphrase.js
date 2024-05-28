import SuccessAlert from '@/components/alert/SuccessAlert.js'
import failAlert from '~/components/alert/FailAlert.js';
const getParaphrase = async (params) => {
    console.log(params);
    const url = `http://localhost:8686/api/assistant/paraphrase`;
    console.log(url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: params,
          }),
    });

    if (response.ok) {
        const data = await response.json();
        if(data.status === 500){
            failAlert('Problem occured! Please try again!');
            return;
        }
        SuccessAlert(data.message);
        return data;
    } else if (response.status === 403) { 
        const error = await response.json();
        return error;
    }
    return;
}

export default getParaphrase;
