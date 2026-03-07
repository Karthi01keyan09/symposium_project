const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ── POST /admin/login ─────────────────────────────────────────────
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password required" });
    }

    const sql = "SELECT * FROM admins WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Admin login DB error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }
        if (result.length > 0) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});

// ── GET /admin/registrations  (Read all) ─────────────────────────
router.get("/registrations", (req, res) => {
    db.query("SELECT * FROM registrations ORDER BY created_at DESC", (err, result) => {
        if (err) {
            console.error("Fetch registrations error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.json(result);
    });
});

// ── POST /admin/registrations  (Create) ──────────────────────────
router.post("/registrations", (req, res) => {
    const { name, email, phone, college, event } = req.body;
    if (!name || !email || !phone || !college || !event) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "INSERT INTO registrations (name, email, phone, college, event) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, phone, college, event], (err, result) => {
        if (err) {
            console.error("Create registration error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Registration created", id: result.insertId });
    });
});

// ── PUT /admin/registrations/:id  (Update) ───────────────────────
router.put("/registrations/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, college, event } = req.body;
    if (!name || !email || !phone || !college || !event) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "UPDATE registrations SET name=?, email=?, phone=?, college=?, event=? WHERE id=?";
    db.query(sql, [name, email, phone, college, event, id], (err, result) => {
        if (err) {
            console.error("Update registration error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.json({ message: "Registration updated" });
    });
});

// ── DELETE /admin/registrations/:id  (Delete) ────────────────────
router.delete("/registrations/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM registrations WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Delete registration error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.json({ message: "Registration deleted" });
    });
});

module.exports = router;
