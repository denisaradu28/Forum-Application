import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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
        if (!formData.username.trim()) return "Username is required";
        if (!formData.email.trim()) return "Email is required";
        if (!formData.password.trim()) return "Password is required";
        if (formData.password.length < 6) return "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) return "Passwords do not match";
        if (!passwordRegex.test(formData.password)) {
            return "Password must contain uppercase, lowercase, number and special character";
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
            await register(formData.username, formData.email, formData.password);
            setSuccessMessage("Account created successfully");
            setTimeout(() => navigate("/dashboard"), 1200);
        } catch (err) {
            setError(err.message || "Register failed");
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
                <h1 style={styles.title}>Forum Application</h1>
                <p style={styles.subtitle}>Create your account</p>

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

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <label>Confirm Password</label>
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

                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>

                <p style={styles.register}>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
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
    input: {
        width: "100%",
        padding: "0.65rem",
        marginTop: "0.35rem",
        marginBottom: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        color: "#000",
    },
    button: {
        width: "100%",
        padding: "0.8rem",
        backgroundColor: "#95424d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "0.5rem",
    },
    register: {
        textAlign: "center",
        marginTop: "1rem",
        color: "#000",
    },
    error: {
        color: "red",
        marginBottom: "0.75rem",
    },
    success: {
        color: "green",
        marginBottom: "0.75rem",
    },
};

export default RegisterPage;