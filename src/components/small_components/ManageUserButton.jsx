// Manage user
import React from "react";

function ManageUserButton() {
    // search user, delete/authorize
    const [searchUser, setSearchUser] = React.useState("");
    const [searchUserInfo, setSearchUserInfo] = React.useState("");
    function handleSearchUserInput(userName) {
        setSearchUser(userName);
    }
    const handleSearchUserSubmit = (event) => {
        event.preventDefault();
        const url = `/api/manage/search?name=${searchUser}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                setSearchUserInfo(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };
    const handleDeleteUser = () => {
        const result = window.confirm("Are you sure to delete this user?");
        if (result) {
            const url = "/api/manage/deleteUser"
            const body = new FormData();
            body.append("username", searchUser);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                });
        }
    }
    const [managerAuthority, setManagerAuthority] = React.useState("MANAGER");
    function handleAuthorityInput(authority) {
        setManagerAuthority(authority);
    }
    const handleAuthorize = () => {
        const result = window.confirm("Are you sure to authorize this manager?");
        if (result) {
            const url = "/api/manage/managerAuthority"

            const body = new FormData();
            body.append("username", searchUser);
            body.append("authority", managerAuthority);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                });
        }
    }

    // Hanlde floating window
    const [isFloatingShow, setIsFloatingShow] = React.useState(false);
    function closeWindow() {
        setIsFloatingShow(false);
    }
    function openWindow() {
        setIsFloatingShow(true);
    }
    const floatingWindow = (
        <>
            <div className="floating-overlay" onClick={closeWindow}></div>
            <div className="floating-window">
                <div className="floating-form-container">
                    <div className="search-name-wrapper">
                        <h1>Search a user</h1>
                        <form onSubmit={handleSearchUserSubmit}>
                            <label className="search-name-label">
                                Search by owner name:
                                <input
                                    type="text"
                                    placeholder="Owner Name"
                                    value={searchUser}
                                    onChange={(e) =>
                                        handleSearchUserInput(e.target.value)
                                    }
                                />
                            </label>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    {searchUserInfo && (
                        <div className="manage-user-card">
                            
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <>
            <button onClick={openWindow}>Manage User and Manager</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default ManageUserButton;