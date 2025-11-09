// Activity 9: Contact Form Validation
// This file demonstrates form handling and validation techniques

console.log("=== Activity 9: Contact Form Validation ===");

// Part A: Form Access Demonstrations
console.log("\n=== FORM ACCESS DEMONSTRATIONS ===");

// Get form and elements
const contactForm = document.getElementById("contactForm");
const formElements = contactForm.elements;

console.log("Contact form:", contactForm);
console.log("Form elements collection:", formElements);
console.log("Form elements count:", formElements.length);

// Demonstrate different access methods
console.log("\nDifferent ways to access form elements:");
console.log("By ID:", document.getElementById("name"));
console.log("By name (form.elements):", formElements["name"]);
console.log("By index:", formElements[0]);

// Log all form elements
console.log("\nAll form elements:");
for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    console.log(
        `${i}: ${element.tagName} - name: "${element.name}", type: "${element.type}"`
    );
}

// Part B: Form Event Handling and Validation State
console.log("\n=== FORM EVENT HANDLING ===");

// Application state for validation
const validationState = {
    name: false,
    email: false,
    subject: false,
    message: false,
};

// Validation pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Part C: Input Validation Functions
function validateName(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return { isValid: false, message: "Name is required." };
    }

    console.log("Validating name: ✓ Valid");
    return { isValid: true, message: "" };
}

function validateEmail(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return { isValid: false, message: "Email address is required." };
    }

    if (!emailPattern.test(trimmedValue)) {
        return { isValid: false, message: "Please enter a valid email address." };
    }

    console.log("Validating email: ✓ Valid");
    return { isValid: true, message: "" };
}

function validateSubject(value) {
    if (value === "") {
        return { isValid: false, message: "Please select a subject." };
    }

    console.log("Validating subject: ✓ Valid");
    return { isValid: true, message: "" };
}

function validateMessage(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return { isValid: false, message: "Message is required." };
    }

    if (trimmedValue.length < 10) {
        return {
            isValid: false,
            message: "Message must be at least 10 characters long.",
        };
    }

    console.log("Validating message: ✓ Valid");
    return { isValid: true, message: "" };
}

// Part D: Real-time Validation Feedback
function showValidationMessage(fieldName, validation) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    // Clear previous state
    errorElement.classList.remove("show");
    inputElement.classList.remove("valid", "invalid");

    if (!validation.isValid && validation.message) {
        errorElement.textContent = validation.message;
        errorElement.classList.add("show");
        inputElement.classList.add("invalid");
    } else if (validation.isValid) {
        inputElement.classList.add("valid");
    }
}

function validateField(fieldName, value) {
    let validation;

    switch (fieldName) {
        case "name":
            validation = validateName(value);
            break;
        case "email":
            validation = validateEmail(value);
            break;
        case "subject":
            validation = validateSubject(value);
            break;
        case "message":
            validation = validateMessage(value);
            break;
        default:
            console.warn(`Unknown field: ${fieldName}`);
            return false;
    }

    validationState[fieldName] = validation.isValid;
    showValidationMessage(fieldName, validation);
    updateSubmitButton();

    return validation.isValid;
}

function updateSubmitButton() {
    const submitBtn = document.getElementById("submitBtn");
    const isFormValid = Object.values(validationState).every((v) => v);
    submitBtn.disabled = !isFormValid;

    console.log("Form validation state:", validationState);
    console.log("Form is valid:", isFormValid);
}

// Event listeners for real-time validation
function setupValidationListeners() {
    console.log("Setting up validation event listeners...");

    // Text inputs and textarea
    ["name", "email", "message"].forEach((fieldName) => {
        const element = document.getElementById(fieldName);

        element.addEventListener("input", (e) => {
            validateField(fieldName, e.target.value);
        });

        element.addEventListener("blur", (e) => {
            validateField(fieldName, e.target.value);
        });
    });

    // Subject dropdown
    document.getElementById("subject").addEventListener("change", (e) => {
        validateField("subject", e.target.value);
    });
}

// Part E: Form Submission Handling
function handleFormSubmit(e) {
    e.preventDefault();
    console.log("\n=== FORM SUBMISSION ATTEMPT ===");

    // Hide previous status messages
    document.getElementById("formSuccess").classList.add("hidden");
    document.getElementById("formError").classList.add("hidden");

    // Validate all fields
    const formData = new FormData(contactForm);
    const isFormValid = validateAllFields(formData);

    if (isFormValid) {
        console.log("✓ Form validation successful!");
        console.log("Form data:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        showFormSuccess();
        setTimeout(resetForm, 2000);
    } else {
        console.log("✗ Form validation failed!");
        showFormError("Please fix the errors above and try again.");
    }
}

function validateAllFields(formData) {
    console.log("Validating all fields before submission...");

    const fields = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        subject: formData.get("subject") || "",
        message: formData.get("message") || "",
    };

    let isValid = true;
    Object.entries(fields).forEach(([field, value]) => {
        if (!validateField(field, value)) isValid = false;
    });

    return isValid;
}

function showFormSuccess() {
    const successElement = document.getElementById("formSuccess");
    successElement.classList.remove("hidden");
}

function showFormError(message) {
    const errorElement = document.getElementById("formError");
    const errorMessage = document.getElementById("formErrorMessage");
    errorMessage.textContent = message;
    errorElement.classList.remove("hidden");
}

function resetForm() {
    console.log("Resetting form...");
    contactForm.reset();

    Object.keys(validationState).forEach((key) => (validationState[key] = false));

    document.querySelectorAll(".error-message").forEach((el) =>
        el.classList.remove("show")
    );

    document
        .querySelectorAll("input, select, textarea")
        .forEach((el) => el.classList.remove("valid", "invalid"));

    document.getElementById("formSuccess").classList.add("hidden");
    document.getElementById("formError").classList.add("hidden");

    updateSubmitButton();
}

// Initialize application
function initializeApp() {
    console.log("Initializing Contact Form Validation application...");

    contactForm.addEventListener("submit", handleFormSubmit);
    document.getElementById("resetBtn").addEventListener("click", resetForm);

    setupValidationListeners();
    updateSubmitButton();

    console.log("Contact Form Validation application initialized successfully!");
}

// Start the application
initializeApp();

// Display demo content
document.getElementById("output").innerHTML = `
  <h3>Contact Form Validation Features</h3>
  <p>✔ Real-time validation as you type</p>
  <p>✔ Email format validation using regex</p>
  <p>✔ Form submission handling with preventDefault()</p>
  <p>✔ Success and error message display</p>
  <p>✔ Visual feedback for valid and invalid states</p>
  <p>Check the console for detailed form handling demonstrations!</p>
`;
