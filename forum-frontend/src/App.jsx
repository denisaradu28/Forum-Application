import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import ChangePasswordPage  from "./pages/ChangePasswordPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import CreateQuestionPage from "./pages/CreateQuestionPage.jsx";
import EditQuestionPage from "./pages/EditQuestionPage.jsx";
import QuestionDetailsPage from "./pages/QuestionDetailsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }/>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/edit"
                    element={
                        <ProtectedRoute>
                            <EditProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/password"
                    element={
                    <ProtectedRoute>
                        <ChangePasswordPage/>
                    </ProtectedRoute>
                    }
                    />


                <Route
                    path="/questions"
                    element={<QuestionsPage />}
                />

                <Route
                    path="/questions/create"
                    element={<CreateQuestionPage
                    />}
                />

                <Route
                    path="/questions/edit/:id"
                    element={<EditQuestionPage />}
                />

                <Route
                    path="/questions/:id"
                    element={<QuestionDetailsPage />}
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <AdminUsersPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;