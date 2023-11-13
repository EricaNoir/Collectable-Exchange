// Manage user
import React from "react";
import emailIcon from "../../static/email.png";
import phoneIcon from "../../static/phone.png";
import facebookIcon from "../../static/facebook.png";
import copyIcon from "../../static/copy.png";
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
                            <div class="img-name-container">
                                <img
                                    src={`http://localhost:8080/images/${searchUserInfo.userImage}`}
                                    alt="User Avatar"
                                />

                                <div className="user-name">{searchUserInfo.username}</div>
                            </div>

                            <div class="line-container">
                                <div className="line">
                                    <img src={emailIcon} />
                                    <strong>Email: </strong>
                                    <div className="info-text">
                                        <a
                                            href={`mailto:${searchUserInfo.userEmail}`}
                                            target="_top"
                                        >
                                            {searchUserInfo.userEmail}
                                        </a>
                                    </div>
                                </div>
                                <div className="line">
                                    <img src={phoneIcon} />
                                    <strong>Phone: </strong>
                                    <div className="info-text">
                                        {searchUserInfo.userPhone || "Not provided"}
                                    </div>
                                    {searchUserInfo.userPhone && (
                                        <img
                                            src={copyIcon}
                                            style={{
                                                marginLeft: "24px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                copyInfo(searchUserInfo.userPhone)
                                            }
                                        />
                                    )}
                                </div>
                                <div className="line">
                                    <img src={facebookIcon} />
                                    <strong>Facebook: </strong>
                                    <div className="info-text">
                                        {searchUserInfo.userFacebook || "Not provided"}
                                    </div>
                                    {searchUserInfo.userFacebook && (
                                        <img
                                            src={copyIcon}
                                            style={{
                                                marginLeft: "24px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                copyInfo(searchUserInfo.userFacebook)
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
                            <button className="delete-user-btn" onClick={handleDeleteUser}> Delete</button>
                            {searchUserInfo.userRole.includes("MANAGER") && (
                                <div className="manage-authority-wrapper">
                                    <h2>Select authority</h2>
                                    <form onSubmit={handleAuthorize}>
                                        <label htmlFor="authority">Account Type:</label>
                                        <select
                                            name="authority"
                                            onChange={handleAuthorityInput}
                                            value={managerAuthority}
                                        >
                                            <option>MANAGER</option>
                                            <option>CAMPAIGN_MANAGER</option>
                                        </select>
                                        <button type="submit">Authorize</button>
                                    </form>
                                </div>
                            )}
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