const Registration = require("../models/registrationModel");

// Handle registration request
const registerParticipant = (req, res) => {

    const { register_number, name, email, phone, college, event } = req.body;

    // Basic validation
    if (!register_number || !name || !email || !phone || !college || !event) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // ── Duplicate check: same email + same event ──
    Registration.findByEmailAndEvent(email, event, (err, existing) => {

        if (err) {
            console.error("Duplicate-check error:", err);
            return res.status(500).json({ message: "Database error: " + err.message });
        }

        if (existing) {
            return res.status(409).json({
                message: `You are already registered for '${event}'. Each participant can register for the same event only once.`
            });
        }

        // Not a duplicate — proceed with insert
        const data = { register_number, name, email, phone, college, event };

        Registration.createRegistration(data, (err, result) => {

            if (err) {
                console.error(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: "This register number is already registered!"
                    });
                }
                return res.status(500).json({
                    message: "Database error: " + err.message
                });
            }

            res.status(201).json({
                message: "Registration successful",
                register_number
            });

        });
    });
};

module.exports = {
    registerParticipant
};