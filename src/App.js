import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
    const [token, setToken] = useState("");
    const [website, setWebsite] = useState("");

    // Check localStorage for token and website on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedWebsite = localStorage.getItem("website");
        if (storedToken && storedWebsite) {
            setToken(storedToken);
            setWebsite(storedWebsite);
        }
    }, []);

    return (
        <div>
            {token && website ? (
                <Dashboard token={token} website={website} setToken={setToken} setWebsite={setWebsite} />
            ) : (
                <Login setToken={setToken} setWebsite={setWebsite} />
            )}
        </div>
    );
};

export default App;