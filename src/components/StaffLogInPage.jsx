import React from "react";
import { Link } from "react-router-dom";

function StaffLogInPage() {
    const [formData, setFormData] = React.useState({
        accountType: "",
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

        const url = "http://170.64.129.76/login";

        const body = new URLSearchParams();
        body.append("accountType", formData.accountType);
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
                console.log("success");
            } else {
                console.log(":(");
            }
        });
    };

    return (
        <>
            <Link to="/">
                <button className="logo">LOGO</button>
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
                        <select name="accountType" id="accountType">
                            <option value={formData.accountType}>
                                Manager
                            </option>
                            <option value={formData.accountType}>
                                Administrator
                            </option>
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
