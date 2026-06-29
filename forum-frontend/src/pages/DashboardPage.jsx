import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getAllQuestions } from "../services/questionService.js";

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isBanned = user?.role === "BANNED";

    const [menuOpen, setMenuOpen] = useState(false);
    const [recentQuestions, setRecentQuestions] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        loadRecentQuestions();
    }, []);

    const loadRecentQuestions = async () => {
        try {
            const data = await getAllQuestions();
            setRecentQuestions(data.slice(0, 3));

            const allTags = data.flatMap((question) => question.tags || []);

            const uniqueTags = [];

            allTags.forEach((tag) => {
                const alreadyExists = uniqueTags.some(
                    (existingTag) => existingTag.name === tag.name
                );

                if (!alreadyExists) {
                    uniqueTags.push(tag);
                }
            });

            setTags(uniqueTags.slice(0, 5));
        } catch (error) {
            console.error("Error loading recent questions:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div>
                    <h2 style={styles.logo}>Forum Application</h2>
                </div>

                <div style={styles.userArea}>
                    <button
                        style={styles.avatarButton}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </button>

                    {menuOpen && (
                        <div style={styles.dropdown}>
                            <Link to="/profile" style={styles.dropdownItem}>
                                My Profile
                            </Link>

                            <Link to="/profile/edit" style={styles.dropdownItem}>
                                Edit Account
                            </Link>

                            <Link to="/profile/password" style={styles.dropdownItem}>
                                Change Password
                            </Link>

                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main style={styles.main}>
                <section style={styles.heroCard}>
                    <h1 style={styles.heroTitle}>
                        Welcome back, {user?.username || "User"}!
                    </h1>
                    <p style={styles.heroText}>
                        Explore recent questions, manage your account and continue your
                        activity.
                    </p>
                </section>

                {isBanned && (
                    <div style={styles.bannedBox}>
                        Your account has been banned!
                    </div>
                )}

                <section style={styles.layout}>
                    <div style={styles.leftColumn}>
                        <div style={styles.sectionCard}>
                            <h3 style={styles.sectionTitle}>Recent Questions</h3>

                            {recentQuestions.map((question) => (
                                <div key={question.id} style={styles.questionCard}>
                                    <h4 style={styles.questionTitle}>{question.title}</h4>
                                    <p style={styles.questionDescription}>
                                        {question.text || "No description available"}
                                    </p>
                                    <p style={styles.questionMeta}>
                                        Posted by{" "}
                                        <strong>{question.author?.username || "Unknown"}</strong>
                                    </p>
                                </div>
                            ))}

                            <div style={styles.seeAllContainer}>
                                <Link to="/questions" style={styles.seeAllLink}>
                                    See all questions
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div style={styles.rightColumn}>
                        <div style={styles.sectionCard}>
                            <h3 style={styles.sectionTitle}>Tags</h3>

                            <div style={styles.tagContainer}>
                                {tags.length === 0 ? (
                                    <p style={{ margin: 0 }}>No tags available</p>
                                ) : (
                                    tags.map((tag) => (
                                        <span key={tag.id || tag.name} style={styles.tag}>
                {tag.name}
            </span>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#f9ede8",
    },
    header: {
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "relative",
        color: "#000",
    },
    logo: {
        margin: 0,
        color: "#000",
    },
    userArea: {
        position: "relative",
    },
    avatarButton: {
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#95424d",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
    },
    dropdown: {
        position: "absolute",
        top: "52px",
        right: 0,
        width: "220px",
        backgroundColor: "#edcfcf",
        borderRadius: "10px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        padding: "0.5rem",
        zIndex: 10,
    },
    dropdownItem: {
        display: "block",
        padding: "0.75rem",
        textDecoration: "none",
        color: "#000",
        borderRadius: "6px",
    },
    logoutButton: {
        width: "100%",
        marginTop: "0.4rem",
        padding: "0.75rem",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#95424d",
        color: "#fff",
        cursor: "pointer",
    },
    main: {
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "2rem",
    },
    heroCard: {
        backgroundColor: "#edcfcf",
        color: "#000",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    heroTitle: {
        marginTop: 0,
        marginBottom: "0.5rem",
    },
    heroText: {
        margin: 0,
        color: "#333",
    },
    layout: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "1.5rem",
    },
    leftColumn: {},
    rightColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    sectionCard: {
        backgroundColor: "#edcfcf",
        color: "#000",
        borderRadius: "12px",
        padding: "1.25rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    sectionTitle: {
        marginTop: 0,
        marginBottom: "1rem",
    },
    questionCard: {
        backgroundColor: "#f7e2e2",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1rem",
    },
    questionTitle: {
        marginTop: 0,
        marginBottom: "0.5rem",
    },
    questionDescription: {
        marginTop: 0,
        marginBottom: "0.75rem",
        color: "#333",
    },
    questionMeta: {
        margin: 0,
        fontSize: "0.95rem",
        color: "#444",
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
    },
    tag: {
        padding: "0.4rem 0.8rem",
        backgroundColor: "#f7e2e2",
        borderRadius: "999px",
        fontSize: "0.85rem",
        color: "#5a0c1f",
    },
    seeAllContainer: {
        marginTop: "0.5rem",
        textAlign: "right",
    },
    seeAllLink: {
        textDecoration: "none",
        color: "#5a0c1f",
        fontWeight: "bold",
    },
    bannedBox: {
        backgroundColor: "#ffe0e0",
        color: "#8b0000",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        textAlign: "center",
        fontWeight: "bold",
    },
};

export default DashboardPage;