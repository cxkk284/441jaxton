// Jatxon
// Define an empty array to store user information  
function init() {  
    var bodyClass = document.body.className;  
      
    // Hide all pages by default  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // Show the appropriate page based on the body class  
    if (bodyClass.includes('index-page')) {  
        showPage('createUserPage');  
    } else if (bodyClass.includes('login-page')) {  
        showPage('loginPage');  
    }  
}  
  
/**  
 * Display the page with the specified ID and hide all other pages  
 *  
 * @param {string} pageId - The ID of the page to be displayed  
 */  
function showPage(pageId) {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // Display the page with the specified ID  
    var page = document.getElementById(pageId);  
    if (page) {  
        page.style.display = 'block';  
    }  
}  
  
// Call the init function when the page loads  
window.onload = init;
  
function setItemWithExpiry(key, value, ttl) {  
    const now = new Date();  
    
    const item = {  
        value: value,  
        expiry: now.getTime() + ttl,  
    };  
    localStorage.setItem(key, JSON.stringify(item));  
}  


function getItemWithExpiry(key) {  
    const itemStr = localStorage.getItem(key);  
 
    if (!itemStr) {  
        return null;  
    }  
    const item = JSON.parse(itemStr);  
    const now = new Date();  
   
    if (now.getTime() > item.expiry) {  
       
        localStorage.removeItem(key);  
        return null;  
    }  
    return item.value;  
}  

function createUser() {  
    
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  

  
    setItemWithExpiry('username', username, 3 * 24 * 60 * 60 * 1000); 
    setItemWithExpiry('password', password, 3 * 24 * 60 * 60 * 1000); 

 
    alert('user ' + username + 'Created successfully!');  

 
}  
  
/**  
 * Verify login information. If correct, redirect to the shopping page. Otherwise, return to the user creation page  
 */  
function login() {  
     
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
  
    
    var storedUsername = getItemWithExpiry('username');  
    var storedPassword = getItemWithExpiry('password');  
  
      
    if (storedUsername === loginUsername && storedPassword === loginPassword) {  
        
        alert('user' + loginUsername + ' Login succeeded！');  
        showPage('shoppingPage');  
    } else {  
        
        showPage('createUserPage');  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
 
window.onload = init;  
  
/**  
 * Calculate the total price of items in the shopping cart and display it on the page  
 */  

  
  // script.js  
  document.addEventListener('DOMContentLoaded', () => {    
    const products = document.querySelectorAll('.product');    
    const productTotals = document.getElementById('product-totals');    
    const totalPrice = document.getElementById('total-price');    
    const purchaseButton = document.getElementById('purchase-button');    
    const clearCartButton = document.getElementById('clear-cart-button');    
    
    let cart = [];   
  
    function updateCartSummary() {  
        let total = 0;  
        productTotals.innerHTML = '';  
        cart.forEach((item, index) => {  
            const product = products[item.index];  
            const price = parseFloat(product.getAttribute('data-price'));  
            const quantity = item.quantity;  
            total += price * quantity;  
  
            const productDiv = document.createElement('div');  
            productDiv.innerHTML = `  
                <h3>${product.querySelector('h2').textContent}</h3>  
                <p>Quantity: ${quantity}</p>  
                <p>Price: $${price * quantity}</p>  
                <button class="remove-from-cart" data-cart-index="${index}">Delete</button>  
            `;  
            productTotals.appendChild(productDiv);  
  
            const removeButton = productDiv.querySelector('.remove-from-cart');  
            removeButton.addEventListener('click', () => {  
                cart.splice(index, 1);  
                updateCartSummary();  
            });  
        });  
  
        totalPrice.textContent = total.toFixed(2);  
        purchaseButton.disabled = cart.length === 0;  
    }  
  
    products.forEach((product, index) => {  
        const addToCartButton = product.querySelector('.add-to-cart');  
        const quantityInput = product.querySelector('.quantity');  
        const removeButton = product.querySelector('.remove');  
  
        addToCartButton.addEventListener('click', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity > 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    existingItem.quantity += quantity;  
                } else {  
                    cart.push({ index, quantity });  
                }  
                updateCartSummary();  
                addButton.style.display = 'none';  
                removeButton.style.display = 'block';  
            }  
        });  
  
        quantityInput.addEventListener('input', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity === 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    cart.splice(cart.indexOf(existingItem), 1);  
                    updateCartSummary();  
                    addToCartButton.style.display = 'block';  
                    removeButton.style.display = 'none';  
                }  
            }  
        });  



        removeButton.addEventListener('click', () => {  
            const existingItem = cart.find(item => item.index === index);  
            if (existingItem) {  
                cart.splice(cart.indexOf(existingItem), 1);  
                updateCartSummary();  
                addToCartButton.style.display = 'block';  
                removeButton.style.display = 'none';  
            }  
        });  
    });  
      // Add a click event listener for the purchase button  
      purchaseButton.addEventListener('click', () => {  
        if (cart.length > 0) {  
            // Display a successful purchase prompt box 
            alert('Purchase successful! Your items have been processed.');  
              
            // Clear shopping cart (optional, depending on business needs)  
            // cart = [];  
            // updateCartSummary(); // If the shopping cart is cleared, the summary needs to be updated 
              
            // Reset the purchase button status (if necessary, such as disabling the button after purchase)  
            // purchaseButton.disabled = true; // Determine whether to disable based on actual needs  
              
            // Other purchased logic can be added here, such as sending purchase information to the server  
            // ...  
        } else {  
            // Handling when shopping cart is empty (optional)  
            alert('Your cart is empty. Please add items to your cart before purchasing.');  
        }  
    });  
    clearCartButton.addEventListener('click', () => {  
        cart = [];  
        updateCartSummary();  
    });  
});


document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
