import React from "react";

function ManageCampaignPriorityButton() {
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

    // manage campaign priority
    const [setPriority, setSetPriority] = React.useState({
        set: "",
        priority: 1,
    });
    const handleSetPriorityChange = (event) => {
        const { name, value } = event.target;
        setSetPriority({
            ...setPriority,
            [name]: value,
        });
    };
    const handlePrioritySubmit = (event) => {
        event.preventDefault();
        const result = window.confirm("Are you sure to change the priority of this campaign?");
        if (result) {
            const url = "/api/manage/moderatePriority"

            const body = new FormData();
            body.append("set", setPriority.set);
            body.append("priority", setPriority.priority);

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
    }

    // Hanlde floating window
    const [isFloatingShow, setIsFloatingShow] = React.useState(false);
    function closeWindow() {
        setSetPriority({ set: "", priority: 1 });
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
                    <h1>Manage Campaign Priority</h1>
                    {collectableCategory &&
                        <form onSubmit={handlePrioritySubmit}>
                            <div>
                                <label htmlFor="set">Item Set:</label>
                                <select
                                    name="set"
                                    onChange={handleSetPriorityChange}
                                    value={setPriority.set}
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
                                {setPriority.set && (
                                    <>
                                        <label htmlFor="priority">
                                            Priority (4 is the highest priority):
                                        </label>
                                        <select
                                            name="priority"
                                            onChange={handleSetPriorityChange}
                                            value={setPriority.priority}
                                            required
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </>
                                )}
                            </div>
                            <button type="submit">Change</button>
                        </form>}
                </div>
            </div>
        </>
    );

    return (
        <>
            <button onClick={openWindow}>Manage Campaign Priority</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default ManageCampaignPriorityButton;