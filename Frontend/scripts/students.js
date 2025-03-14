// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Function to fetch students based on selected class
function fetchStudents(className) {
    fetch(`http://localhost:3000/students?class=${className}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#students-table tbody");
            tableBody.innerHTML = ""; // Clear previous data

            data.forEach(student => {
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
        })
        .catch(error => console.error("Error fetching students:", error));
}


// Function to open the Add Student form
function openAddStudentForm() {
    window.location.href = "add_student.html"; // Redirects to add student page
}
