import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./small_components/Navbar";

function UserProfilePage() {
    const {userName} = useParams();
    const [userData, setUserData] = React.useState(null);

    // Get and set userData
    useEffect(() => {
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
    });

    return (
        <>
            <Navbar userName={userName} />
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
