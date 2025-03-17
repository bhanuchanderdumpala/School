document.addEventListener("DOMContentLoaded", function () {
    console.log("Students.js loaded");

    function fetchStudents(className) {
        fetch(`http://localhost:3000/students?class=${className}`)
            .then(response => response.json())
            .then(data => displayStudents(data))
            .catch(error => console.error("Error fetching students:", error));
    }

    function displayStudents(students) {
        const tableBody = document.querySelector("#students-table tbody");
        tableBody.innerHTML = ""; // Clear previous data

        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.admission_no}</td>
                <td>${student.name}</td>
                <td>${student.father_name}</td>
                <td>${student.class}</td>
                <td>${student.mobile_number}</td>
                <td>${student.dob}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.fetchStudents = fetchStudents; // Expose function globally
});
