// document.getElementById("add-student-form").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const studentData = {
//         admission_no: document.getElementById("admission_no").value,
//         name: document.getElementById("name").value,
//         father_name: document.getElementById("father_name").value,
//         class_name: document.getElementById("class").value,
//         mobile_number: document.getElementById("mobile_number").value,
//         dob: document.getElementById("dob").value
//     };

//     fetch("http://localhost:3000/students", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(studentData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message);
//         window.location.href = "students.html"; // Redirect back to students list
//     })
//     .catch(error => console.error("❌ Error:", error));
// });

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-student-form");
    const submitBtn = document.getElementById("add-student-btn");

    function validateForm() {
        const fields = [
            "admission_no",
            "name",
            "father_name",
            "class",
            "mobile_number",
            "dob"
        ];

        let allFilled = fields.every(field => document.getElementById(field).value.trim() !== "");
        
        if (allFilled) {
            submitBtn.disabled = false;
            submitBtn.classList.add("enabled");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove("enabled");
        }
    }

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", validateForm);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const studentData = {
            admission_no: document.getElementById("admission_no").value,
            name: document.getElementById("name").value,
            father_name: document.getElementById("father_name").value,
            class_name: document.getElementById("class").value,
            mobile_number: document.getElementById("mobile_number").value,
            dob: document.getElementById("dob").value
        };

        fetch("http://localhost:3000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = "students.html";
        })
        .catch(error => console.error("❌ Error:", error));
    });
});

function goBack() {
    window.history.back();
}

