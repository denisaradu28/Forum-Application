import {useEffect,useState} from "react";
import {deleteQuestion, getAllQuestions, getQuestionsByTitle, getQuestionsByTagName,getQuestionsByUsername, getMyQuestions} from "../services/questionService.js";
import QuestionCard from "../components/QuestionCard.jsx";
import { Link } from "react-router-dom";
import QuestionFilter from "../components/QuestionFilter.jsx";
import { getCurrentUser } from "../services/userService.js";
import { styles } from "../styles/forumTheme.js";

const QuestionsPage=() =>{
    const [questions,setQuestions]=useState([]);
    const [loading,setLoading] =useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const isBanned = currentUser?.role === "BANNED";

    useEffect(()=>{
        //setQuestions(jsonQuestions);
        //setLoading(false);
        loadQuestions();
        loadUser();
    },[]);

    const loadQuestions=async() => {
        try{
            const data =await getAllQuestions();
            setQuestions(data);
        }catch(error){
            console.error("Error at loading questions", error);
        }finally{
            setLoading(false);
        }
    };

    const loadUser = async() => {
        try {
            const user =await getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.error("Error loading current user", error);
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            loadQuestions();
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    const handleSearchTitle = async (title) => {
        try {
            if (!title.trim()) {
                loadQuestions();
                return;
            }

            const data = await getQuestionsByTitle(title);
            setQuestions(data);
        } catch (error) {
            console.error("Error searching by title:", error);
        }
    };

    const handleFilterTag = async (tag) => {
        try {
            if (!tag.trim()) {
                loadQuestions();
                return;
            }

            const data = await getQuestionsByTagName(tag);
            setQuestions(data);
        } catch (error) {
            console.error("Error at filtering by tag:", error);
        }
    };

    const handleFilterUser=async(username) => {
        try {
            if (!username.trim()) {
                loadQuestions();
                return;
            }

            const data =await getQuestionsByUsername(username);
            setQuestions(data);
        } catch (error) {
            console.error("Error at filtering by username:", error);
        }
    };

    const handleMyQuestions = async () => {
        try {
            const data = await getMyQuestions();
            setQuestions(data);
        } catch (error) {
            console.error("Error loading my questions:", error);
        }
    };

    const handleReset = () => {
        loadQuestions();
    };

    if(loading){
    return <p>Loading...</p>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.main}>
                <div style={{marginBottom: "1rem"}}>
                    <Link to="/dashboard" style={styles.linkButton}>
                        Back to dashboard
                    </Link>
                </div>

                <div
                    style={{
                        ...styles.card,
                        marginBottom: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>All questions</h1>
                        <p style={{ margin: 0, color: "#444" }}>
                            Search, filter and manage forum questions.
                        </p>
                    </div>

                    {!isBanned ? (
                        <Link to="/questions/create" style={styles.primaryButton}>
                            Create Question
                        </Link>
                    ) : (
                        <p style={{ color: "#8b0000", fontWeight: "bold", margin: 0 }}>
                            Banned users cannot create questions.
                        </p>
                    )}
                </div>

                <QuestionFilter
                    onSearchTitle={handleSearchTitle}
                    onFilterTag={handleFilterTag}
                    onFilterUser={handleFilterUser}
                    onMyQuestions={handleMyQuestions}
                    onReset={handleReset}
                />

                <div style={styles.card}>
                    {questions.length === 0 ? (
                        <p>There are no existing questions</p>) :
                        (questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onDelete={handleDeleteQuestion}
                                currentUser={currentUser}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;