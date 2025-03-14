CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admission_no VARCHAR(20),
    name VARCHAR(100),
    father_name VARCHAR(100),
    class VARCHAR(10),
    mobile VARCHAR(15),
    dob DATE
);

CREATE TABLE teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    dob DATE,
    subject VARCHAR(50),
    experience INT,
    assigned_class VARCHAR(10)
);

CREATE TABLE marks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    exam_type VARCHAR(20),
    telugu INT,
    hindi INT,
    english INT,
    maths INT,
    science INT,
    social INT,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
