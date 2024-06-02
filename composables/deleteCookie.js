import axios from 'axios';
const deleteCookie = () => {
const response = axios.post('http://localhost:8686/api/auth/oauth/sign-out', {}, {
    method: 'POST',
    withCredentials: true,
}
)
console.log(response);
return response;
}

export default deleteCookie;