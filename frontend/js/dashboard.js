// Always point to the production Render backend (Railway DB)
// This ensures admin panel sees the same data as the live website
const BASE_URL = "https://symposium-backend-vgyc.onrender.com";

// ── Auth Guard ───────────────────────────────────────────────────────
if (!sessionStorage.getItem("adminLoggedIn")) {
    window.location.href = "admin.html";
}

// ── State ────────────────────────────────────────────────────────────
let allRegistrations = [];

// ── Toast Helper ──────────────────────────────────────────────────────
function showToast(msg, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `show ${type}`;
    setTimeout(() => { toast.className = ""; }, 3000);
}

// ── Load All Registrations ────────────────────────────────────────────
async function loadRegistrations() {
    try {
        const res = await fetch(`${BASE_URL}/admin/registrations`);
        if (!res.ok) throw new Error("Failed to fetch");
        allRegistrations = await res.json();
        document.getElementById("totalCount").textContent = allRegistrations.length;
        renderTable(allRegistrations);
    } catch (err) {
        console.error(err);
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="8"><div class="empty-state"><span>❌</span>Could not load data. Is the server running?</div></td></tr>`;
    }
}

// ── Render Table ──────────────────────────────────────────────────────
function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><span>📭</span>No registrations found.</div></td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.id}</td>
            <td>${escHtml(row.name)}</td>
            <td>${escHtml(row.email)}</td>
            <td>${escHtml(row.phone)}</td>
            <td>${escHtml(row.college)}</td>
            <td><span class="event-badge">${escHtml(row.event)}</span></td>
            <td>${row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}</td>
            <td>
                <div class="actions">
                    <button class="btn-edit" onclick="openEdit(${row.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="deleteRegistration(${row.id})">🗑️ Delete</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function escHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Search / Filter ───────────────────────────────────────────────────
document.getElementById("searchInput").addEventListener("input", function () {
    const q = this.value.toLowerCase();
    const filtered = allRegistrations.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.college?.toLowerCase().includes(q) ||
        r.event?.toLowerCase().includes(q)
    );
    renderTable(filtered);
});

// ── Modal Controls ────────────────────────────────────────────────────
function openModal(title = "Add Registration") {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalOverlay").classList.add("active");
}
function closeModal() {
    document.getElementById("modalOverlay").classList.remove("active");
    clearModal();
}
function clearModal() {
    ["editId", "mName", "mEmail", "mPhone", "mCollege", "mEvent"].forEach(id => {
        document.getElementById(id).value = "";
    });
}

// ── Add Registration (open blank modal) ───────────────────────────────
document.getElementById("addBtn").addEventListener("click", () => {
    clearModal();
    openModal("Add Registration");
});

// ── Open Edit Modal ───────────────────────────────────────────────────
function openEdit(id) {
    const row = allRegistrations.find(r => r.id === id);
    if (!row) return;
    document.getElementById("editId").value = row.id;
    document.getElementById("mName").value = row.name;
    document.getElementById("mEmail").value = row.email;
    document.getElementById("mPhone").value = row.phone;
    document.getElementById("mCollege").value = row.college;
    document.getElementById("mEvent").value = row.event;
    openModal("Edit Registration");
}

// ── Save (Create or Update) ───────────────────────────────────────────
document.getElementById("saveBtn").addEventListener("click", async () => {
    const id = document.getElementById("editId").value;
    const name = document.getElementById("mName").value.trim();
    const email = document.getElementById("mEmail").value.trim();
    const phone = document.getElementById("mPhone").value.trim();
    const college = document.getElementById("mCollege").value.trim();
    const event = document.getElementById("mEvent").value.trim();

    if (!name || !email || !phone || !college || !event) {
        showToast("All fields are required.", "error");
        return;
    }

    const body = { name, email, phone, college, event };
    const isEdit = !!id;
    const url = isEdit ? `${BASE_URL}/admin/registrations/${id}` : `${BASE_URL}/admin/registrations`;
    const method = isEdit ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (res.ok) {
            showToast(data.message || (isEdit ? "Updated!" : "Created!"), "success");
            closeModal();
            loadRegistrations();
        } else {
            showToast(data.message || "Something went wrong.", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Network error. Is the server running?", "error");
    }
});

// ── Delete Registration ───────────────────────────────────────────────
async function deleteRegistration(id) {
    if (!confirm(`Delete registration #${id}? This cannot be undone.`)) return;
    try {
        const res = await fetch(`${BASE_URL}/admin/registrations/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
            showToast(data.message || "Deleted!", "success");
            loadRegistrations();
        } else {
            showToast(data.message || "Delete failed.", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Network error.", "error");
    }
}

// ── UI Events ─────────────────────────────────────────────────────────
document.getElementById("cancelBtn").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
});
document.getElementById("refreshBtn").addEventListener("click", loadRegistrations);
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "admin.html";
});

// ── Init ──────────────────────────────────────────────────────────────
loadRegistrations();