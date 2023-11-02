import { Link } from "react-router-dom";
import "../../css/navbar.css";

/**
    Navbar in each page
    Contains: LOGO, Inbox button, UserAvatar (Profile button)
 */

function Navbar({ userName, userAvatar }) {
    return (
        <nav className="main-nav">
            <Link to={`/home/${userName}`}>
                <button className="logo">CEMS</button>
            </Link>
            <div className="nav-right">
                <Link to={`/in-box/${userName}`}>
                    <button className="inbox-button">Inbox</button>
                </Link>
                <Link to={`/user-profile/${userName}`}>
                <button className="inbox-button">My Profile</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
