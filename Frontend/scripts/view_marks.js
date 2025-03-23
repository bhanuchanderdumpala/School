function fetchMarks() {
    const admissionNo = document.getElementById("admission_no").value;

    fetch(`http://localhost:3000/marks/${admissionNo}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#marks-table tbody");
            tableBody.innerHTML = "";

            data.forEach(mark => {
                const row = `<tr>
                    <td>${mark.exam_type}</td>
                    <td>${mark.subject}</td>
                    <td>${mark.marks_obtained}</td>
                    <td>${mark.max_marks}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching marks:", error));
}
