import axios from "axios";


const API_URL = "http://localhost:8080/answers";

export const getAnswersByQuestion = async (questionId) => {
    const response = await axios.get(
        `${API_URL}/question/${questionId}`,
        { withCredentials: true }
    );
    return response.data
};

export const createAnswer = async (questionId, answerBody) => {
    const response = await axios.post(
        `${API_URL}/question/${questionId}`, answerBody,
        { withCredentials: true }
    );
    return response.data;
};

export const updateAnswer = async (answerId, answerBody) => {
    const response = await axios.put(
        `${API_URL}/${answerId}`, answerBody,
        { withCredentials: true }
    );
    return response.data;
};

export const deleteAnswer = async (answerId) => {
    const response = await axios.delete(
        `${API_URL}/${answerId}`,
        { withCredentials: true }
    );
    return response.data;
};

export const acceptAnswer = async(answerId) => {
    const response = await axios.put(
        `${API_URL}/${answerId}/accept`,
        {},
        {withCredentials: true}
    );

    return response.data;
}