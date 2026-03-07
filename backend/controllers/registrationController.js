const Registration = require("../models/registrationModel");

// Handle registration request
const registerParticipant = (req, res) => {

    const { name, email, phone, college, event } = req.body;

    // Basic validation
    if (!name || !email || !phone || !college || !event) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const data = { name, email, phone, college, event };

    Registration.createRegistration(data, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Registration successful",
            id: result.insertId
        });

    });
};

module.exports = {
    registerParticipant
};