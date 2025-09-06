console.log("=== Activity 2: Operators and Control Flow ===");

// Part A: Arithmetic Operators
console.log("\n=== ARITHMETIC OPERATORS ===");
let a = 15;
let b = 4;

console.log(`a = ${a}, b = ${b}`);
console.log(`Addition (a + b): ${a + b}`);
console.log(`Subtraction (a - b): ${a - b}`);
console.log(`Multiplication (a * b): ${a * b}`);
console.log(`Division (a / b): ${a / b}`);
console.log(`Modulus (a % b): ${a % b}`);

// Operator precedence example
console.log("\nOperator Precedence:");
console.log(`2 + 3 * 4 = ${2 + 3 * 4} (multiplication first)`);
console.log(`(2 + 3) * 4 = ${(2 + 3) * 4} (parentheses first)`);

// Part B: Comparison Operators
console.log("\n=== COMPARISON OPERATORS ===");
let x = 5;
let y = "5";
let z = 10;

console.log(`x = ${x} (number), y = "${y}" (string), z = ${z}`);
console.log(`x == y: ${x == y} (loose equality)`);
console.log(`x === y: ${x === y} (strict equality)`);
console.log(`x != y: ${x != y} (loose inequality)`);
console.log(`x !== y: ${x !== y} (strict inequality)`);
console.log(`x > z: ${x > z}`);
console.log(`x < z: ${x < z}`);
console.log(`x >= 5: ${x >= 5}`);
console.log(`x <= 5: ${x <= 5}`);

// Part C: Logical Operators
console.log("\n=== LOGICAL OPERATORS ===");
let isAdult = true;
let hasLicense = false;
let age = 20;

console.log(`isAdult = ${isAdult}, hasLicense = ${hasLicense}, age = ${age}`);
console.log(
  `isAdult && hasLicense: ${isAdult && hasLicense} (AND - both must be true)`
);
console.log(
  `isAdult || hasLicense: ${
    isAdult || hasLicense
  } (OR - at least one must be true)`
);
console.log(`!hasLicense: ${!hasLicense} (NOT - opposite of hasLicense)`);
console.log(
  `age >= 18 && age < 65: ${age >= 18 && age < 65} (compound condition)`
);

// Part D: Conditional Statements
console.log("\n=== CONDITIONAL STATEMENTS ===");
let score = 85;

console.log(`Score: ${score}`);
if (score >= 90) {
  console.log("Grade: A - Excellent!");
} else if (score >= 80) {
  console.log("Grade: B - Good job!");
} else if (score >= 70) {
  console.log("Grade: C - Satisfactory");
} else if (score >= 60) {
  console.log("Grade: D - Needs improvement");
} else {
  console.log("Grade: F - Please study more");
}

// Part E: Switch Statement
console.log("\n=== SWITCH STATEMENT ===");
let dayOfWeek = 3; // 0 = Sunday, 1 = Monday, etc.

console.log(`Day number: ${dayOfWeek}`);
switch (dayOfWeek) {
  case 0:
    console.log("Today is Sunday - Weekend!");
    break;
  case 1:
    console.log("Today is Monday - Start of work week");
    break;
  case 2:
    console.log("Today is Tuesday");
    break;
  case 3:
    console.log("Today is Wednesday - Hump day!");
    break;
  case 4:
    console.log("Today is Thursday");
    break;
  case 5:
    console.log("Today is Friday - TGIF!");
    break;
  case 6:
    console.log("Today is Saturday - Weekend!");
    break;
  default:
    console.log("Invalid day number");
}

// Part F: Age Checker Application
console.log("\n=== AGE CHECKER APPLICATION ===");

// Function to check age and display result
function checkAge() {
  // Get the input value
  const ageInput = document.getElementById("ageInput");
  const resultDiv = document.getElementById("result");
  const inputValue = ageInput.value.trim();

  console.log(`User input: "${inputValue}"`);

  // Clear previous styling
  resultDiv.className = "";

  // Check if input is empty
  if (inputValue === "") {
    resultDiv.textContent = "Please enter your age";
    resultDiv.className = "invalid";
    console.log("Result: Empty input");
    return;
  }

  // Convert to number
  const age = Number(inputValue);

  // Check if input is a valid number
  if (isNaN(age)) {
    resultDiv.textContent = "Invalid age - please enter a number";
    resultDiv.className = "invalid";
    console.log("Result: Not a number");
    return;
  }

  // Check for realistic age range
  if (age < 0 || age > 150) {
    resultDiv.textContent =
      "Invalid age - please enter a realistic age (0-150)";
    resultDiv.className = "invalid";
    console.log("Result: Age out of range");
    return;
  }

  // Determine if adult or minor
  if (age >= 18) {
    resultDiv.textContent = `You are ${age} years old - You are an adult`;
    resultDiv.className = "adult";
    console.log(`Result: Adult (age: ${age})`);
  } else {
    resultDiv.textContent = `You are ${age} years old - You are a minor`;
    resultDiv.className = "minor";
    console.log(`Result: Minor (age: ${age})`);
  }
}

// Display a welcome message on the webpage
document.getElementById("output").innerHTML =
  "<h3>Check the console for operator demonstrations!</h3>";
