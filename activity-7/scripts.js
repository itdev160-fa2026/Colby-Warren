// Activity 7: Product Catalog Display
// This file demonstrates arrays, objects, and data manipulation

console.log("=== Activity 7: Product Catalog Display ===");

// Part A: Array and Object Demonstrations
console.log("\n=== ARRAY DEMONSTRATIONS ===");

// Creating arrays
const numbersArray = [1, 2, 3, 4, 5];
const colorsArray = new Array('black', 'green', 'blue');
const mixedArray = [42, 'hello', true, null, { name: 'Larry' }];

console.log("Numbers array:", numbersArray);
console.log("Colors array:", colorsArray);
console.log("Mixed array:", mixedArray);

// Array methods demonstrations
console.log("\nArray Methods:");
const sports = ['basketball', 'football'];
console.log("Original sports:", sports);

sports.push('baseball');
console.log("After push('baseball'):", sports);

const removedSport = sports.pop();
console.log("After pop():", sports, "- removed:", removedSport);

sports.unshift('golf');
console.log("After unshift('golf'):", sports);

const firstSport = sports.shift();
console.log("After shift():", sports, "- removed:", firstSport);

// Array iteration examples
console.log("\nArray Iteration Methods:");
const numbers = [1, 2, 3, 4, 5];

console.log("For loop:");
for (let i = 0; i < numbers.length; i++) {
    console.log(`Index ${i}: ${numbers[i]}`);
}

console.log("For...of loop:");
for (const number of numbers) {
    console.log(`Value: ${number}`);
}

console.log("forEach method:");
numbers.forEach((number, index) => {
    console.log(`forEach - Index ${index}: ${number}`);
});

console.log("map method (double values):");
const doubled = numbers.map(number => number * 2);
console.log("Doubled:", doubled);

console.log("filter method (even numbers only):");
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Object demonstrations
console.log("\n=== OBJECT DEMONSTRATIONS ===");

// Creating objects
const athlete = {
    firstName: 'Giannis',
    lastName: 'Antetokounmpo',
    sport: 'Basketball',
    age: 30,
    active: true
};

console.log("Athlete object:", athlete);

// Property access
console.log("Dot notation - sport:", athlete.sport);
console.log("Bracket notation - lastName:", athlete['lastName']);

const key = 'age';
console.log(`Dynamic access (${key}):`, athlete[key]);

// Modify properties
athlete.position = 'Small Foward';
athlete.age = 28;

console.log("After adding/modifying properties:", athlete);

// Delete properties
delete athlete.position;
console.log("After deleting position:", athlete);

// Part B: Product Data Structure
console.log("\n=== PRODUCT DATA STRUCTURE (SPORTS EDITION) ===");

const products = [
    {
        id: 1,
        name: "Official Game Basketball",
        description: "Indoor/outdoor composite leather basketball used in professional play.",
        price: 39.99,
        category: "basketball",
        image: "images/pexels-cottonbro-7201554.jpg"
    },
    {
        id: 2,
        name: "Football Helmet",
        description: "High-impact football helmet with protective layer for game and practice use.",
        price: 784.99,
        category: "football",
        image: "images/pexels-lucasandrade-2862718.jpg"
    },
    {
        id: 3,
        name: "Aluminum Baseball Bat",
        description: "Lightweight alloy bat for balanced swing and durability.",
        price: 109.99,
        category: "baseball",
        image: "images/pexels-lksm-1234953.jpg"
    },
    {
        id: 4,
        name: "Golf Glove",
        description: "Comfort-fit grip glove improving swing control.",
        price: 24.99,
        category: "golf",
        image: "images/pexels-ah360-1409004.jpg"
    },
    {
        id: 5,
        name: "Football Cleats",
        description: "Traction-designed cleats for cutting and quick movement.",
        price: 264.99,
        category: "football",
        image: "images/pexels-izonin-19882423.jpg"
    }
];


console.log(`Loaded ${products.length} products:`, products);

// Demonstrate array methods with products
console.log("\nProduct data manipulation examples:");

const basketballProducts = products.filter(product => product.category === 'basketball');
console.log("Basketball products:", basketballProducts);

const footballProducts = products.filter(product => product.category === 'football');
console.log(`Football products: ${footballProducts.length} found`);

const productNames = products.map(product => product.name);
console.log("Product names:", productNames);

const budgetItems = products.filter(product => product.price < 50);
console.log("Products under $50:", budgetItems);

const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
console.log(`Average product price: $${averagePrice.toFixed(2)}`);

// Part C: Product Display Functions
console.log("\n=== PRODUCT DISPLAY FUNCTIONS ===");

let appState = {
    displayedProducts: [...products],
    filters: { search: '', category: 'all' }
};

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <span class="product-category">${product.category}</span>
        </div>
    `;

    return card;
}


function displayProducts(productsToShow) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = `<h3>No products found</h3>`;
        return;
    }

    productsToShow.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    updateResultsCount(productsToShow.length);
}

// Update results count
function updateResultsCount(count) {
    const total = products.length;
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = (count === total)
        ? `Showing all ${total} products`
        : `Showing ${count} of ${total} products`;
}

// Part D: Search and Filter
function searchProducts(term) {
    return products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );
}

function filterByCategory(products, category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function applyFilters() {
    let filtered = searchProducts(appState.filters.search);
    filtered = filterByCategory(filtered, appState.filters.category);
    appState.displayedProducts = filtered;
    displayProducts(filtered);
}

// Event listeners
function initializeApp() {
    document.getElementById('searchInput').addEventListener('input', e => {
        appState.filters.search = e.target.value;
        applyFilters();
    });

    document.getElementById('categoryFilter').addEventListener('change', e => {
        appState.filters.category = e.target.value;
        applyFilters();
    });

    document.getElementById('clearFiltersBtn').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        appState.filters = { search: '', category: 'all' };
        applyFilters();
    });

    displayProducts(products);
}

initializeApp();

document.getElementById("output").innerHTML = `
    <h3>Sports Catalog Features</h3>
    <p>✅ Arrays & objects demonstrated in console</p>
    <p>✅ Dynamic catalog display</p>
    <p>✅ Search & filter functions</p>
    <p>✅ 5 sports products across 4 categories</p>
`;
