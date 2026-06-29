import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, null, {
        params: { email, password },
    });
    return response.data;
};

export const registerUser = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, null, {
        params: { username, email, password },
    });
    return response.data;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};
