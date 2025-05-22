const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require("path");

const app = express();
const dbPath = path.join(__dirname, "mydatabase.db");
const db = new sqlite3.Database(dbPath);

app.use(cors());

// API to fetch tree data
app.get('/api/tree', (req, res) => {
    const query = `
        WITH RECURSIVE tree AS (
            SELECT id, parent_id, name, value
            FROM tree_data
            WHERE parent_id IS NULL
            UNION ALL
            SELECT td.id, td.parent_id, td.name, td.value
            FROM tree_data td
            INNER JOIN tree t ON t.id = td.parent_id
        )
        SELECT * FROM tree;
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Export the app for testing
module.exports = app;

// Start the server when this file is run directly
if (require.main === module) {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
