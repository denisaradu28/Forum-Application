import { useEffect, useState } from "react";
import { getQuestionVoteCount, voteQuestion } from "../services/voteService.js";

const QuestionVoteBox = ({ questionId }) => {
    const [voteCount, setVoteCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(()=> {
        loadVoteCount();
    },[questionId]);

    const loadVoteCount = async () => {
        try {
            const count = await getQuestionVoteCount(questionId);
            setVoteCount(count);
        } catch (error) {
            console.error("Error loading vote count", error);
        }
    };

    const handleVote = async (voteType) => {
        try {
            setError("");
            const newCount = await voteQuestion(questionId, voteType);
            setVoteCount(newCount);
        } catch (error) {
            console.error("Error voting question", error);
            setError("You cannot vote this question");
        }
    };

    return (
        <div>
            <button onClick={() => handleVote("UPVOTE")}>
                Upvote
            </button>

            <span style={{ margin: "0 10px" }}>
                Score: {voteCount}
            </span>

            <button onClick={() => handleVote("DOWNVOTE")}>
                Downvote
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default QuestionVoteBox;