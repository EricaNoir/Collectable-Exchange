import React from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        passwordConfirmation: "",
        userEmail: "",
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
        const url = "http://170.64.129.76/createUser";

        if (formData.password !== formData.passwordConfirmation) {
            alert("Password and password confirmation do not match.");
        } else {
            const body = new URLSearchParams();
            body.append("username", formData.username);
            body.append("password", formData.password);
            body.append("userEmail", formData.userEmail);

            fetch(url, {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data === "Success.") {
                        alert("Registration successful, please log in.");
                        window.location.href = "/log-in";
                    } else alert(data);
                });
        }
    };

    return (
        <>
            <Link to="/">
                <button className="logo">LOGO</button>
            </Link>
            <div className="form-container">
                <h1>Create account</h1>
                <form onSubmit={handleSubmit}>
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
                    <div>
                        <label htmlFor="passwordConfirmation">
                            Confirm your password:{" "}
                        </label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            value={formData.passwordConfirmation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="userEmail">Email: </label>
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Email"
                            value={formData.userEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input type="submit" value="Create" />
                </form>
                <div id="resultMessage"></div>
            </div>
        </>
    );
}

export default SignUpPage;
