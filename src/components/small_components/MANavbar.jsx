import { Link } from "react-router-dom";
import React from "react";

function MANavbar() {
    // User info
    const [userRole, setUserRole] = React.useState("");

    React.useEffect(() => {
        fetch("/api/myProfile")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setUserRole(data.userRole);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    return (
        <nav className="main-nav">
            <Link to="/manager-admin-home">
                <button className="logo">CEMS</button>
            </Link>
            <h2>
                {userRole.includes("ADMIN")
                    ? "Welcome, Administrator"
                    : userRole.includes("CAMPAIGN_MANAGER")
                    ? "Welcome, Campaign Manager."
                    : "Welcome, Manager."}
            </h2>
            <div className="nav-right">
                <Link to="/manager-admin-feedback">
                    <button className="inbox-button">Feedback</button>
                </Link>
                {userRole.includes("ADMIN") && (
                    <Link to="/admin-only">
                        <button className="inbox-button">Admin</button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default MANavbar;
