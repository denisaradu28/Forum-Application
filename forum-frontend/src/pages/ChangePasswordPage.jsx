import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/userService.js";

const ChangePasswordPage = () => {
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        if (!formData.oldPassword.trim()) return "Old password is required";
        if (!formData.newPassword.trim()) return "New password is required";
        if (formData.newPassword.length < 6) {
            return "New password must be at least 6 characters";
        }
        if(!passwordRegex.test(formData.newPassword)) {
            return "Password must contain uppercase, lowercase, number and special character";
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return "Passwords do not match";
        }
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
            await updatePassword(formData.oldPassword, formData.newPassword);
            setSuccessMessage("Password updated successfully");

            setTimeout(() => {
                navigate("/profile");
            }, 1200);
        } catch (err) {
            setError(err.response?.data || err.message || "Failed to update password");
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
                <h1 style={styles.title}>Change Password</h1>
                <p style={styles.subtitle}>Update your account password</p>

                <form onSubmit={handleSubmit}>
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <p style={{ fontSize: "0.8rem", color: "#555" }}>
                        Password must contain: uppercase, lowercase, number and special characters
                    </p>
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
        marginBottom: "0.5rem",
        color: "#000",
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
    error: {
        color: "red",
        marginBottom: "0.5rem",
    },
    success: {
        color: "green",
        marginBottom: "0.5rem",
    },
};

export default ChangePasswordPage;