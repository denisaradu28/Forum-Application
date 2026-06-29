import {useEffect,useState} from "react"
import {Link,useNavigate,useParams} from "react-router-dom";
import QuestionForm from "../components/QuestionForm.jsx";
import {getQuestionById, updateQuestion} from "../services/questionService.js";
import { styles } from "../styles/forumTheme.js";

const EditQuestionPage=() =>{
    const {id} =useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = async () => {
        try {
            const data = await getQuestionById(id);
            setQuestion(data);
        }catch (error) {
            console.error("Error loading question:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleUpdateQuestion =async(questionBody) => {
        try {
            await updateQuestion(id,questionBody);
            navigate("/questions");
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!question) {
        return <p>Question not found.</p>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.main}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link to="/questions" style={styles.linkButton}>
                        Back to all questions
                    </Link>
                </div>
                <div style={{ ...styles.card, marginBottom: "1.5rem" }}>
                    <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Edit Question</h1>
                    <p style={{ margin: 0, color: "#444" }}>
                        Update your question details.
                    </p>
                </div>

                <div style={styles.card}>
                    <QuestionForm
                        onSubmit={handleUpdateQuestion}
                        initialData={question}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditQuestionPage;