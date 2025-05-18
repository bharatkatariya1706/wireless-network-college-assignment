document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('reg-form');

    // Form field elements
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Real-time validation for name
    fullNameInput.addEventListener('input', function () {
        if (!nameRegex.test(this.value.trim())) {
            nameError.textContent = 'Name should contain only letters and spaces (2-50 characters)';
        } else {
            nameError.textContent = '';
        }
    });

    // Real-time validation for email
    emailInput.addEventListener('input', function () {
        if (!emailRegex.test(this.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });

    // Real-time validation for phone
    phoneInput.addEventListener('input', function () {
        if (!phoneRegex.test(this.value.trim())) {
            phoneError.textContent = 'Phone number should be 10 digits';
        } else {
            phoneError.textContent = '';
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener('input', function () {
        if (!passwordRegex.test(this.value)) {
            passwordError.textContent = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
        } else {
            passwordError.textContent = '';
        }

        // Check if confirm password matches
        if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else if (confirmPasswordInput.value) {
            confirmPasswordError.textContent = '';
        }
    });

    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.textContent = '';
        }
    });

    // Form submission
    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        // Validate name
        if (!nameRegex.test(fullNameInput.value.trim())) {
            nameError.textContent = 'Name should contain only letters and spaces (2-50 characters)';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate email
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate phone
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Phone number should be 10 digits';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Validate password
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Validate confirm password
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }

        // If all validations pass
        if (isValid) {
            alert('Registration successful!');
            regForm.reset();
        }
    });
});