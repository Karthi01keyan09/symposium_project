const form = document.getElementById("registrationForm");

// Live backend URL on Render
const API_BASE_URL = "https://symposium-backend-vgyc.onrender.com";

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const college = document.getElementById("college").value.trim();
    const event = document.getElementById("event").value;

    // ================= FRONTEND VALIDATION =================

    if (!name || !email || !phone || !college || !event) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Basic phone number check (10 digits)
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    console.log("Sending data:", { name, email, phone, college, event });

    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, college, event })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration Successful! Welcome to Tech Symposium 2026.");
            form.reset();
        } else {
            alert(data.message || "Registration failed. Please try again.");
        }

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Cannot connect to server. Please try again later.");
    }
});
