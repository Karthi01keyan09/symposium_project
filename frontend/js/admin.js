// Smart URL detection:
// - If opened via localhost or 127.0.0.1  → use local backend (port 4000)
// - If opened via the live Render URL     → use Render backend
const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
const BASE_URL = isLocal
    ? "http://localhost:4000"
    : "https://symposium-backend-vgyc.onrender.com";

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