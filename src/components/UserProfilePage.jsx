import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./small_components/Navbar";

function UserProfilePage() {
    const [userData, setUserData] = React.useState(null);

    // Get and set userData
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

    return (
        <>
            <Navbar />
            <h1>User Profile</h1>
            {userData!==null ? (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default UserProfilePage;
