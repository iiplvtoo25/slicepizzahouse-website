// Pizza data from your specification
const pizzaMenu = [
    { 
        name: "Chicken Pepperoni Pizza", 
        prices: { personal: 18.90, regular: 21.50, large: 25.80 },
        description: "Tender chicken with classic pepperoni on our signature tomato sauce"
    },
    { 
        name: "Cheese Lava Pizza", 
        prices: { personal: 19.90, regular: 23.40, large: 28.90 },
        description: "Mozzarella cheese overload with a creamy molten cheese center"
    },
    { 
        name: "Beef Pepperoni Pizza", 
        prices: { personal: 19.70, regular: 22.50, large: 27.90 },
        description: "Premium beef pepperoni with a blend of Italian herbs"
    },
    { 
        name: "Veggie Garden Pizza", 
        prices: { personal: 16.60, regular: 18.90, large: 20.30 },
        description: "Fresh bell peppers, mushrooms, onions, olives, and tomatoes"
    },
    { 
        name: "Smoky Beef Mushroom", 
        prices: { personal: 22.50, regular: 25.90, large: 28.90 },
        description: "Smoked beef strips with fresh mushrooms and special smoky sauce"
    }
];

// Drinks data from your specification
const drinksMenu = [
    { 
        name: "Lemonade", 
        price: 5.20,
        description: "Freshly squeezed lemonade with mint"
    },
    { 
        name: "Strawberry Soda", 
        price: 6.50,
        description: "Sparkling soda with natural strawberry flavor"
    },
    { 
        name: "Peach Tea", 
        price: 6.00,
        description: "Iced tea infused with peach essence"
    },
    { 
        name: "Chocolate", 
        price: 7.00,
        description: "Rich Belgian chocolate milkshake"
    },
    { 
        name: "Sparkling Water", 
        price: 3.00,
        description: "Premium sparkling mineral water"
    }
];

// DOM elements
const pizzaContainer = document.getElementById('pizza-container');
const drinksContainer = document.getElementById('drinks-container');
const orderModal = document.getElementById('orderModal');
const orderOnlineBtn = document.getElementById('orderOnlineBtn');
const footerOrderBtn = document.getElementById('footerOrderBtn');
const closeModal = document.querySelector('.close-modal');
const orderForm = document.getElementById('orderForm');
const orderItemSelect = document.getElementById('orderItem');
const sizeGroup = document.getElementById('sizeGroup');

// Generate pizza menu items
function generatePizzaMenu() {
    if (!pizzaContainer) return;
    
    pizzaMenu.forEach(pizza => {
        const pizzaElement = document.createElement('div');
        pizzaElement.className = 'menu-item';
        pizzaElement.innerHTML = `
            <div class="menu-item-header">
                <h3 class="menu-item-name">${pizza.name}</h3>
            </div>
            <p style="color: var(--text-light); margin-bottom: 15px; font-size: 14px;">${pizza.description}</p>
            <div class="menu-item-prices">
                <div class="price-tag">
                    <span class="size-label">Personal:</span> $${pizza.prices.personal}
                </div>
                <div class="price-tag">
                    <span class="size-label">Regular:</span> $${pizza.prices.regular}
                </div>
                <div class="price-tag">
                    <span class="size-label">Large:</span> $${pizza.prices.large}
                </div>
            </div>
            <button class="order-btn" data-item="${pizza.name}" data-type="pizza">Add to Order</button>
        `;
        pizzaContainer.appendChild(pizzaElement);
        
        // Add to order select dropdown
        if (orderItemSelect) {
            const option = document.createElement('option');
            option.value = pizza.name;
            option.textContent = pizza.name + " (Pizza)";
            orderItemSelect.appendChild(option);
        }
    });
}

// Generate drinks menu items
function generateDrinksMenu() {
    if (!drinksContainer) return;
    
    drinksMenu.forEach(drink => {
        const drinkElement = document.createElement('div');
        drinkElement.className = 'menu-item';
        drinkElement.innerHTML = `
            <div class="menu-item-header">
                <h3 class="menu-item-name">${drink.name}</h3>
            </div>
            <p style="color: var(--text-light); margin-bottom: 15px; font-size: 14px;">${drink.description}</p>
            <div class="menu-item-prices">
                <div class="price-tag" style="background-color: #e8f4f8; color: #2a6b8a;">
                    <span class="size-label">Medium:</span> $${drink.price}
                </div>
            </div>
            <button class="order-btn" data-item="${drink.name}" data-type="drink">Add to Order</button>
        `;
        drinksContainer.appendChild(drinkElement);
        
        // Add to order select dropdown
        if (orderItemSelect) {
            const option = document.createElement('option');
            option.value = drink.name;
            option.textContent = drink.name + " (Drink)";
            orderItemSelect.appendChild(option);
        }
    });
}

// Modal functionality
function setupModal() {
    if (!orderOnlineBtn || !orderModal) return;
    
    orderOnlineBtn.addEventListener('click', () => {
        orderModal.style.display = 'flex';
    });
    
    if (footerOrderBtn) {
        footerOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            orderModal.style.display = 'flex';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            orderModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
        }
    });
}

// Order button click handlers
function setupOrderButtons() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('order-btn')) {
            const itemName = e.target.getAttribute('data-item');
            const itemType = e.target.getAttribute('data-type');
            
            // Set the selected item in the order form
            if (orderItemSelect) {
                orderItemSelect.value = itemName;
            }
            
            // Show/hide size selection based on item type
            if (sizeGroup) {
                sizeGroup.style.display = itemType === 'pizza' ? 'block' : 'none';
            }
            
            // Show the modal
            if (orderModal) {
                orderModal.style.display = 'flex';
            }
        }
    });
}

// Handle item selection change to show/hide size
function setupItemSelection() {
    if (!orderItemSelect || !sizeGroup) return;
    
    orderItemSelect.addEventListener('change', function() {
        const selectedText = this.options[this.selectedIndex].text;
        const isPizza = selectedText.includes('(Pizza)');
        sizeGroup.style.display = isPizza ? 'block' : 'none';
    });
}

// Form submission
function setupOrderForm() {
    if (!orderForm) return;
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const item = document.getElementById('orderItem')?.value;
        const size = document.getElementById('orderSize')?.value || 'medium';
        const quantity = document.getElementById('quantity')?.value || 1;
        const name = document.getElementById('name')?.value;
        const phone = document.getElementById('phone')?.value;
        const address = document.getElementById('address')?.value;
        
        if (!item || !name || !phone || !address) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Calculate price
        let price = 0;
        let priceText = "";
        
        if (item.includes("Pizza")) {
            // Find the pizza
            const pizza = pizzaMenu.find(p => p.name === item);
            if (pizza) {
                price = pizza.prices[size] * quantity;
                priceText = `$${pizza.prices[size].toFixed(2)} each`;
            }
        } else {
            // Find the drink
            const drink = drinksMenu.find(d => d.name === item);
            if (drink) {
                price = drink.price * quantity;
                priceText = `$${drink.price.toFixed(2)} each`;
            }
        }
        
        // In a real application, this would send data to a server
        alert(`Thank you for your order, ${name}!\n\nYour order: ${quantity}x ${item}${size !== 'medium' ? ` (${size})` : ''}\nPrice: ${priceText}\nTotal: $${price.toFixed(2)}\nWill be delivered to: ${address}\nWe'll contact you at ${phone} for confirmation.`);
        
        // Reset form and close modal
        orderForm.reset();
        if (orderModal) {
            orderModal.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a, .footer-links a, .hero-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Update active nav link on scroll
function setupActiveNavOnScroll() {
    // Only needed for single-page sections
    // For multi-page, active class is set in HTML
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize the website
function initWebsite() {
    generatePizzaMenu();
    generateDrinksMenu();
    setupModal();
    setupOrderButtons();
    setupItemSelection();
    setupOrderForm();
    setupSmoothScrolling();
    setupActiveNavOnScroll();
    setActiveNavLink();
}

