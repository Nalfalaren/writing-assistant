import successMessage from "~/components/alert/SuccessAlert";
import failAlert from "~/components/alert/FailAlert";
const getGrammarCheck = async (params) => {
    const url = `http://localhost:8686/api/assistant/grammar-checker`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paragraph: params }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 403) {
        const error = await response.json();
        return error;
    }
    return;
}

export default getGrammarCheck;
