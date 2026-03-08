const db = require("../config/db");

const createRegistration = (data, callback) => {

    const sql = `
        INSERT INTO registrations (name, email, phone, college, event)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [data.name, data.email, data.phone, data.college, data.event],
        (err, result) => {

            if (err) {
                console.error("Database error:", err);
                return callback(err, null);
            }

            callback(null, result);
        }
    );
};

// Check if the same email+event combination exists (duplicate guard)
const findByEmailAndEvent = (email, event, callback) => {
    const sql = `
        SELECT id FROM registrations
        WHERE email = ? AND event = ?
        LIMIT 1
    `;
    db.query(sql, [email, event], (err, rows) => {
        if (err) return callback(err, null);
        // rows is an array; return the first match or null
        callback(null, rows && rows.length > 0 ? rows[0] : null);
    });
};

module.exports = {
    createRegistration,
    findByEmailAndEvent
};