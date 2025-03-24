import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken, setWebsite }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email, password });
            console.log("Login Response:", res.data); // Debug response
            console.log("Token received:", res.data.token); // Check token
            console.log("Website received:", res.data.website); // Check website

            if (res.data.token) {
                setToken(res.data.token);
                setWebsite(res.data.website);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("website", res.data.website);
            } else {
                alert("No token received, login failed.");
            }
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;