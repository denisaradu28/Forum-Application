import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const EditProfilePage = () => {
    const { user, updateProfile, deleteAccount, loading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        if (!formData.username.trim()) return "Username is required";
        if (!formData.email.trim()) return "Email is required";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await updateProfile(formData.username, formData.email);
            setSuccessMessage("Profile updated successfully");

            setTimeout(() => {
                navigate("/profile");
            }, 1200);
        } catch (err) {
            setError(err.message || "Update failed");
        }
    };

    if (loading) {
        return <p style={{ padding: "1rem" }}>Loading...</p>;
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            await deleteAccount();
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.response?.data || err.message || "Delete failed");
        }
    };

    return (
        <div
            style={{
                ...styles.container,
                backgroundColor: "#f9ede8",
            }}
        >
            <div style={styles.card}>
                <h1 style={styles.title}>Edit Profile</h1>
                <p style={styles.subtitle}>Update your account details</p>

                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    {error && <p style={styles.error}>{error}</p>}
                    {successMessage && <p style={styles.success}>{successMessage}</p>}

                    <button type="submit" style={styles.commonButton}>
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        style={{ ...styles.commonButton, marginTop: "1rem" }}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        style={{ ...styles.commonButton, marginTop: "1rem" }}
                    >
                        Delete Account
                    </button>
                </form>
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
        width: "350px",
        padding: "2rem",
        backgroundColor: "#edcfcf",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        color: "#000",
    },
    title: {
        textAlign: "center",
        color: "#000",
        marginBottom: "0.5rem",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#444",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        color: "#000",
    },
    error: {
        color: "red",
        marginBottom: "0.5rem",
    },
    success: {
        color: "green",
        marginBottom: "0.5rem",
    },
    commonButton: {
        width: "100%",
        padding: "0.7rem",
        backgroundColor: "#95424d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        textAlign: "center",
        display: "block",
        textDecoration: "none",
    },
};

export default EditProfilePage;