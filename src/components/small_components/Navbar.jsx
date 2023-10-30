import { Link } from "react-router-dom";

/**
    Navbar in each page
    Contains: LOGO, Inbox button, UserAvatar (Profile button)
 */

function Navbar({ userAvatar }) {
    return (
        <nav>
            <Link to="/home">
                <button className="logo">CEMS</button>
            </Link>
            <Link to="/in-box">
                <button className="inbox-button">Inbox</button>
            </Link>
            <Link to="/user-profile">
                    <img
                        src={
                            userAvatar ||
                            "./assets/img/default-avatar.jpg"
                        }
                        alt="User Avatar"
                        style={{ width: 48}}
                    />
            </Link>
        </nav>
    );
}

export default Navbar;
