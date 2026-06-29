import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProfilePage = () => {
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    if (loading) {
        return <p style={{ padding: "1rem" }}>Loading profile...</p>;
    }

    if (!user) {
        return <p style={{ padding: "1rem" }}>No user data available.</p>;
    }

    return (
        <div
            style={{
                ...styles.container,
                backgroundColor: "#f9ede8",
            }}
        >
            <div style={styles.card}>
                <h1 style={styles.title}>My Profile</h1>
                <p style={styles.subtitle}>View your account information</p>

                <div style={styles.infoBox}>
                    <p style={styles.infoItem}>
                        <span style={styles.label}>Username:</span> {user.username}
                    </p>
                    <p style={styles.infoItem}>
                        <span style={styles.label}>Email:</span> {user.email}
                    </p>
                    <p style={styles.infoItem}>
                        <span style={styles.label}>ID:</span> {user.id}
                    </p>
                    <p style={styles.infoItem}>
                        <span style={styles.label}>Score:</span> {user.score}
                    </p>
                    <p style={styles.infoItem}>
                        <span style={styles.label}>Role:</span> {user.role}
                    </p>
                </div>

                <div style={styles.actions}>
                    <Link to="/profile/edit" style={styles.button}>
                        Edit Profile
                    </Link>

                    <Link to="/profile/password" style={styles.button}>
                        Change Password
                    </Link>

                    {user.role === "MODERATOR" && (
                        <Link to="/admin/users" style={styles.button}>
                            Manage Users
                        </Link>
                    )}

                    <button
                        onClick={() => navigate("/dashboard")}
                        style={styles.button}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "380px",
        padding: "2rem",
        backgroundColor: "#edcfcf",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        color: "#000",
    },
    title: {
        textAlign: "center",
        marginBottom: "0.5rem",
        color: "#000",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#444",
    },
    infoBox: {
        backgroundColor: "#f7e2e2",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
    },
    infoItem: {
        margin: "0.7rem 0",
        fontSize: "1rem",
        color: "#000",
    },
    label: {
        fontWeight: "bold",
        color: "#95424d",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
    },

    button: {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#95424d",
        color: "#fff",
        textDecoration: "none",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        textAlign: "center",
        display: "block",
        boxSizing: "border-box",
    },
    linkButton: {
        display: "block",
        width: "100%",
        textAlign: "center",
        padding: "0.25rem",
        backgroundColor: "#95424d",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
    },
    linkButtonSecondary: {
        display: "block",
        width: "100%",
        textAlign: "center",
        padding: "0.25rem",
        backgroundColor: "#95424d",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        border: "1px solid #37000d",
    },
    backLink: {
        display: "block",
        width: "100%",
        textAlign: "center",
        padding: "0.25rem",
        backgroundColor: "#95424d",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        border: "1px solid #37000d",
    },
};

export default ProfilePage;