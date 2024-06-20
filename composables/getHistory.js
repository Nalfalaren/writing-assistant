import FailAlert from "~/components/alert/FailAlert";
import axios from 'axios';
const GetHistory = async () => {
  const url = `https://writing-assistant-app.onrender.com/api/history`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data.body;
  } catch (error) {
    console.error(error);
    FailAlert("Loading...");
    throw error;
  }
};

export default GetHistory;
