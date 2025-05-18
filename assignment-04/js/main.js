// Variables, Functions, Conditions, and Loops
document.addEventListener('DOMContentLoaded', function () {
    // Date and Time Display
    function updateDateTime() {
        const now = new Date();
        const dateTimeElement = document.getElementById('date-time');
        dateTimeElement.textContent = `Current Date & Time: ${now.toLocaleString()}`;
    }

    // Update date and time every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // BMI Calculator
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    calculateBmiBtn.addEventListener('click', function () {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
        const bmiResultElement = document.getElementById('bmi-result');

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height values.');
            return;
        }

        const bmi = weight / (height * height);
        let category;

        // Determine BMI category using if-else
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 25) {
            category = 'Normal weight';
        } else if (bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        bmiResultElement.innerHTML = `Your BMI: <strong>${bmi.toFixed(2)}</strong><br>Category: <strong>${category}</strong>`;
    });

    // Temperature Converter
    const convertTempBtn = document.getElementById('convert-temp');
    convertTempBtn.addEventListener('click', function () {
        const celsius = parseFloat(document.getElementById('celsius').value);
        const tempResultElement = document.getElementById('temp-result');

        if (isNaN(celsius)) {
            alert('Please enter a valid temperature in Celsius.');
            return;
        }

        const fahrenheit = (celsius * 9 / 5) + 32;
        tempResultElement.innerHTML = `${celsius}°C = <strong>${fahrenheit.toFixed(2)}°F</strong>`;
    });

    // Random Number Generator using Math Object
    const generateRandomBtn = document.getElementById('generate-random');
    generateRandomBtn.addEventListener('click', function () {
        const min = parseInt(document.getElementById('min').value);
        const max = parseInt(document.getElementById('max').value);
        const randomResultElement = document.getElementById('random-result');

        if (isNaN(min) || isNaN(max) || min >= max) {
            alert('Please enter valid min and max values (min should be less than max).');
            return;
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomResultElement.innerHTML = `Random Number: <strong>${randomNumber}</strong>`;
    });

    // Dynamic User List
    const addUserBtn = document.getElementById('add-user');
    const userList = document.getElementById('user-list');

    addUserBtn.addEventListener('click', function () {
        const userName = document.getElementById('user-name').value.trim();
        const userEmail = document.getElementById('user-email').value.trim();

        if (userName === '' || userEmail === '') {
            alert('Please enter both name and email.');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${userName}</strong>
                <p>${userEmail}</p>
            </div>
            <button class="delete-btn">Delete</button>
        `;

        // Add delete functionality
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            // Show confirmation box before deleting
            if (confirm(`Are you sure you want to delete ${userName}?`)) {
                li.remove();
            }
        });

        userList.appendChild(li);

        // Clear input fields
        document.getElementById('user-name').value = '';
        document.getElementById('user-email').value = '';
    });

    // DOM Manipulation & Event Handling
    const changeableText = document.getElementById('changeable-text');
    const changeColorBtn = document.getElementById('change-color');
    const changeSizeBtn = document.getElementById('change-size');
    const changeTextBtn = document.getElementById('change-text');

    // Change color on button click
    changeColorBtn.addEventListener('click', function () {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        changeableText.style.color = randomColor;
    });

    // Change size on button click
    changeSizeBtn.addEventListener('click', function () {
        const currentSize = window.getComputedStyle(changeableText).fontSize;
        const newSize = parseInt(currentSize) + 2;
        changeableText.style.fontSize = `${newSize}px`;
    });

    // Change text on button click
    changeTextBtn.addEventListener('click', function () {
        const texts = [
            'JavaScript is awesome!',
            'DOM manipulation is fun!',
            'Event handling is powerful!',
            'Web development rocks!',
            'Learning JavaScript is exciting!'
        ];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        changeableText.textContent = randomText;
    });

    // Hover effects
    changeableText.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#3498db';
        this.style.color = 'white';
    });

    changeableText.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#f9f9f9';
        this.style.color = '#333';
    });
});