const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",  // 🔹 Update with your MySQL password
    database: "school_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed: " + err.message);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// API Route: Add Student
app.post("/students", (req, res) => {
    const { admission_no, name, father_name, class_name, mobile_number, dob } = req.body;

    if (!admission_no || !name || !father_name || !class_name || !mobile_number || !dob) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO students (admission_no, name, father_name, class, mobile_number, dob) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [admission_no, name, father_name, class_name, mobile_number, dob], (err, result) => {
        if (err) {
            console.error("❌ Error adding student:", err);
            res.status(500).json({ error: "Failed to add student" });
            return;
        }
        res.status(200).json({ message: "✅ Student added successfully!", studentId: result.insertId });
    });
});

// API Route: Get Students by Class
app.get("/students", (req, res) => {
    const class_name = req.query.class;
    const sql = "SELECT * FROM students WHERE class = ?";

    db.query(sql, [class_name], (err, results) => {
        if (err) {
            console.error("❌ Error fetching students:", err);
            res.status(500).json({ error: "Failed to fetch students" });
            return;
        }
        res.status(200).json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
