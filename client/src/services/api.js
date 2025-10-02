import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_API_URL

console.log(apiUrl);


export const listEmpDetails = async () => {
    const res = await axios.get(`${apiUrl}/employees/`);
    return res
}


export const addEmpDetails = async (formData) => {
    axios.post(`${apiUrl}/employees/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
}