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
        process.exit(1); // Stop the server if DB connection fails
    }
    console.log("✅ Connected to MySQL Database");
});

// ✅ API Route: Add Student
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

// ✅ API Route: Get Students (With Class Filter)
app.get("/students", (req, res) => {
    const class_name = req.query.class;
    let sql = "SELECT admission_no, name FROM students";
    let params = [];

    if (class_name) {
        sql += " WHERE class = ?";
        params.push(class_name);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("❌ Error fetching students:", err);
            res.status(500).json({ error: "Failed to fetch students" });
            return;
        }
        res.status(200).json(results);
    });
});

// ✅ API Route: Add Marks for Multiple Students
app.post("/marks", (req, res) => {
    const { class_name, exam_type, students } = req.body;

    if (!class_name || !exam_type || !students.length) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO marks (admission_no, exam_type, subject, marks_obtained, max_marks, class) VALUES ?";

    const values = students.flatMap(student =>
        student.subjects.map(subject => [
            student.admission_no,
            exam_type,
            subject.name,
            subject.marks,
            subject.max_marks,
            class_name
        ])
    );

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("❌ Error adding marks:", err);
            res.status(500).json({ error: "Failed to add marks" });
            return;
        }
        res.status(200).json({ message: "✅ Marks added successfully!", affectedRows: result.affectedRows });
    });
});

// ✅ API Route: Get Marks for a Class & Exam Type
app.get("/marks/:className/:exam_type", (req, res) => {
    const { className, exam_type } = req.params;
    const sql = "SELECT * FROM marks WHERE class = ? AND exam_type = ?";

    db.query(sql, [className, exam_type], (err, results) => {
        if (err) {
            console.error("❌ Error fetching marks:", err);
            res.status(500).json({ error: "Failed to fetch marks" });
            return;
        }
        res.status(200).json(results);
    });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
