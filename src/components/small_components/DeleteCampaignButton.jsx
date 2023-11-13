// delete campaign
import React from "react";

function DeleteCampaignButton() {
    // delete campaign

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
    const [deleteCampaign, setDeleteCampaign] = React.useState({
        collectableSet: "",
        collectableName: "",
    })
    const handleDeleteCampaignChange = (event) => {
        const { name, value } = event.target;
        setDeleteCampaign({
            ...deleteCampaign,
            [name]: value,
        });
    };
    const handleDeleteCampaignSubmit = (event) => {
        event.preventDefault();
        const result = window.confirm("Are you sure to delete this campaign?");
        if (result) {
            const url = "/api/manage/deleteCampaign"

            const body = new FormData();
            body.append("set", deleteCampaign.collectableSet);
            body.append("name", deleteCampaign.collectableName);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    alert(data);
                    collectableCategory[deleteCampaign.collectableSet] = collectableCategory[deleteCampaign.collectableSet].filter(
                        (name) => name !== deleteCampaign.collectableName
                    );
                    if (collectableCategory[deleteCampaign.collectableSet].length === 0) {
                        delete collectableCategory[deleteCampaign.collectableSet];
                    }
                    closeWindow();
                });
        }
    }

    // Hanlde floating window
    const [isFloatingShow, setIsFloatingShow] = React.useState(false);
    function closeWindow() {
        setDeleteCampaign({ collectableSet: "", collectableName: "" });
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
                    <h1>Delete campaign</h1>
                    {collectableCategory &&
                        <form onSubmit={handleDeleteCampaignSubmit}>
                            <div>
                                <label htmlFor="collectableSet">Item Set:</label>
                                <select
                                    name="collectableSet"
                                    onChange={handleDeleteCampaignChange}
                                    value={deleteCampaign.collectableSet}
                                    required
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
                            {deleteCampaign.collectableSet && (
                                <>
                                    <label htmlFor="collectableName">
                                        Item Name:
                                    </label>
                                    <select
                                        name="collectableName"
                                        onChange={handleDeleteCampaignChange}
                                        value={deleteCampaign.collectableName}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select an item
                                        </option>
                                        {collectableCategory[
                                            deleteCampaign.collectableSet
                                        ].map((name) => (
                                            <option key={name}>{name}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </div>
                            <button type="submit">Delete</button>
                        </form>}
                </div>
            </div>
        </>
    );

    return (
        <>
            <button onClick={openWindow}>Delete Campaign</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default DeleteCampaignButton;