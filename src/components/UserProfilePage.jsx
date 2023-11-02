import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./small_components/Navbar";
import EditUserInfoFloating from "./floating_windows/EditUserInfoFloating";
import "../css/userProfilePage.css";
import TradeHistoryCard from "./small_components/TradeHistoryCard"

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
    function handleEditClick(user) {
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

            <section className="body-container">
                {user !== null ? (
                    <>
                        <div className="user-info-container">
                            <div className="user-profile-2">
                                <h1>User Profile</h1>
                                <img src={`/api/images/${user.userImage}`} alt="User Avatar" />
                            </div>
                            <div className="user-profile-1">
                                <h2>Welcome, {user.username}</h2>
                                <button
                                    className="profile-edit-btn"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="user-profile-3">
                                <p>
                                    <strong>Username: </strong>
                                    {user.username}
                                </p>
                                <p>
                                    <strong>Email: </strong>
                                    {user.userEmail}
                                </p>
                                <p>
                                    <strong>Phone: </strong>
                                    {user.userPhone || "Not provided"}
                                </p>
                                <p>
                                    <strong>Facebook: </strong>
                                    {user.userFacebook || "Not provided"}
                                </p>
                            </div>
                            <div className="user-profile-4">
                                <p>
                                    <strong>
                                        Most Desired Collectible to Buy:{" "}
                                    </strong>
                                    {user.buyingCollectableInterested ||
                                        "Not provided"}
                                </p>
                                <p>
                                    <strong>
                                        Most Desired Collectible to Sell:{" "}
                                    </strong>
                                    {user.sellingCollectableInterested ||
                                        "Not provided"}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                {tradeList && tradeList.length > 0 ? (
                    <>
                        <h2 className="user-trade-history-text">
                            My trade history
                        </h2>
                        <div className="user-trade-history-card-container">
                            {tradeList.map((trade) => (
                                <TradeHistoryCard trade={trade} />
                            ))}
                        </div>
                    </>
                ) : tradeList ? (
                    <div>No trade history.</div>
                ) : (
                    <div>Loading...</div>
                )}
            </section>
        </>
    );
}

export default UserProfilePage;
