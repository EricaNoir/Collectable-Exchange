// Textarea for post input
import React from "react";

function EditPostButton() {
    const [message, setMessage] = React.useState(null);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleMessageSubmit = (event) => {
        event.preventDefault();

        const url = "/api/manage/post";
        const body = new FormData();

        body.append("message", message);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
                setMessage("");
            });
    };

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
                    <h1>Edit Post</h1>
                    <form onSubmit={handleMessageSubmit}>
                        <h3>Send a new post to all users</h3>
                        <textarea
                            name="message"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Enter your post..."
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
    return (
        <>
            <button onClick={openWindow}>Edit Post</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default EditPostButton;
