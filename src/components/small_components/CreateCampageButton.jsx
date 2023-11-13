import React from "react";

function CreateCampaignButton() {
    // create new campaign
    const [campaign, setCampaign] = React.useState({
        collectableSet: "",
        names: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCampaign({
            ...campaign,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/manage/createNewCampaign";

        const body = new FormData();
        body.append("set", campaign.collectableSet);
        body.append("names", campaign.names);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                closeWindow();
            });
    };

    // Hanlde floating window
    const [isFloatingShow, setIsFloatingShow] = React.useState(false);
    function closeWindow() {
        setCampaign({
            collectableSet: "",
            names: "",
        });
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
                    <h1>Create New Campaign</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="collectableSet">Set: </label>
                            <input
                                type="text"
                                name="collectableSet"
                                placeholder="Collectable Set"
                                value={campaign.collectableSet}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="names">Name List (each name splits by a ', '): </label>
                            <input
                                type="text"
                                name="names"
                                placeholder="Names, split each name by ', '"
                                value={campaign.names}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </>
    );
    
    return (
        <>
            <button onClick={openWindow} className="create-campaign-btn">Create New Campaign</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default CreateCampaignButton;