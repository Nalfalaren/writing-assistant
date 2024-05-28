const getHistory = async () => {
    const response = await fetch('http://localhost:8686/api/history', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    if(response.ok){
    const data = await response.json();
    return data;
    }

}