import { useState } from "react";
import { styles } from "../styles/forumTheme.js";

const QuestionFilterBar = ({
    onSearchTitle,
    onFilterTag,
    onFilterUser,
    onMyQuestions,
    onReset
   }) => {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [user, setUser] = useState("");


    const handleResetClick = () => {
        setTitle("");
        setTag("");
        setUser("");
        onReset();
    };

    return (
        <div style={{ ...styles.card, marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    style={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Search by title"
                />
                <button onClick={()=>onSearchTitle(title)} style={{ ...styles.secondaryButton, marginLeft: "0.5rem" }}>
                    Search
                </button>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    style={styles.input}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Filter by tag"
                />
                <button onClick={() =>onFilterTag(tag)} style={{ ...styles.secondaryButton, marginLeft: "0.5rem" }}>
                    Filter Tag
                </button>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <input
                    style={styles.input}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Filter by username"
                />
                <button onClick={() => onFilterUser(user)} style={{ ...styles.secondaryButton, marginLeft: "0.5rem" }}>
                    Filter User
                </button>
            </div>

            <div>
                <button onClick={onMyQuestions} style={styles.secondaryButton}>My Questions</button>
                <button onClick={handleResetClick} style={{...styles.secondaryButton, marginLeft: "0.5rem"}}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default QuestionFilterBar;