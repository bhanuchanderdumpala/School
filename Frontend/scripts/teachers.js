document.addEventListener("DOMContentLoaded", function () {
    console.log("Teachers.js loaded");

    function fetchTeachers() {
        fetch("http://localhost:3000/teachers")
            .then(response => response.json())
            .then(data => displayTeachers(data))
            .catch(error => console.error("Error fetching teachers:", error));
    }

    function displayTeachers(teachers) {
        const tableBody = document.querySelector("#teachersTable tbody");
        tableBody.innerHTML = ""; // Clear previous data

        teachers.forEach(teacher => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${teacher.name}</td>
                <td>${teacher.subject}</td>
                <td>${teacher.class_assigned}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.fetchTeachers = fetchTeachers; // Expose function globally
});
