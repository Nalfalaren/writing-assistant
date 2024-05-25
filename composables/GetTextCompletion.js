const getTextCompletion = async (paragraph, types) => {
    
    const queryString = new URLSearchParams({text: paragraph, type: types }).toString();
    const url = `http://localhost:8686/api/assistant/paraphrase?${queryString}`;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

export default getTextCompletion;
