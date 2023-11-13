import React from "react";

function EditCollectableFloating({ exchange, closeWindow }) {
    const [editedItem, setEditedItem] = React.useState({
        exchangeId: exchange.exchangeId,
        price: exchange.price,
        sellingOrBuying: exchange.sellingOrBuying,
        priority: exchange.priority,
        visibility: exchange.visibility,
        collectableImage: null,
    });
    const [changed, setChanged] = React.useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1024 * 1024) {
            alert("Maximum image size: 1MB!");
            event.target.value = "";
            return;
        }
        setEditedItem({
            ...editedItem,
            collectableImage: file,
        });
        setChanged(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedItem({
            ...editedItem,
            [name]: value,
        });
        setChanged(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/myCollectableExchange/edit";

        const body = new FormData();
        body.append("exchangeId", editedItem.exchangeId);
        body.append("price", editedItem.price);
        body.append("sellingOrBuying", editedItem.sellingOrBuying);
        body.append("priority", editedItem.priority);
        body.append("visibility", editedItem.visibility);
        body.append("collectableImage", editedItem.collectableImage);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "Edit success.") {
                    alert("Collectable edit success.");
                    closeWindow();
                } else alert("Error: " + data);
            });
    };
    return (
        <>
            <div className="floating-overlay" onClick={closeWindow}></div>
            <div className="floating-window">
                <div className="floating-form-container">
                    <h1>Edit a collectable trade</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="price">Item Price:</label>
                            <input
                                type="number"
                                name="price"
                                placeholder={editedItem.price}
                                value={editedItem.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="sellingOrBuying">Trade Type:</label>
                            <select
                                name="sellingOrBuying"
                                onChange={handleInputChange}
                                value={editedItem.sellingOrBuying}
                            >
                                <option value={editedItem.sellingOrBuying}>
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
                                value={editedItem.priority}
                            >
                                <option value={editedItem.priority}>
                                    Leave unchanged
                                </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="collectableImage">
                                Item Image:{" "}
                            </label>
                            <input
                                type="file"
                                name="collectableImage"
                                id="collectableImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" disabled={!changed}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditCollectableFloating;
