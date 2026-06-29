import axios from "axios";

const API_URL= "http://localhost:8080/tags";

export const getAllTags =async() => {
    const response=await axios.get(API_URL, { withCredentials: true });
    return response.data;
};