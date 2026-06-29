import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
    getAllUsers,
    banUser,
    unbanUser,
    changeUserRole,
} from "../services/userService.js";

const AdminUsersPage = () => {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const isModerator = user?.role === "MODERATOR";

    useEffect(() => {
        if (isModerator) {
            loadUsers();
        }
    }, [isModerator]);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data || "Could not load users");
        }
    };

    const handleBan = async (id) => {
        try {
            await banUser(id);
            await loadUsers();
        } catch (err) {
            setError(err.response?.data || "Could not ban user");
        }
    };

    const handleUnban = async (id) => {
        try {
            await unbanUser(id);
            await loadUsers();
        } catch (err) {
            setError(err.response?.data || "Could not unban user");
        }
    };

    const handleMakeModerator = async (id) => {
        try {
            await changeUserRole(id, "MODERATOR");
            await loadUsers();
        } catch (err) {
            setError(err.response?.data || "Could not update role");
        }
    };

    const handleMakeUser = async (id) => {
        try {
            await changeUserRole(id, "USER");
            await loadUsers();
        } catch (err) {
            setError(err.response?.data || "Could not update role");
        }
    };

    if (!isModerator) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1>Access denied</h1>
                    <p>Only moderators can manage users.</p>
                    <Link to="/dashboard" style={styles.button}>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.cardLarge}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Manage Users</h1>
                        <p style={styles.subtitle}>Ban, unban or change user roles.</p>
                    </div>

                    <Link to="/dashboard" style={styles.backButton}>
                        Back
                    </Link>
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.list}>
                    {users.map((u) => (
                        <div key={u.id} style={styles.userRow}>
                            <div>
                                <p style={styles.username}>{u.username}</p>
                                <p style={styles.info}>{u.email}</p>
                                <p style={styles.info}>
                                    Role: <strong>{u.role}</strong> | Score:{" "}
                                    <strong>{u.score}</strong>
                                </p>
                            </div>

                            <div style={styles.actions}>
                                {u.role !== "BANNED" ? (
                                    <button
                                        onClick={() => handleBan(u.id)}
                                        style={styles.dangerButton}
                                    >
                                        Ban
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUnban(u.id)}
                                        style={styles.button}
                                    >
                                        Unban
                                    </button>
                                )}

                                {u.role !== "MODERATOR" && u.role !== "BANNED" && (
                                    <button
                                        onClick={() => handleMakeModerator(u.id)}
                                        style={styles.button}
                                    >
                                        Make Moderator
                                    </button>
                                )}

                                {u.role === "MODERATOR" && u.id !== user.id && (
                                    <button
                                        onClick={() => handleMakeUser(u.id)}
                                        style={styles.secondaryButton}
                                    >
                                        Make User
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f9ede8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
    },
    card: {
        width: "380px",
        padding: "2rem",
        backgroundColor: "#edcfcf",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        color: "#000",
        textAlign: "center",
    },
    cardLarge: {
        width: "900px",
        padding: "2rem",
        backgroundColor: "#edcfcf",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        color: "#000",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        gap: "1rem",
    },
    title: {
        margin: 0,
    },
    subtitle: {
        margin: "0.5rem 0 0 0",
        color: "#444",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    userRow: {
        backgroundColor: "#f7e2e2",
        borderRadius: "8px",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
    },
    username: {
        margin: 0,
        fontWeight: "bold",
        fontSize: "1.1rem",
    },
    info: {
        margin: "0.3rem 0",
        color: "#333",
    },
    actions: {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    button: {
        padding: "0.6rem 0.8rem",
        backgroundColor: "#95424d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        textDecoration: "none",
    },
    backButton: {
        padding: "0.6rem 0.8rem",
        backgroundColor: "#95424d",
        color: "#fff",
        borderRadius: "5px",
        textDecoration: "none",
    },
    secondaryButton: {
        padding: "0.6rem 0.8rem",
        backgroundColor: "#fff",
        color: "#95424d",
        border: "1px solid #95424d",
        borderRadius: "5px",
        cursor: "pointer",
    },
    dangerButton: {
        padding: "0.6rem 0.8rem",
        backgroundColor: "#8b0000",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
};

export default AdminUsersPage;