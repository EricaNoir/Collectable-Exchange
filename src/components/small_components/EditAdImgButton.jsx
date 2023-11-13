// EditAdImgButton and floating window
import React from "react";

function EditAdImgButton() {
    // Handle image upload
    const [adImage, setAdImage] = React.useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1024 * 1024) {
            alert("Maximum image size: 1MB!");
            event.target.value = "";
            return;
        }
        setAdImage(file);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/api/manage/addAdImage";

        const body = new FormData();
        body.append("AdImage", adImage);

        fetch(url, {
            method: "POST",
            body: body,
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === "Success.") {
                    alert("Ad image uploaded successfully");
                    closeWindow();
                } else alert("Error: " + data);
            });
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
                    <h1>Edit Ad image</h1>
                    <form onSubmit={handleSubmit}>
                        <h3>
                            Upload a new advertisement image, please only upload .png file.
                        </h3>
                        <input
                            type="file"
                            name="adImage"
                            id="adImage"
                            accept="image/.png"
                            onChange={handleFileChange}
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
            <button onClick={openWindow}>Edit Ad Image</button>
            {isFloatingShow && floatingWindow}
        </>
    );
}

export default EditAdImgButton;
