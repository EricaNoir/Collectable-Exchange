import React from "react";
import HomePage from "./components/HomePage";
import InBoxPage from "./components/InBoxPage";
import LandingPage from "./components/LandingPage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import StaffLogInPage from "./components/StaffLogInPage";
import UserProfilePage from "./components/UserProfilePage";
import MAHomePage from "./components/MAHomePage";
import MAFeedbackPage from "./components/MAFeedbackPage";
import AdminPage from "./components/AdminPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/home/:userName" element={<HomePage />} />
                    <Route exact path="/in-box/:userName" element={<InBoxPage />} />
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/log-in" element={<LogInPage />} />
                    <Route exact path="/sign-up" element={<SignUpPage />} />
                    <Route exact path="/staff-log-in" element={<StaffLogInPage />} />
                    <Route exact path="/user-profile/:userName" element={<UserProfilePage />} />

                    <Route exact path="/manager-admin-home" element={<MAHomePage />} />
                    <Route exact path="/manager-admin-feedback" element={<MAFeedbackPage />} />
                    <Route exact path="/admin-only" element={<AdminPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
