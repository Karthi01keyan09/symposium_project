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

module.exports = {
    createRegistration
};