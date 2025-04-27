// Class of a product
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// data of products
let PRODUCT = [
    new Product(1, 'Stress Relief Ball', 25.0),
    new Product(2, 'Mindfulness Notebook', 20.0),
    new Product(3, 'Essential oil', 30.0),
    new Product(4, 'Relaxation Candle', 30.0),
];

let cart = [];
let cartId = 0; // the unique id of each row
let totalPrice = 0;

// Function to add items to the cart
function addToCart(productId) {
    // Get the product details
    let name = PRODUCT[productId - 1].name;
    let index = document.getElementById("optionSelect" + productId).selectedIndex;
    let type = document.getElementById("optionSelect" + productId).options[index].value;
    let price = PRODUCT[productId - 1].price;
    let qty = document.getElementById("quantityInput" + productId);
    let totalPrice = PRODUCT[productId - 1].price * qty.value;

    //Warning message if quantity is not selected
    if (qty.value == "" || qty.value <= 0) {
        alert("Invalid quantity! Set to 1");
        qty.value = 1;  // set the quantity to 1
        qty.focus();
        return;
    }

    //Warning message if type is not selected
    if (type == "") {
        alert("Please select a type");
        document.getElementById("optionSelect" + productId).focus();
        return;
    }

    // add product quantity to existing product if already in cart
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] == productId && cart[i][2] == type) {
            cart[i][4] = parseInt(cart[i][4]) + parseInt(qty.value);
            if (cart[i][4] > 10) {
                alert("You can only add up to 10 items of same type at a order");
                cart[i][4] = 10;
            }
            cart[i][5] = parseFloat(cart[i][3]) * cart[i][4]; // update the total price of a product
            updateCart(i);
            console.log(cart);
            return;
        }
    }

    //Warning message if quantity is greater than 10
    if (qty.value > 10) {
        alert("You can only add up to 10 items of same type at a order");
        qty.value = 10;
    }

    // Add the product to the cart
    cart.push([productId, name, type, price, qty.value, totalPrice]);
    console.log(cart);
    updateCart(-1); // -1 means new product
}

function updatePrice() {
    // Calculate the total price
    totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] == null) {
            continue; // skip if current product is null
        }
        totalPrice += cart[i][5]; // add the total price of each product
    }
    // Update the total price display
    document.getElementById('totalPrice').innerHTML = totalPrice.toFixed(2);
}

function removeFromCart(rowId) {
    // Remove the product from the cart
    if(confirm("Are you sure you want to remove this item?") == true) {
        cart[rowId] = []; // set the quantity to 0
        document.getElementById('cartRow' + rowId).remove(); // remove the cart row
        updatePrice();
    }
}

// Function to update the cart display
function updateCart(existProductIndex) {
    // Remove emptyCartRow if it exists
    const existEmptyCartRow = document.getElementById('emptyCartRow');
    if (existEmptyCartRow) {
        existEmptyCartRow.remove();
    }
    if (existProductIndex == -1) { // Add new product to cart
        const cartRow = document.createElement('tr');
        cartRow.id = 'cartRow' + cartId;
        // Add the product details to the cart row
        // [productId, name, type, price, qty, totalPrice]
        let price = PRODUCT[cart[cartId][0] - 1].price;
        cartRow.innerHTML =
        `
            <td>${cart[cartId][1]}</td>
            <td>${cart[cartId][2]}</td>
            <td>${cart[cartId][3].toFixed(2)}</td>
            <td><input type="number" min="1" max="10" id = "cartRowQty${cartId}" value ="${cart[cartId][4]}" onchange="changeQty(${cartId},this)"></td>
            <td id="cartRowTotalPrice${cartId}">${cart[cartId][5].toFixed(2)}</td>
            <td><button class="remove" onclick="removeFromCart(${cartId})">Remove</button></td>
        `;
        cartId++; // increase cartId by 1 for the next product
        document.getElementById('cartItems').appendChild(cartRow);
    }
    else { // Update existing product in cart
        console.log(cart[existProductIndex][5]);
        document.getElementById('cartRowQty' + existProductIndex).value = cart[existProductIndex][4];
        document.getElementById('cartRowTotalPrice' + existProductIndex).innerHTML = cart[existProductIndex][5].toFixed(2);
    }

    //Add back the emptyCartRow if cart is empty
    if (cart.length == 0) {
        createEmptyRow();
    }
    updatePrice();
}

// Function to change the quantity of a product in the cart in the cartRow input
function changeQty(rowId, qtyInput) {
    let qty = parseInt(qtyInput.value);
    // Check if the quantity is valid
    if (qty <= 0|| qty == "") {
        alert("Invalid quantity! Set to 1");
        qtyInput.value = 1;
        cart[rowId][4] = 1; // set the quantity to 1
        cart[rowId][5] = parseFloat(cart[rowId][3]); // update the total price in the cart
        return;
    }
    // Check if the quantity is greater than 10
    if (qty > 10) {
        alert("You can only add up to 10 items of same type at a order");
        qty = 10;
    }
    cart[rowId][4] = qty; // update the quantity in the cart
    cart[rowId][5] = parseFloat(cart[rowId][3]) * qty; // update the total price in the cart
    console.log(cart);
    updateCart(rowId); // update the cart display
}

function checkout() {
    if (cart.length == 0) {
        alert('Your cart is empty!');
        return;
    }
    // Show the checkout popup
    document.getElementsByClassName("overlayDiv")[0].style.display = "block";
    document.getElementById("mask").style.display = "block";

    //write the cart items to the popup
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] == null) {
            continue; // skip if current product is null
        }
        const cartRow = document.createElement('tr');
        cartRow.innerHTML =
        `
            <td>${cart[i][1]}</td>
            <td>${cart[i][2]}</td>
            <td>${cart[i][3].toFixed(2)}</td>
            <td>${cart[i][4]}</td>
            <td>${cart[i][5].toFixed(2)}</td>
        `;
        document.getElementById("infoCartItems").appendChild(cartRow);
        document.getElementById("infoTotalPrice").innerHTML = totalPrice.toFixed(2);
    }
}

// Function to create an empty message when the cart is empty
function createEmptyRow() {
    const emptyCartRow = document.createElement('tr');
    emptyCartRow.id = 'emptyCartRow';
    emptyCartRow.innerHTML = '<td colspan="6">Your cart is empty</td>';
    document.getElementById('cartItems').appendChild(emptyCartRow);
}

document.getElementById("closePopup").addEventListener("click", function() {
    if (confirm("Are you sure you want to cancel the order?") == true) {
        closePopup();
    }
});

function closePopup(){
    document.getElementsByClassName("overlayDiv")[0].style.display = "none";
    document.getElementById("mask").style.display = "none";
}

function confirmOrder(){
    if(confirm("Are you sure you want to confirm the order?") == false) {
        return false;
    }

    alert('Thank you for your purchase!');
    closePopup();
    cart = []; // clear the cart
    cartId = 0; // reset cartId
    totalPrice = 0; // reset total price
    updatePrice();
    //Reset the cart display
    resetTable('infoCartItems');
    resetTable('cartItems');
    createEmptyRow();
}

// reset the table to empty except the header
function resetTable(documentId){
    const table = document.getElementById(documentId);
    let row = table.childNodes[2]; // get the first row after the header
    while (row) { // remove the rows until all rows are removed
        // Remove the row
        table.removeChild(row);
        // Get the next row
        row = table.childNodes[2];
    }
}