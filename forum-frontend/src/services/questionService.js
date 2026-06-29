import axios from "axios"

const API_URL = "http://localhost:8080/questions";

export const getAllQuestions = async() => {
    const response = await axios.get(API_URL,{withCredentials: true});
    return response.data;
};

export const getQuestionById =async(id) =>{
    const response=await axios.get(API_URL + "/" + id,{ withCredentials: true });
    return response.data;
};

export const createQuestion=async(questionBody) => {
    const response=await axios.post(API_URL,questionBody,{withCredentials:true});
    return response.data;
};

export const updateQuestion=async (id,questionBody) => {
    const response =await axios.put(API_URL + "/" +id, questionBody,{withCredentials:true});
    return response.data;
};

export const deleteQuestion =async(id)=>{
    const response =await axios.delete(API_URL +"/" +id, {withCredentials:true});
    return response.data;
};

export const getQuestionsByTagName=async(tagName) =>{
    const response=await axios.get(API_URL+"/tagName?tagName=" +encodeURIComponent(tagName),{withCredentials:true});
    return response.data;
};

export const getQuestionsByTitle=async(title) => {
    const response =await axios.get(API_URL+"/title?title="+encodeURIComponent(title),{withCredentials:true});
    return response.data;
};

export const getMyQuestions=async() => {
    const response=await axios.get(API_URL+"/me",{withCredentials:true});
    return response.data;
};

export const getQuestionsByUsername = async (username) => {
    const response = await axios.get(
        API_URL + "/user?username=" + encodeURIComponent(username),
        { withCredentials: true }
    );
    return response.data;
};


