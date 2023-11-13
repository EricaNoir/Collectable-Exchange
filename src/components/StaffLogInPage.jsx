import React from "react";
import { Link } from "react-router-dom";

function StaffLogInPage() {
    const [formData, setFormData] = React.useState({
        accountType: "MANAGER",
        username: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = "/api/login";

        const body = new URLSearchParams();
        body.append("username", formData.username);
        body.append("password", formData.password);

        fetch(url, {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((response) => {
            if (response.status === 200) {
                fetch("/api/myProfile")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        console.log(formData);
                        if (
                            !data.userRole ||
                            !data.userRole.includes(formData.accountType)
                        ) {
                            alert("Your account type is wrong!");
                        } else {
                            window.location.href = "/manager-admin-home";
                        }
                    });
            } else {
                alert("Login fail, username or password is incorrect.");
            }
        });
    };

    return (
        <>
            <Link to="/">
                <button className="back">Back to selection</button>
            </Link>
            <div className="form-container">
                <div className="form-title-container">
                    <h1>Welcome</h1>
                    <h2>Staff log in</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="accountType">
                            Select account type:{" "}
                        </label>
                        <select
                            name="accountType"
                            id="accountType"
                            value={formData.accountType}
                            onChange={handleInputChange}
                        >
                            <option>MANAGER</option>
                            <option>ADMIN</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input type="submit" value="Log in" />
                </form>
            </div>
        </>
    );
}

export default StaffLogInPage;
