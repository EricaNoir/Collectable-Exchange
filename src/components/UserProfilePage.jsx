import React from "react";
import { Link } from "react-router-dom";

function UserProfilePage() {
    const [userData, setUserData] = React.useState(null);

    fetch("/api/myProfile")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setUserData(data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });

    if (userData) {
        return (
            <div>
                <h1>User Profile</h1>
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

export default UserProfilePage;
