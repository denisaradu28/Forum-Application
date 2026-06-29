import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, updateCurrentUser, deleteCurrentUser } from "../services/userService.js";
import { loginUser, registerUser, logoutUser } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        await loginUser(email, password);
        await loadUser();
    };

    const register = async (username, email, password) => {
        await registerUser(username, email, password);
        await loadUser();
    };

    const logout = async () => {
        await logoutUser();
        localStorage.clear();
        setUser(null);
    };

    const updateProfile = async (username, email) => {
        const updatedUser = await updateCurrentUser(username, email);
        setUser(updatedUser);
        return updatedUser;
    };

    const deleteAccount = async () => {
        await deleteCurrentUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                reloadUser: loadUser,
                updateProfile,
                deleteAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);