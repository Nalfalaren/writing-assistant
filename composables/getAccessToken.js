const getAccessToken = async (params) => {
    try {
        console.log("Original params:", params);
        const encodedParams = encodeURIComponent(params);
        console.log("Encoded params:", encodedParams);
        const response = await fetch(`http://localhost:8686/api/auth/oauth/sign-in?code=` + encodedParams, {
            method: 'POST', 
        });
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log("Response data:", data);
            return data;
        } else {
            // Log the error response
            console.error("HTTP error:", response.status, response.statusText);
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error) {
        // Log any other errors
        console.error("Fetch error:", error);
        throw error;
    }
};

export default getAccessToken;
