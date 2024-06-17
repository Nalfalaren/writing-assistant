import axios from 'axios';
const deleteCookie = () => {
const response = axios.post('https://writing-assistant-app.onrender.com/api/auth/oauth/sign-out', {}, {
    method: 'POST',
    withCredentials: true,
}
)
console.log(response);
return response;
}

export default deleteCookie;