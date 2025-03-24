import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Dashboard = ({ token, website, setToken, setWebsite }) => {
    const [content, setContent] = useState("");

    // Extract domain correctly (removes http:// or https:// and trailing slashes)
    const domain = website.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "");

    useEffect(() => {
        if (!token || !domain) return;

        // Fetch content for the website
        axios.get(`http://localhost:5000/api/website/${domain}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setContent(res.data?.content || "");
        })
        .catch((err) => {
            if (err.response?.status === 403) {
                alert("Session expired. Please log in again.");
                handleLogout();
            } else {
                console.error("Error fetching content:", err);
            }
        });
    }, [token, domain]);

    const saveContent = () => {
        console.log("Saving content for domain:", domain); 
        axios.put(
            `http://localhost:5000/api/website/${domain}`,
            { content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            alert(`Website ${domain} updated successfully!`);
            console.log("Updated website:", res.data.website); 
        })
        .catch((err) => {
            console.error("Error updating content:", err.response?.data || err.message);
            alert("Update failed: " + (err.response?.data?.message || err.message));
        });
    };

    const handleLogout = () => {
        setToken(""); 
        setWebsite("");
        localStorage.removeItem("token"); 
        localStorage.removeItem("website");
        window.location.reload(); 
    };

    return (
        <div>
            <h2>Editing: {domain}</h2>
            <ReactQuill value={content} onChange={setContent} />
            <button onClick={saveContent}>Save Changes</button>
            <button onClick={handleLogout} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;