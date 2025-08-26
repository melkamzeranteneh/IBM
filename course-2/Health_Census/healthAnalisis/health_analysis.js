// Health Analysis JS
// - Adds patients with minimal validation and renders a summary report
// - Provides searchable conditions from health_analysis.json
// - Removes duplicate functions and improves readability

const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

/** Add a patient row to in-memory list and refresh report */
function addPatient() {
  const name = document.getElementById("name").value.trim();
  const genderEl = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

  if (!(name && genderEl && age && condition)) {
    alert('Please complete all fields to add a patient.');
    return;
  }

  patients.push({ name: name, gender: genderEl.value, age: Number(age), condition: condition });
      resetForm();
      generateReport();
    }

/** Reset the data entry form */
  function resetForm() {
    document.getElementById("name").value = "";
  const checked = document.querySelector('input[name="gender"]:checked');
  if (checked) checked.checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }

/** Generate an aggregated report */
  function generateReport() {
    const numPatients = patients.length;
  const conditionsCount = { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 };
    const genderConditionsCount = {
    Male: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
    Female: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 }
    };

    for (const patient of patients) {
    if (conditionsCount[patient.condition] !== undefined) {
      conditionsCount[patient.condition]++;
    }
    if (genderConditionsCount[patient.gender] && genderConditionsCount[patient.gender][patient.condition] !== undefined) {
      genderConditionsCount[patient.gender][patient.condition]++;
    }
  }

  // Render report as simple definition-like list
  let html = `Number of patients: ${numPatients}<br><br>`;
  html += `Conditions Breakdown:<br>`;
  for (const key in conditionsCount) {
    html += `${key}: ${conditionsCount[key]}<br>`;
  }
  html += `<br>Gender-Based Conditions:<br>`;
  for (const g in genderConditionsCount) {
    html += `${g}:<br>`;
    for (const k in genderConditionsCount[g]) {
      html += `&nbsp;&nbsp;${k}: ${genderConditionsCount[g][k]}<br>`;
    }
  }
  report.innerHTML = html;
}

/** Fetch condition details and render to the results panel */
function searchCondition() {
  const input = document.getElementById('conditionInput').value.trim().toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
  if (!input) {
    resultDiv.textContent = 'Please enter a condition to search.';
    return;
  }
        fetch('health_analysis.json')
          .then(response => response.json())
          .then(data => {
      const condition = (data.conditions || []).find(function(item){ return (item.name || '').toLowerCase() === input; });
            if (condition) {
        const symptoms = (condition.symptoms || []).join(', ');
        const prevention = (condition.prevention || []).join(', ');
        const treatment = condition.treatment || '';
              resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        if (condition.imagesrc) {
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="${condition.name}">`;
        }
              resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
              resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
              resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
        resultDiv.textContent = 'Condition not found.';
            }
          })
    .catch(function(error){
            console.error('Error:', error);
      resultDiv.textContent = 'An error occurred while fetching data.';
    });
}

// Wiring
if (addPatientButton) addPatientButton.addEventListener("click", addPatient);
if (btnSearch) btnSearch.addEventListener('click', searchCondition);