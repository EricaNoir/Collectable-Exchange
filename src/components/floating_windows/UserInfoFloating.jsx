// Other user's info
import emailIcon from "../../static/email.png";
import phoneIcon from "../../static/phone.png";
import facebookIcon from "../../static/facebook.png";
import buyIcon from "../../static/buy.png";
import saleIcon from "../../static/sale.png";
import copyIcon from "../../static/copy.png";
import defaultImg from "../../static/default.png"
import React from "react";

function UserInfoFloating({ userName, closeWindow }) {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`/api/user?ownerName=${userName}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
        fetchUserData();
    }, [userName]);

    function copyInfo(info) {
        navigator.clipboard.writeText(info);
        alert(`Copied "${info}" to your clipboard.`);
    }

    return (
        <>
            <div className="floating-overlay" onClick={closeWindow}></div>
            <div className="floating-window">
                {user ? (
                    <>
                        <div className="user-info">
                            <div className="img-name-container">
                                <img
                                    src={
                                        user.userImage
                                            ? `http://localhost:8080/images/${user.userImage}`
                                            : defaultImg
                                    }
                                    alt="User Avatar"
                                />

                                <div className="user-name">{user.username}</div>
                            </div>

                            <div className="line-container">
                                <div className="line">
                                    <img src={emailIcon} />
                                    <strong>Email: </strong>
                                    <div className="info-text">
                                        <a
                                            href={`mailto:${user.userEmail}`}
                                            target="_top"
                                        >
                                            {user.userEmail}
                                        </a>
                                    </div>
                                </div>
                                <div className="line">
                                    <img src={phoneIcon} />
                                    <strong>Phone: </strong>
                                    <div className="info-text">
                                        {user.userPhone || "Not provided"}
                                    </div>
                                    {user.userPhone && (
                                        <img
                                            src={copyIcon}
                                            style={{
                                                marginLeft: "24px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                copyInfo(user.userPhone)
                                            }
                                        />
                                    )}
                                </div>
                                <div className="line">
                                    <img src={facebookIcon} />
                                    <strong>Facebook: </strong>
                                    <div className="info-text">
                                        {user.userFacebook || "Not provided"}
                                    </div>
                                    {user.userFacebook && (
                                        <img
                                            src={copyIcon}
                                            style={{
                                                marginLeft: "24px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                copyInfo(user.userFacebook)
                                            }
                                        />
                                    )}
                                </div>
                                <div className="line">
                                    <img src={buyIcon} />
                                    <strong>
                                        Most Desired Collectible to Buy:{" "}
                                    </strong>
                                    <div className="info-text">
                                        {user.buyingCollectableInterested
                                            ? `${
                                                  user.buyingCollectableInterested.split(
                                                      "---"
                                                  )[1]
                                              } from ${
                                                  user.buyingCollectableInterested.split(
                                                      "---"
                                                  )[0]
                                              }`
                                            : "Not provided"}
                                    </div>
                                </div>
                                <div className="line">
                                    <img src={saleIcon} />
                                    <strong>
                                        Most Desired Collectible to Sell:
                                    </strong>
                                    <div className="info-text">
                                        {user.sellingCollectableInterested
                                            ? `${
                                                  user.sellingCollectableInterested.split(
                                                      "---"
                                                  )[1]
                                              } from ${
                                                  user.sellingCollectableInterested.split(
                                                      "---"
                                                  )[0]
                                              }`
                                            : "Not provided"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    );
}

export default UserInfoFloating;
