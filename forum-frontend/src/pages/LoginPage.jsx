import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        if (!formData.email.trim()) return "Email is required!";
        if (!formData.password.trim()) return "Password is required!";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Failed to login");
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
                <p style={styles.subtitle}>Sign in to your account</p>

                <form onSubmit={handleSubmit}>
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

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>

                <p style={styles.register}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
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
    button: {
        width: "100%",
        padding: "0.7rem",
        backgroundColor: "#95424d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    register: {
        textAlign: "center",
        marginTop: "1rem",
        color: "#000",
    },
    error: {
        color: "red",
        marginBottom: "0.5rem",
    },
};

export default LoginPage;