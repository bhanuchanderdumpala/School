document.addEventListener("DOMContentLoaded", function () {
    console.log("Add_Student.js loaded");

    const form = document.getElementById("add-student-form");
    const submitButton = document.getElementById("add-student-btn");

    // Enable the button when all fields are filled
    form.addEventListener("input", function () {
        const isValid = [...form.elements].every(input => input.value.trim() !== "");
        submitButton.disabled = !isValid;
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
            form.reset();
            submitButton.disabled = true; // Disable button again
        })
        .catch(error => console.error("Error adding student:", error));
    });
});
