// Always point to the production Render backend (Railway DB)
// This ensures admin panel sees the same data as the live website
const BASE_URL = "https://symposium-backend-vgyc.onrender.com";

document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginBtn = document.getElementById("loginBtn");
    const errorMsg = document.getElementById("errorMsg");

    loginBtn.disabled = true;
    loginBtn.textContent = "Signing in…";
    errorMsg.style.display = "none";

    try {
        const res = await fetch(`${BASE_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            // Store session flag
            sessionStorage.setItem("adminLoggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = data.message || "Invalid username or password.";
            errorMsg.style.display = "block";
        }
    } catch (err) {
        errorMsg.textContent = "Cannot connect to server. Make sure the backend is running.";
        errorMsg.style.display = "block";
        console.error("Login error:", err);
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Sign In";
    }
});