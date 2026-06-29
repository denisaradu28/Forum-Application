import {useEffect, useState} from "react";
import {getAnswerVoteCount, voteAnswer} from "../services/voteService.js";
import {styles} from "../styles/forumTheme.js";

const AnswerVoteBox = ({answerId, onVoteChanged}) => {
    const [voteCount, setVoteCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        loadVoteCount();
    }, [answerId]);

    const loadVoteCount = async () =>{
        try{
            const count = await getAnswerVoteCount(answerId);
            setVoteCount(count);
        }catch(error){
            console.error("Error loading answer vote count", error);
        }
    };

    const handleVote = async(voteType) => {
        try{
            setError("");
            const newCount = await voteAnswer(answerId, voteType);
            setVoteCount(newCount);

            if(onVoteChanged) {
                onVoteChanged();
            }
        }catch(error){
            console.error("Error voting answer", error);
            setError(error.response?.data || "You cannot vote this answer");
        }
    };

    return (
        <div style={{marginTop: "0.75rem", marginBottom: "0.75rem"}}>
            <button
                type="button"
                onClick={()=>handleVote("UPVOTE")}
                style={{ ...styles.secondaryButton, padding: "0.45rem 0.75rem"}}>Upvote</button>

            <span style={{margin: "0 10px", fontWeight: "bold"}}>Score: {voteCount}</span>

            <button
                type="button"
                onClick={()=>handleVote("DOWNVOTE")}
                style={{...styles.secondaryButton, padding: "0.45rem 0.75rem"}}>Downvote</button>

            {error && <p style={{color: "red", marginBottom: 0}}>{error}</p>}
        </div>
    );
};

export default AnswerVoteBox;