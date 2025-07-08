// farmer.js

// 1. Get references to HTML elements
const farmerForm = document.querySelector('form');
const farmerNameInput = document.getElementById('farmer-name');
const farmerAgeInput = document.getElementById('farmer-age');
const farmerTelInput = document.getElementById('farmer-tel');
const farmerAddressInput = document.getElementById('farmer-address');
const displayFarmersDiv = document.getElementById('display-farmers');

// Array to hold farmer data
let farmers = [];

// --- Helper Functions ---

// Function to save farmers array to localStorage
function saveFarmers() {
    localStorage.setItem('farmers', JSON.stringify(farmers));
}

// Function to load farmers array from localStorage
function loadFarmers() {
    const storedFarmers = localStorage.getItem('farmers');
    if (storedFarmers) {
        farmers = JSON.parse(storedFarmers);
    }
}

// Function to render all farmers to the display area
function renderFarmers() {
    displayFarmersDiv.innerHTML = ''; // Clear existing display

    if (farmers.length === 0) {
        displayFarmersDiv.innerHTML = '<p>No farmer records added yet.</p>';
        return;
    }

    // Create a table to display farmers
    const table = document.createElement('table');
    table.classList.add('farmers-table'); // Add a class for potential styling

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    farmers.forEach((farmer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${farmer.name}</td>
            <td>${farmer.age}</td>
            <td>${farmer.tel}</td>
            <td>${farmer.address}</td>
            <td>
                <button onclick="deleteFarmer(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    displayFarmersDiv.appendChild(table);
}

// --- Main Functions ---

// Function to add a new farmer
function addFarmer() {
    const name = farmerNameInput.value.trim();
    const age = parseInt(farmerAgeInput.value, 10);
    const tel = farmerTelInput.value.trim();
    const address = farmerAddressInput.value.trim();

    // Basic validation
    if (!name || isNaN(age) || age <= 0 || !tel || !address) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Basic phone number validation (Uganda specific pattern or general)
    // For Uganda, typical mobile numbers start with 07 or +2567
    const ugandaPhoneRegex = /^(07|\+2567)\d{8}$/;
    if (!ugandaPhoneRegex.test(tel)) {
        alert('Please enter a valid Ugandan phone number (e.g., 07XXXXXXXX or +2567XXXXXXXX).');
        return;
    }

    const newFarmer = {
        name: name,
        age: age,
        tel: tel,
        address: address
    };

    farmers.push(newFarmer);
    saveFarmers();    // Save to localStorage
    renderFarmers();   // Update the display

    // Clear the form fields
    farmerForm.reset();
}

// Function to delete a farmer
function deleteFarmer(index) {
    if (confirm(`Are you sure you want to delete ${farmers[index].name}'s record?`)) {
        farmers.splice(index, 1); // Remove the farmer at the given index
        saveFarmers();             // Save updated array to localStorage
        renderFarmers();          // Update the display
    }
}

// --- Initial Load ---

// Load existing farmers and render them when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFarmers();
    renderFarmers();
});