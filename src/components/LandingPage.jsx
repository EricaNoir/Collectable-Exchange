import { Link } from "react-router-dom";
import "../css/landingPage.scss"

function LandingPage() {
    return (
        <>
            <h1 className="title">Collectables Exchange Management System</h1>
            <Link to="/log-in">
                <button className="button-in-landing-page">Sign In</button>
            </Link>
            <Link to="/sign-up">
                <button className="button-in-landing-page">Sign Up</button>
            </Link>
            <Link to="/staff-log-in">
                <button className="button-in-landing-page">Staff Sign In</button>
            </Link>
        </>
    );
}

export default LandingPage;
