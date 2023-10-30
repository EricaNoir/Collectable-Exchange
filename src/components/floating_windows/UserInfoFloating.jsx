import React from "react";

function UserInfoFloating({ userId, closeWindow }) {
    const [user, setUser] = React.useState({
        userImage: null,
        username: "whx",
        userPhone: null,
        userEmail: "124@qq",
        userFacebook: "facebook",
        buyingCollectableInterested: {
            set: "bsd",
            name: "chuuya",
        },
        sellingCollectableInterested: {
            set: "bsd",
            name: "atsushi",
        },
    });

    return (
        <div
            className="floating-window"
        >
            <h2>User Info</h2>
            <img src={user.userImage} alt="User Avatar" />
            <p>Username: {user.username}</p>
            <p>Email: {user.userEmail}</p>
            <p>Phone: {user.userPhone || "Not provided"}</p>
            <p>Facebook: {user.userFacebook || "Not provided"}</p>
            <p>
                Buying Collectable Interested:{" "}
                {user.buyingCollectableInterested.name} from{" "}
                {user.buyingCollectableInterested.set}
            </p>
            <p>
                Selling Collectable Interested:{" "}
                {user.sellingCollectableInterested.name} from{" "}
                {user.sellingCollectableInterested.set}
            </p>
            <button onClick={closeWindow}>Close</button>
        </div>
    );
}

export default UserInfoFloating;
