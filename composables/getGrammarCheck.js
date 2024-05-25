const getGrammarCheck = async (params) => {
    console.log(params);

    // const queryString = new URLSearchParams({ paragraph: params }).toString();
    const url = `http://localhost:8686/api/assistant/grammar-checker`;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {"paragraph" : `${params}`}
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    } else if (response.status === 403) { 
        const error = await response.json();
        return error;
    }
    return;
}

export default getGrammarCheck;
