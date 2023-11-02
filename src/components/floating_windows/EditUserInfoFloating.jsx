import React from "react";

function EditUserInfoFloating({ user, closeWindow }) {
    const [editedUser, setEditedUser] = React.useState({
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        userFacebook: user.userFacebook,
        buyingCollectableInterested: user.buyingCollectableInterested,
        sellingCollectableInterested: user.sellingCollectableInterested,
        userImage: null,
    });
    const [changed, setChanged] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1024*1024) {
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
        body.append("buyingCollectableInterested", editedUser.buyingCollectableInterested);
        body.append("sellingCollectableInterested", editedUser.sellingCollectableInterested);
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
        <div className="floating-window">
            <div className="form-container">
                <h1>Edit a collectable trade</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="price">User Price:</label>
                        <input
                            type="number"
                            name="price"
                            placeholder={editedUser.price}
                            value={editedUser.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingOrBuying">Trade Type:</label>
                        <select
                            name="sellingOrBuying"
                            onChange={handleInputChange}
                            value={editedUser.sellingOrBuying}
                        >
                            <option value={editedUser.sellingOrBuying}>
                                Leave unchanged
                            </option>
                            <option>SELLING</option>
                            <option>BUYING</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority">
                            Trade Priority: (3 is the highest)
                        </label>
                        <select
                            name="priority"
                            onChange={handleInputChange}
                            value={editedUser.priority}
                        >
                            <option value={editedUser.priority}>
                                Leave unchanged
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="collectableImage">User Image: </label>
                        <input
                            type="file"
                            name="collectableImage"
                            id="collectableImage"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" disabled={!changed}>Submit</button>
                    <button onClick={closeWindow}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default EditUserInfoFloating;