const form = document.getElementById("registrationForm");
const submitBtn = form.querySelector("button[type='submit']");

// Force local backend for DBMS demonstration
const API_BASE_URL = "http://localhost:4000";

// ── Guard flag: prevents duplicate submissions ──
let isSubmitting = false;

// ── Helper: show the in-page success modal ──
function showSuccessModal(name, event) {
    const overlay = document.getElementById("successOverlay");
    if (overlay) {
        document.getElementById("modalName").textContent = name;
        document.getElementById("modalEvent").textContent = event;
        overlay.classList.add("active");
    }
}

// ── Helper: toggle the submit button into loading state ──
function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "not-allowed";
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = "Register";
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // ── Block duplicate submissions ──
    if (isSubmitting) return;

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

    // ── Lock the button so user cannot resubmit ──
    isSubmitting = true;
    setLoading(true);

    console.log("Sending data:", { name, email, phone, college, event });

    // ── Show success modal IMMEDIATELY (optimistic UI) ──
    // This removes any perceived delay caused by the Render server cold-start.
    form.reset();
    setLoading(false);
    showSuccessModal(name, event);

    // ── Send data to backend silently in the background ──
    fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, college, event })
    })
        .then(response => response.json())
        .then(data => {
            if (!data || data.message === "All fields are required") {
                console.warn("Background registration warning:", data);
            } else {
                console.log("Background registration response:", data.message);
            }
            // Reset guard so another registration can be made later
            isSubmitting = false;
        })
        .catch(error => {
            console.error("Background fetch error (data may not have saved):", error);
            // Reset guard so user can try again if needed
            isSubmitting = false;
        });
});
