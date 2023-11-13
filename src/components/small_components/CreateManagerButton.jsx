// Create Manager floating window
import React from "react";

function CreateManagerButton() {
    // create manager
    const [createManager, setCreateManager] = React.useState({
        username: "",
        password: "",
        passwordConfirmation: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCreateManager({
            ...createManager,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/manage/createManager";

        if (createManager.password !== createManager.passwordConfirmation) {
            alert("Password and password confirmation do not match.");
        } else {
            const body = new FormData();
            body.append("username", createManager.username);
            body.append("password", createManager.password);

            fetch(url, {
                method: "POST",
                body: body,
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data === "Success.") {
                        alert("New manager created successfully!");
                    } else alert(data);
                });
        }
    };

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
                    <h1>Create New Manager</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={createManager.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={createManager.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation">
                                Confirm your password:{" "}
                            </label>
                            <input
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirm Password"
                                value={createManager.passwordConfirmation}
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
            <button onClick={openWindow}>Create New Manager.</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default CreateManagerButton;