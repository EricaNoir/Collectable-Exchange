// Manage user
import React from "react";
import copyIcon from "../../static/copy.png";
import defaultImg from "../../static/default.png";
import manageIcon from "../../static/manage.png";

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
    const handleDeleteUser = (event) => {
        event.preventDefault();
        const result = window.confirm("Are you sure to delete this user?");
        if (result) {
            const url = "/api/manage/deleteUser";
            const body = new FormData();
            body.append("username", searchUser);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                    closeWindow();
                });
        }
    };
    const [managerAuthority, setManagerAuthority] = React.useState("MANAGER");
    function handleAuthorityInput(authority) {
        setManagerAuthority(authority);
    }
    const handleAuthorize = (event) => {
        event.preventDefault();
        const result = window.confirm(
            "Are you sure to authorize this manager?"
        );
        if (result) {
            const url = "/api/manage/managerAuthority";

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
                    closeWindow();
                });
        }
    };

    // Hanlde floating window
    const [isFloatingShow, setIsFloatingShow] = React.useState(false);
    function closeWindow() {
        setIsFloatingShow(false);
        setSearchUser("");
        setSearchUserInfo(null);
        setManagerAuthority("MANAGER");
    }
    function openWindow() {
        setIsFloatingShow(true);
    }
    const floatingWindow = (
        <>
            <div className="floating-overlay" onClick={closeWindow}></div>
            <div className="floating-window">
                <div className="floating-form-container">
                    <h1>Search a user</h1>
                    <div className="search-name-wrapper">
                        <form onSubmit={handleSearchUserSubmit}>
                            <h3>Search by username:</h3>
                            <input
                                type="text"
                                placeholder="Username"
                                value={searchUser}
                                onChange={(e) =>
                                    handleSearchUserInput(e.target.value)
                                }
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    {searchUserInfo && (
                        <section>
                            <div className="user-info">
                                <div className="img-name-container">
                                    <img
                                        src={
                                            searchUserInfo.userImage
                                                ? `http://localhost:8080/images/${searchUserInfo.userImage}`
                                                : defaultImg
                                        }
                                        alt="User Avatar"
                                    />

                                    <div className="user-name">
                                        {searchUserInfo.username}
                                    </div>
                                </div>

                                <div className="line-container">
                                    <div className="line">
                                        <strong>Email: </strong>
                                        <div className="info-text">
                                            {searchUserInfo.userEmail ? (
                                                <a
                                                    href={`mailto:${searchUserInfo.userEmail}`}
                                                    target="_top"
                                                >
                                                    {searchUserInfo.userEmail}
                                                </a>
                                            ) : (
                                                "Not provided"
                                            )}
                                        </div>
                                    </div>
                                    <div className="line">
                                        <strong>Phone: </strong>
                                        <div className="info-text">
                                            {searchUserInfo.userPhone ||
                                                "Not provided"}
                                        </div>
                                        {searchUserInfo.userPhone && (
                                            <img
                                                src={copyIcon}
                                                style={{
                                                    marginLeft: "24px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    copyInfo(
                                                        searchUserInfo.userPhone
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="line">
                                        <strong>Facebook: </strong>
                                        <div className="info-text">
                                            {searchUserInfo.userFacebook ||
                                                "Not provided"}
                                        </div>
                                        {searchUserInfo.userFacebook && (
                                            <img
                                                src={copyIcon}
                                                style={{
                                                    marginLeft: "24px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    copyInfo(
                                                        searchUserInfo.userFacebook
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="line">
                                        <strong>User Role: </strong>
                                        <div className="info-text">
                                            {searchUserInfo.userRole}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="delete-user-btn"
                                onClick={handleDeleteUser}
                            >
                                Delete this User
                            </button>
                            {searchUserInfo.userRole &&
                                searchUserInfo.userRole.includes("MANAGER") && (
                                    <div className="manage-authority-wrapper">
                                        <form onSubmit={handleAuthorize}>
                                            <h3>
                                                Select permissions to authorise
                                            </h3>
                                            <select
                                                name="authority"
                                                onChange={(e) =>
                                                    handleAuthorityInput(
                                                        e.target.value
                                                    )
                                                }
                                                value={managerAuthority}
                                            >
                                                <option>MANAGER</option>
                                                <option>
                                                    CAMPAIGN_MANAGER
                                                </option>
                                            </select>
                                            <button type="submit">
                                                Authorise
                                            </button>
                                        </form>
                                    </div>
                                )}
                        </section>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <>
            <button onClick={openWindow} className="admin-button">
                <img src={manageIcon} />
                Manage User and Manager
            </button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default ManageUserButton;
