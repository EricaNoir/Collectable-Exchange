// Other user's info

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

    return (
        <div
            className="floating-window"
        >
            {user !== null ? (
                <>
                    <h2>User Info</h2>
                    <img src={`http://localhost:8080/images/${user.userImage}`} alt="User Avatar" />
                    <p>Username: {user.username}</p><p>Email: {user.userEmail}</p>
                    <p>Phone: {user.userPhone || "Not provided"}</p>
                    <p>Facebook: {user.userFacebook || "Not provided"}</p>
                    <p>
                        I want to buy: {user.buyingCollectableInterested
                            ? ("Collectable Set: " + user.buyingCollectableInterested.split("---")[0]
                                + ", Collectable Name: "
                                + user.buyingCollectableInterested.split("---")[1])
                            : "Not provided"}
                    </p>
                    <p>
                        I want to sell: {user.sellingCollectableInterested
                            ? ("Collectable Set: " + user.sellingCollectableInterested.split("---")[0]
                                + ", Collectable Name: "
                                + user.sellingCollectableInterested.split("---")[1])
                            : "Not provided"}
                    </p>
                    <button onClick={closeWindow}>Close</button>
                </>) : (
                <div>Loading...</div>
            )}

        </div>
    );
}

export default UserInfoFloating;
