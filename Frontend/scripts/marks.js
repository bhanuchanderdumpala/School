document.getElementById("fetch-students").addEventListener("click", function() {
    const className = document.getElementById("class_select").value;

    fetch(`http://localhost:3000/students/${className}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#marks-table tbody");
            tableBody.innerHTML = "";
            
            data.forEach((student, index) => {
                const row = `<tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td><input type="number" id="telugu-${student.admission_no}" min="0" max="100"></td>
                    <td><input type="number" id="hindi-${student.admission_no}" min="0" max="100"></td>
                    <td><input type="number" id="english-${student.admission_no}" min="0" max="100"></td>
                    <td><input type="number" id="maths-${student.admission_no}" min="0" max="100"></td>
                    <td><input type="number" id="science-${student.admission_no}" min="0" max="100"></td>
                    <td><input type="number" id="social-${student.admission_no}" min="0" max="100"></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching students:", error));
});

document.getElementById("submit-marks").addEventListener("click", function() {
    const className = document.getElementById("class_select").value;
    const examType = document.getElementById("exam_type").value;

    const students = [];
    document.querySelectorAll("#marks-table tbody tr").forEach(row => {
        const admissionNo = row.cells[1].innerText;
        students.push({
            admission_no: admissionNo,
            subjects: [
                { name: "Telugu", marks: document.getElementById(`telugu-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 },
                { name: "Hindi", marks: document.getElementById(`hindi-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 },
                { name: "English", marks: document.getElementById(`english-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 },
                { name: "Maths", marks: document.getElementById(`maths-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 },
                { name: "Science", marks: document.getElementById(`science-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 },
                { name: "Social", marks: document.getElementById(`social-${admissionNo}`).value, max_marks: examType.includes("FA") ? 20 : 100 }
            ]
        });
    });

    fetch("http://localhost:3000/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_name: className, exam_type: examType, students })
    });
});
