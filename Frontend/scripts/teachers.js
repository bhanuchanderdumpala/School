function fetchTeachers() {
    fetch('http://localhost:3000/teachers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#teachersTable tbody");
            tableBody.innerHTML = "";
            data.forEach(teacher => {
                const row = `<tr>
                    <td>${teacher.name}</td>
                    <td>${teacher.subject}</td>
                    <td>${teacher.class_assigned}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching teachers:", error));
}
