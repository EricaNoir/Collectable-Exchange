import { Link } from "react-router-dom";

function MANavbar({ userRole }) {
    return (
        <nav className="main-nav">
            <Link to="/manager-admin-home">
                <button className="logo">CEMS</button>
            </Link>
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
