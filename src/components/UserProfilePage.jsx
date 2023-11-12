import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./small_components/Navbar";
import EditUserInfoFloating from "./floating_windows/EditUserInfoFloating";
import "../css/userProfilePage.css";
import TradeHistoryCard from "./small_components/TradeHistoryCard"
// icon
import editIcon from '../static/edit.png'
import emailIcon from '../static/email.png'
import phoneIcon from '../static/phone.png'
import facebookIcon from '../static/facebook.png'
import buyIcon from '../static/buy.png'
import saleIcon from '../static/sale.png'

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
                            </div>
                            <div className="user-profile-1">
                                <h2>Welcome</h2>
                                <button
                                    className="profile-edit-btn"
                                    onClick={() => handleEditClick(user)}
                                >
                                    <img src={editIcon} />
                                    <span>Edit</span>
                                </button>
                            </div>
                            <div className="user-infos">
                                <img src={`http://localhost:8080/images/${user.userImage}`} alt="User Avatar" />
                                <div>
                                    <div className="user-names">{user.username}</div>
                                    <div className="rich-rows">
                                        <div>
                                            <img src={emailIcon} />
                                            <span>Email: </span>
                                            <div>{user.userEmail}</div>
                                        </div>
                                        <div>
                                            <img src={phoneIcon} />
                                            <span>Phone: </span>
                                            <div>{user.userPhone || "Not provided"}</div>
                                        </div>
                                    </div>
                                    <div className="rich-rows set-line">
                                        <div>
                                            <img src={facebookIcon} />
                                            <span>Facebook: </span>
                                            <div>{user.userFacebook || "Not provided"}</div>
                                        </div>
                                    </div>
                                    <div className="rich-rows set-line">
                                        <div>
                                            <img src={buyIcon} />
                                            <span>Most Desired Collectible to Buy:{" "}</span>
                                            <div>
                                            {user.buyingCollectableInterested
                                            ? ("Collectable Set: " + user.buyingCollectableInterested.split("---")[0]
                                                + ", Collectable Name: "
                                                + user.buyingCollectableInterested.split("---")[1])
                                            : "Not provided"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rich-rows set-line">
                                        <div>
                                            <img src={saleIcon} />
                                            <span>Most Desired Collectible to Sell:{" "}</span>
                                            <div>
                                            {user.sellingCollectableInterested
                                                ? ("Collectable Set: " + user.sellingCollectableInterested.split("---")[0]
                                                    + ", Collectable Name: "
                                                    + user.sellingCollectableInterested.split("---")[1])
                                                : "Not provided"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <TradeHistoryCard
                                    key={trade.tradeId}
                                    trade={trade}
                                />
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
