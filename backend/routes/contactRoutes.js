// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// // Get all contacts

// router.get("/", (req, res) => {
//     const page = parseInt(req.query.page) || 1 ; 
//     const limit = parseInt(req.query.limit) || 10 ;
//     const offset = (page - 1) * limit ;

//     db.all('SELECT COUNT(*) AS total FROM contacts', [], (err, countRows)=>{
//         if(err)return res.status(500).json({ error: err.message });
//         const total = countRows[0].total ;

//         db.all('SELECT * FROM contacts LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ total, page, limit, contacts: rows });
//         });
//     }) ; 
// }) ; 

// router.post('/', (req, res) => {
//     const { name, email, phone } = req.body;
//     if (!name) return res.status(400).json({ error: "Name is required" });

//     db.run(
//         'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
//         [name, email, phone],
//         function(err) {
//             if (err) return res.status(500).json({ error: err.message });
//             res.status(201).json({ id: this.lastID, name, email, phone });
//         }
//     );
// });

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email, phone } = req.body;

//     db.run(
//         'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
//         [name, email, phone, id],
//         function(err) {
//             if (err) return res.status(500).json({ error: err.message });
//             if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });
//             res.json({ id, name, email, phone });
//         }
//     );
// });


// router.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
//         if (err) return res.status(500).json({ error: err.message });
//         if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });
//         res.status(204).send();
//     });
// });

// module.exports = router;

// backend/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // make sure this path is correct

// GET all contacts
router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    db.all("SELECT COUNT(*) AS total FROM contacts", [], (err, countRows) => {
        if (err) return res.status(500).json({ error: err.message });
        const total = countRows[0].total;

        db.all("SELECT * FROM contacts LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ total, page, limit, contacts: rows });
        });
    });
});

// POST add contact
router.post("/", (req, res) => {
    const { name, email, phone } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    db.run("INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, email, phone });
    });
});

// PUT update contact
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    db.run("UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?", [name, email, phone, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });
        res.json({ id, name, email, phone });
    });
});

// DELETE contact
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM contacts WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });
        res.status(204).send();
    });
});

// THIS IS CRUCIAL — export the router
module.exports = router;
