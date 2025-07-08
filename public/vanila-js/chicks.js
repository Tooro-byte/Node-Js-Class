// script.js

const chickRequestForm = document.getElementById('chickRequestForm');
const numChicksInput = document.getElementById('num_chicks');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');

const PRICE_PER_CHICK = 550;

function isEmpty(value) {
    return value.trim() === '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidTelephone(tel) {
    const telRegex = /^\+?[0-9\s-]+$/;
    return telRegex.test(tel) && tel.length >= 7;
}

function isNumberInRange(num, min, max) {
    return num >= min && num <= max;
}

function calculateAndDisplayPrice() {
    const numChicksValue = parseInt(numChicksInput.value, 10);

    if (!isNaN(numChicksValue) && isNumberInRange(numChicksValue, 300, 500)) {
        const totalPrice = numChicksValue * PRICE_PER_CHICK;
        const formattedPrice = new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX'
        }).format(totalPrice);
        totalPriceDisplay.textContent = `Total Price: ${formattedPrice}`;
        totalPriceDisplay.style.color = '';
    } else {
        totalPriceDisplay.textContent = 'Enter a number between 300 and 500.';
        totalPriceDisplay.style.color = 'red';
    }
}

numChicksInput.addEventListener('input', calculateAndDisplayPrice);

document.addEventListener('DOMContentLoaded', calculateAndDisplayPrice);

chickRequestForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const telephone = document.getElementById('telephone').value;
    const numChicks = parseInt(numChicksInput.value, 10);
    const ninNumber = document.getElementById('nin_number').value;
    const requestDate = document.getElementById('request_date').value;
    const comments = document.getElementById('comments').value;

    let isValid = true;
    let errorMessage = '';

    if (isEmpty(name)) {
        isValid = false;
        errorMessage += 'Full Name is required.\n';
    }

    if (isEmpty(email)) {
        isValid = false;
        errorMessage += 'Email Address is required.\n';
    } else if (!isValidEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid Email Address.\n';
    }

    if (isEmpty(address)) {
        isValid = false;
        errorMessage += 'Address is required.\n';
    }

    if (isEmpty(telephone)) {
        isValid = false;
        errorMessage += 'Telephone Number is required.\n';
    } else if (!isValidTelephone(telephone)) {
        isValid = false;
        errorMessage += 'Please enter a valid Telephone Number (e.g., +25677... or 070...).\n';
    }

    if (isNaN(numChicks) || !isNumberInRange(numChicks, 300, 500)) {
        isValid = false;
        errorMessage += 'Number of Chicks must be between 300 and 500.\n';
        totalPriceDisplay.textContent = 'Invalid number of chicks for calculation.';
        totalPriceDisplay.style.color = 'red';
    } else {
        calculateAndDisplayPrice();
        totalPriceDisplay.style.color = '';
    }

    if (isEmpty(ninNumber)) {
        isValid = false;
        errorMessage += 'NIN Number is required.\n';
    }

    if (isEmpty(requestDate)) {
        isValid = false;
        errorMessage += 'Preferred Date is required.\n';
    } else {
        const selectedDate = new Date(requestDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            isValid = false;
            errorMessage += 'Preferred Date cannot be in the past.\n';
        }
    }

    if (isValid) {
        alert('Form submitted successfully!\nCheck the console for data.');

        const formData = {
            fullName: name,
            emailAddress: email,
            address: address,
            telephoneNumber: telephone,
            numberOfChicks: numChicks,
            ninNumber: ninNumber,
            preferredDate: requestDate,
            comments: comments,
            totalPrice: numChicks * PRICE_PER_CHICK
        };

        console.log('Form Data:', formData);

        chickRequestForm.reset();
        totalPriceDisplay.textContent = '';
        totalPriceDisplay.style.color = '';
    } else {
        alert('Please correct the following errors:\n\n' + errorMessage);
    }
});