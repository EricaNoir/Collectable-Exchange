import React from "react";

function CreateCollectableFloating({ nameList, closeWindow, onCreateSuccess }) {
    const [createdItem, setCreatedItem] = React.useState({
        collectableName: "",
        collectableSet: "",
        price: "",
        sellingOrBuying: "",
        collectableImage: "",
        priority: "",
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1024*1024) {
            alert("Maximum image size: 1MB!");
            event.target.value = "";
            return;
        }
        setCreatedItem({
            ...createdItem,
            collectableImage: file,
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCreatedItem({
            ...createdItem,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/collectableExchangeCreate";

        const body = new FormData();
        body.append("collectableName", createdItem.collectableName);
        body.append("collectableSet", createdItem.collectableSet);
        body.append("price", createdItem.price);
        body.append("sellingOrBuying", createdItem.sellingOrBuying);
        body.append("collectableImage", createdItem.collectableImage);
        body.append("priority", createdItem.priority);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "Success.") {
                    alert("Collectable create sucess.");
                    onCreateSuccess();
                    closeWindow();
                } else alert("Error: " + data);
            });
    };

    return (
        <div className="floating-window">
            <div className="floating-form-container">
                <h1>Create a collectable trade</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="collectableSet">Item Set:</label>
                        <select
                            name="collectableSet"
                            onChange={handleInputChange}
                            value={createdItem.collectableSet}
                            required
                        >
                            <option value="" disabled>
                                Select a set
                            </option>
                            {Object.keys(nameList).map((set) => (
                                <option key={set}>{set}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="collectableName">Item Name:</label>
                        {createdItem.collectableSet && (
                            <select
                                name="collectableName"
                                onChange={handleInputChange}
                                value={createdItem.collectableName}
                                required
                            >
                                <option value="" disabled>
                                    Select an item
                                </option>
                                {nameList[createdItem.collectableSet].map(
                                    (name) => (
                                        <option key={name}>{name}</option>
                                    )
                                )}
                            </select>
                        )}
                    </div>
                    <div>
                        <label htmlFor="price">Item Price:</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Please enter the price"
                            value={createdItem.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingOrBuying">Trade Type:</label>
                        <select
                            name="sellingOrBuying"
                            onChange={handleInputChange}
                            value={createdItem.sellingOrBuying}
                            required
                        >
                            <option value="" disabled>
                                Select a type
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
                            value={createdItem.priority}
                            required
                        >
                            <option value="" disabled>
                                Select a priority
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="collectableImage">Item Image: </label>
                        <input
                            type="file"
                            name="collectableImage"
                            id="collectableImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={closeWindow}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCollectableFloating;
