import axios from "axios";
const SaveChoice = (input, output, type) => {
  try {
    console.log({ input: input, output: output, type: type });
    const response = axios.post(
      "https://writing-assistant-app.onrender.com/api/assistant/save",
      { input: input, output: output, type: type },
      {
        method: "POST",
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error.data.response);
  }
};

export default SaveChoice;
