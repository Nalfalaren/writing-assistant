import SuccessAlert from '@/components/alert/SuccessAlert.js'
const getParaphrase = async (params, type) => {
    console.log({"form": `${type}`, "paragraph": `${params}`});
    const url = `http://localhost:8686/api/assistant/paraphrase`;
    console.log(url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"form": `${type}`, "paragraph": `${params}`}),
    });

    if (response.ok) {
        const data = await response.json();
        SuccessAlert(data.message);
        return data;
    } else if (response.status === 403) { 
        const error = await response.json();
        return error;
    }
    return;
}

export default getParaphrase;
