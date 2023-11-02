import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./small_components/Navbar";
import EditUserInfoFloating from "./floating_windows/EditUserInfoFloating";

function UserProfilePage() {
    const { userName } = useParams();
    const [user, setUser] = React.useState(null);

    // Get and set user
    useEffect(() => {
        fetch("/api/myProfile")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    });

    // "userEdit" 
    const [activeWindow, setActiveWindow] = React.useState({
        type: null,
        targetObject: null,
    });
    function handleEditClick (user) {
        setActiveWindow({
            type: "edit",
            targetObject: user,
        });
    }
    function closeFloatingWindow() {
        setActiveWindow({
            type: null,
            targetObject: null,
        });
    }

    // Get trade history
    const [tradeList, setTradeList] = React.useState(null);
    useEffect(() => {
        fetch("/api/history")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setTradeList(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    });

    return (
        <>
            <Navbar userName={userName} />

            {activeWindow.type === "edit" && (
                <EditUserInfoFloating
                    closeWindow={closeFloatingWindow}
                    user={activeWindow.targetObject}
                />
            )}

            <h1>User Profile</h1>
            {user !== null ? (
                <>
                    <h2>User Info</h2>
                    <img src={user.userImage} alt="User Avatar" />
                    <p>Username: {user.username}</p>
                    <p>Email: {user.userEmail}</p>
                    <p>Phone: {user.userPhone || "Not provided"}</p>
                    <p>Facebook: {user.userFacebook || "Not provided"}</p>
                    <p>
                        Buying Collectable Interested: {user.buyingCollectableInterested || "Not provided"}
                    </p>
                    <p>
                        Selling Collectable Interested: {user.sellingCollectableInterested || "Not provided"}
                    </p>
                    <button className="profile-edit-btn" onClick={() => handleEditClick(user)}></button>
                </>
            ) : (
                <p>Loading...</p>
            )}

            {(tradeList !== null && tradeList.length > 0) ? (

            ) : tradeList !== null ? (
                <div>No trade history.</div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default UserProfilePage;
