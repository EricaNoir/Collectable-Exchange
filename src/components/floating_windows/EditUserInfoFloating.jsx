import React from "react";

function EditUserInfoFloating({ user, closeWindow }) {
    const [editedUser, setEditedUser] = React.useState({
        userEmail: user.userEmail,
        userPhone: user.userPhone || "",
        userFacebook: user.userFacebook || "",
        buyingCollectableInterestedSet: user.buyingCollectableInterested ? user.buyingCollectableInterested.split(' ')[0] : "",
        buyingCollectableInterestedName: user.buyingCollectableInterested ? user.buyingCollectableInterested.split(' ')[1] : "",
        sellingCollectableInterestedSet: user.sellingCollectableInterested ? user.sellingCollectableInterested.split(' ')[0] : "",
        sellingCollectableInterestedName: user.sellingCollectableInterested ? user.sellingCollectableInterested.split(' ')[1] : "",
        userImage: null,
    });
    const [changed, setChanged] = React.useState(false);
    // Get current collectable category as a Json
    const [collectableCategory, setCollectableCategory] = React.useState(null);

    // load collectable category
    React.useEffect(() => {
        fetch("/api/currentAuthorisedCollectable")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((collectableCategoryData) => {
                setCollectableCategory(collectableCategoryData);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1024 * 1024) {
            alert("Maximum image size: 1MB!");
            event.target.value = "";
            return;
        }
        setEditedUser({
            ...editedUser,
            userImage: file,
        });
        setChanged(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
        setChanged(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/myProfile/edit";

        const body = new FormData();
        body.append("userEmail", editedUser.userEmail);
        body.append("userPhone", editedUser.userPhone);
        body.append("userFacebook", editedUser.userFacebook);
        body.append("buyingCollectableInterested",
            (editedUser.buyingCollectableInterestedSet && editedUser.buyingCollectableInterestedName)
                ? editedUser.buyingCollectableInterestedSet + " " + editedUser.buyingCollectableInterestedName
                : null);
        body.append("sellingCollectableInterested",
            (editedUser.sellingCollectableInterestedSet && editedUser.sellingCollectableInterestedName)
                ? editedUser.sellingCollectableInterestedSet + " " + editedUser.sellingCollectableInterestedName
                : null);
        body.append("userImage", editedUser.userImage);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "Edit success.") {
                    alert("User profile edit success.");
                    closeWindow();
                } else alert("Error: " + data);
            });
    };
    return (
        <>

            <div className="floating-window">
                {collectableCategory !== null ? (
                    <div className="floating-form-container">
                        <h1>Edit your profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="userEmail">New Email:</label>
                                <input
                                    type="email"
                                    name="userEmail"
                                    placeholder={editedUser.userEmail}
                                    value={editedUser.userEmail}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="userPhone">New Phone:</label>
                                <input
                                    type="tel"
                                    name="userPhone"
                                    placeholder={editedUser.userPhone || "Not provided."}
                                    value={editedUser.userPhone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="userFacebook">New Facebook:</label>
                                <input
                                    type="text"
                                    name="userFacebook"
                                    placeholder={editedUser.userFacebook || "Not provided."}
                                    value={editedUser.userFacebook}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="buyingCollectableInterestedSet">Set want to buy:</label>
                                <select
                                    name="buyingCollectableInterestedSet"
                                    onChange={handleInputChange}
                                    value={editedUser.buyingCollectableInterestedSet}
                                >
                                    <option value="" disabled>
                                        Select a set
                                    </option>
                                    {Object.keys(collectableCategory).map((set) => (
                                        <option key={set}>{set}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="buyingCollectableInterestedName">In this set, card want to buy:</label>
                                {editedUser.buyingCollectableInterestedSet && (
                                    <select
                                        name="buyingCollectableInterestedName"
                                        onChange={handleInputChange}
                                        value={editedUser.buyingCollectableInterestedName}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select an item
                                        </option>
                                        {collectableCategory[editedUser.buyingCollectableInterestedSet].map(
                                            (name) => (
                                                <option key={name}>{name}</option>
                                            )
                                        )}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label htmlFor="sellingCollectableInterestedSet">Set want to sell:</label>
                                <select
                                    name="sellingCollectableInterestedSet"
                                    onChange={handleInputChange}
                                    value={editedUser.sellingCollectableInterestedSet}
                                >
                                    <option value="" disabled>
                                        Select a set
                                    </option>
                                    {Object.keys(collectableCategory).map((set) => (
                                        <option key={set}>{set}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sellingCollectableInterestedName">In this set, card want to sell:</label>
                                {editedUser.sellingCollectableInterestedSet && (
                                    <select
                                        name="sellingCollectableInterestedName"
                                        onChange={handleInputChange}
                                        value={editedUser.sellingCollectableInterestedName}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select an item
                                        </option>
                                        {collectableCategory[editedUser.sellingCollectableInterestedSet].map(
                                            (name) => (
                                                <option key={name}>{name}</option>
                                            )
                                        )}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label htmlFor="userImage">User Image: </label>
                                <input
                                    type="file"
                                    name="userImage"
                                    id="userImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" disabled={!changed}>Submit</button>
                            <button onClick={closeWindow}>Close</button>
                        </form>
                    </div>
                ) : (
                    <div> Loading...</div>
                )}
            </div>
        </>
    );
}

export default EditUserInfoFloating;