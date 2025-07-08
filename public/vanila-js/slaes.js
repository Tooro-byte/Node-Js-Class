// sales.js

// 1. Get references to HTML elements
const salesRepRegistrationForm = document.getElementById('salesRepRegistrationForm');
const fullNameInput = document.getElementById('fullName');
const repEmailInput = document.getElementById('repEmail');
const repPhoneInput = document.getElementById('repPhone');
const repAddressInput = document.getElementById('repAddress');
const employeeIdInput = document.getElementById('employeeId');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const displaySalesRepsDiv = document.getElementById('displaySalesReps');

// Array to hold sales representative data
let salesReps = [];

// --- Helper Functions for Validation ---

function isEmpty(value) {
    return value.trim() === '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUgandanPhone(tel) {
    // Allows numbers starting with 07 or +2567, followed by 8 digits
    const ugandaPhoneRegex = /^(07|\+2567)\d{8}$/;
    return ugandaPhoneRegex.test(tel);
}

function isStrongPassword(password) {
    // Simple strength check: at least 8 characters, one uppercase, one lowercase, one number
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
}

// --- Local Storage Functions ---

function saveSalesReps() {
    localStorage.setItem('salesReps', JSON.stringify(salesReps));
}

function loadSalesReps() {
    const storedSalesReps = localStorage.getItem('salesReps');
    if (storedSalesReps) {
        salesReps = JSON.parse(storedSalesReps);
    }
}

// --- Rendering Function ---

function renderSalesReps() {
    displaySalesRepsDiv.innerHTML = ''; // Clear existing display

    if (salesReps.length === 0) {
        displaySalesRepsDiv.innerHTML = '<p>No sales representatives registered yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('sales-reps-table'); // Add a class for potential styling

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Employee ID</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    salesReps.forEach((rep, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rep.fullName}</td>
            <td>${rep.repEmail}</td>
            <td>${rep.repPhone}</td>
            <td>${rep.repAddress}</td>
            <td>${rep.employeeId}</td>
            <td>
                <button onclick="deleteSalesRep(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    displaySalesRepsDiv.appendChild(table);
}

// --- Main Form Submission Logic ---

salesRepRegistrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = fullNameInput.value.trim();
    const repEmail = repEmailInput.value.trim();
    const repPhone = repPhoneInput.value.trim();
    const repAddress = repAddressInput.value.trim();
    const employeeId = employeeIdInput.value.trim();
    const password = passwordInput.value; // Do not trim password
    const confirmPassword = confirmPasswordInput.value;

    let isValid = true;
    let errorMessage = '';

    // Full Name validation
    if (isEmpty(fullName)) {
        isValid = false;
        errorMessage += 'Full Name is required.\n';
    }

    // Email validation
    if (isEmpty(repEmail)) {
        isValid = false;
        errorMessage += 'Email Address is required.\n';
    } else if (!isValidEmail(repEmail)) {
        isValid = false;
        errorMessage += 'Please enter a valid Email Address.\n';
    }

    // Phone Number validation (using Ugandan specific regex)
    if (isEmpty(repPhone)) {
        isValid = false;
        errorMessage += 'Telephone Number is required.\n';
    } else if (!isValidUgandanPhone(repPhone)) {
        isValid = false;
        errorMessage += 'Please enter a valid Ugandan phone number (e.g., 07XXXXXXXX or +2567XXXXXXXX).\n';
    }

    // Address validation
    if (isEmpty(repAddress)) {
        isValid = false;
        errorMessage += 'Address is required.\n';
    }

    // Employee ID validation
    if (isEmpty(employeeId)) {
        isValid = false;
        errorMessage += 'Employee ID is required.\n';
    }
    // Optional: Add regex for Employee ID format, e.g., /^YC-REP-\d{3}$/ for YC-REP-001
    // else if (!/^YC-REP-\d{3}$/.test(employeeId)) {
    //     isValid = false;
    //     errorMessage += 'Employee ID must be in the format YC-REP-XXX (e.g., YC-REP-001).\n';
    // }

    // Password validation
    if (isEmpty(password)) {
        isValid = false;
        errorMessage += 'Password is required.\n';
    } else if (!isStrongPassword(password)) {
        isValid = false;
        errorMessage += 'Password must be at least 8 characters long and include uppercase, lowercase, and numbers.\n';
    }

    // Confirm Password validation
    if (isEmpty(confirmPassword)) {
        isValid = false;
        errorMessage += 'Confirm Password is required.\n';
    } else if (password !== confirmPassword) {
        isValid = false;
        errorMessage += 'Password and Confirm Password do not match.\n';
    }


    // If all client-side validations pass
    if (isValid) {
        const newSalesRep = {
            fullName: fullName,
            repEmail: repEmail,
            repPhone: repPhone,
            repAddress: repAddress,
            employeeId: employeeId,
            // IMPORTANT: In a real application, NEVER store plain passwords on the client-side (or server-side without hashing).
            // This is for demonstration purposes only. You would send the password to the server to be hashed.
            password: password // Storing for demonstration; real apps hash and store securely server-side.
        };

        salesReps.push(newSalesRep);
        saveSalesReps();   // Save to localStorage
        renderSalesReps(); // Update the display

        alert('Sales Representative Registered Successfully!');
        console.log('New Sales Representative:', newSalesRep);

        // Clear the form
        salesRepRegistrationForm.reset();
    } else {
        alert('Please correct the following errors:\n\n' + errorMessage);
    }
});

// --- Delete Function ---

function deleteSalesRep(index) {
    if (confirm(`Are you sure you want to delete ${salesReps[index].fullName}'s record?`)) {
        salesReps.splice(index, 1); // Remove the rep at the given index
        saveSalesReps();             // Save updated array to localStorage
        renderSalesReps();           // Update the display
    }
}

// --- Initial Load ---

// Load existing sales reps and render them when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSalesReps();
    renderSalesReps();
});