import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

axios.defaults.withCredentials = true;

export const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateCurrentUser = async (username, email) => {
    const response = await axios.put(`${API_URL}/me`, null, {
        params: { username, email },
    });
    return response.data;
};

export const updatePassword = async (oldPassword, newPassword) => {
    const response = await axios.put(`${API_URL}/me/password`, null, {
        params: { oldPassword, newPassword },
    });
    return response.data;
};

export const deleteCurrentUser = async () => {
    const response = await axios.delete(`${API_URL}/me`);
    return response.data;
};

export const banUser = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/ban`);
    return response.data;
};

export const unbanUser = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/unban`);
    return response.data;
};

export const changeUserRole = async (id, role) => {
    const response = await axios.put(`${API_URL}/${id}/role`, null, {
        params: { role },
    });
    return response.data;
};