import React from "react";
import HomePage from "./components/HomePage";
import InBoxPage from "./components/InBoxPage";
import LandingPage from "./components/LandingPage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import StaffLogInPage from "./components/StaffLogInPage";
import UserProfilePage from "./components/UserProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/home" element={<HomePage />} />
                    <Route exact path="/in-box" element={<InBoxPage />} />
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/log-in" element={<LogInPage />} />
                    <Route exact path="/sign-up" element={<SignUpPage />} />
                    <Route exact path="/staff-log-in" element={<StaffLogInPage />} />
                    <Route exact path="/user-profile" element={<UserProfilePage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
