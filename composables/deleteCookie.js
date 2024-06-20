import axios from 'axios';
const DeleteCookie = () => {
const response = axios.post('https://writing-assistant-app.onrender.com/api/auth/oauth/sign-out', {}, {
    method: 'POST',
    withCredentials: true,
}
)
return response;
}

export default DeleteCookie;