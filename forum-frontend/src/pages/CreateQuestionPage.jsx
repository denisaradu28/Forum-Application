import {Link, useNavigate} from "react-router-dom";
import {createQuestion} from "../services/questionService.js";
import QuestionForm from "../components/QuestionForm.jsx";
import { styles } from "../styles/forumTheme.js";

const CreateQuestionPage=() => {
    const navigate = useNavigate();

    const handleCreateQuestion = async (questionBody) => {
        try {
            await createQuestion(questionBody);
            navigate("/questions");
        } catch (error) {
            console.error("Error creating question", error);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.main}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link to="/questions" style={styles.linkButton}>
                        Back to all questions
                    </Link>
                </div>
                <div style={{ ...styles.card, marginBottom: "1.5rem" }}>
                    <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                Create question
            </h1><p style={{ margin: 0, color: "#444" }}>
                    Share your problem clearly and add useful tags.
                </p>
            </div>
            <div style={styles.card}>
                <QuestionForm onSubmit={handleCreateQuestion}/>
            </div>
        </div>
    </div>
    );
};

export default CreateQuestionPage;