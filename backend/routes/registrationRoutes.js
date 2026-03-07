const express = require("express");
const router = express.Router();

const { registerParticipant } = require("../controllers/registrationController");

// POST /api/register
router.post("/register", registerParticipant);

module.exports = router;