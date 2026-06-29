import axios from "axios";

const API_URL= "http://localhost:8080/votes";

export const voteQuestion = async (questionId, voteType) => {
    const response= await axios.post(
        `${API_URL}/question/${questionId}?voteType=${voteType}`,
        {},
        { withCredentials: true }
    );

    return response.data;
};

export const getQuestionVoteCount = async (questionId) => {
    const response=await axios.get(
        `${API_URL}/question/${questionId}/count`,
        { withCredentials: true }
    );

    return response.data;
};

export const voteAnswer = async(answerId, voteType) => {
    const response = await axios.post(
        `${API_URL}/answer/${answerId}?voteType=${voteType}`,
        {},
        {withCredentials: true}
    );

    return response.data;
}

export const getAnswerVoteCount = async(answerId) => {
    const response = await axios.get(
        `${API_URL}/answer/${answerId}/count`,
        {withCredentials: true}
    );

    return response.data;
}




