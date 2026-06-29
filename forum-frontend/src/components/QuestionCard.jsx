import {Link} from "react-router-dom";
import { styles } from "../styles/forumTheme.js";
import QuestionVoteBox from "./QuestionVoteBox.jsx";

const QuestionCard = ({question,onDelete,currentUser}) => {
    const formattedDate =new Date(question.creationDateTime).toLocaleString();


    const isAuthor =currentUser && currentUser.id === question.author?.id;
    const isModerator = currentUser?.role === "MODERATOR";
    const canModify = isAuthor || isModerator;


    const getStatusColor = (status) => {
        if (status === "SOLVED") return "green";
        if (status === "IN_PROGRESS") return "orange";
        if (status === "RECEIVED" || status === "CREATED") return "blue";
        return "gray";
    };

    return(
        <div style={{
            ...styles.innerCard,
            marginBottom: "1rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

        }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.6rem" }}>
                <Link to={`/questions/${question.id}`}
                      style={{
                          textDecoration: "none",
                          color: "#000",
                          fontWeight: "700",
                      }}
                >
                {question.title}
            </Link>
            </h3>

            <p>
                <strong>Author:</strong>{" "}
                {question.author?.username || "Unknown"} · ⭐ {question.author?.score ?? 0} points
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span
                    style={{
                        padding: "4px 8px",
                        borderRadius: "8px",
                        color: "white",
                        backgroundColor: getStatusColor(question.status),
                        fontSize: "12px",
                        fontWeight: "bold"
                    }}
                >{question.status === "CREATED" ? "RECEIVED" : question.status}
                </span>
            </p>

            <QuestionVoteBox questionId={question.id} />

            <p>
                <strong>Date:</strong> {formattedDate}
            </p>

            <p>
                <strong>Tags:</strong>{" "}
                {question.tags && question.tags.length > 0
                    ? (question.tags.map((tag) => (
                        <span key={tag.id || tag.name}
                              style={{...styles.tag, marginRight: "0.5rem"}}
                              >
                            {tag.name}
                        </span>
                        ))
                    ) :(
                        "No tags"
                    )}
            </p>


            {canModify && (
                <>
                    <Link to={`/questions/edit/${question.id}`}>
                        <button style={styles.secondaryButton}>
                            {isModerator && !isAuthor ? "Edit as moderator":"Edit"}
                        </button>
                    </Link>

                    <button style={styles.secondaryButton}
                        onClick={() => {
                        if (window.confirm("Are u sure u want to erase?")) {
                            onDelete(question.id);
                        }
                    }}>
                        {isModerator && !isAuthor ? "Delete as moderator" : "Delete"}
                    </button>
                </>
            )}
        </div>
    );
};
export default QuestionCard;