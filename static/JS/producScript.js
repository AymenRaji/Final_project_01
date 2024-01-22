

let cart = document.querySelectorAll(".cart-button")
let productCards = document.querySelectorAll(".product-card")



let productCardsArray = Array.from(productCards); // Convert HTML collection to array
let products = {...productCardsArray}; // Convert array to object
products = {};

productCards.forEach((card, index) => {
    let idElement = card.querySelector('h6')
    let imgElement = card.querySelector('img');
    let h3Element = card.querySelector('h3');
    let pElement = card.querySelector('p');
    let oneProductInCart = card.querySelector('span');

    products[index] = {
        id: parseInt(idElement.innerText.split(': ')[1]),
        imageUrl: imgElement.getAttribute('src'),
        name: h3Element.innerText,
        price: parseInt(pElement.innerText.split(': ')[1]),
        inCart: parseInt(oneProductInCart.innerText.split(': ')[1])
    };
});



for (let i=0; i< cart.length; i++){
    cart[i].addEventListener("click",()=>{
        cartNum(products[i]);
        totalprice(products[i]);
    });
};

function getCartSpan() {
    let productNumb = localStorage.getItem("cartNumb");
    try{
        if(productNumb){
            document.querySelector('.cart span').textContent = productNumb;
           }
    }
    catch{
        ;
    }
      
}


function cartNum(products){
    let productNumb = localStorage.getItem("cartNumb");
    productNumb = parseInt(productNumb);
    if(productNumb){
        localStorage.setItem("cartNumb", productNumb + 1);
            document.querySelector('.cart span').textContent = productNumb + 1;
        
    }else{
        localStorage.setItem("cartNumb", 1);
        document.querySelector('.cart span').textContent = 1;
        // cartSpan.innettxt = 1
        
    }
    setItems(products);
}

// To edite and make by id instead of the name 
function setItems(products){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[products.id] == undefined){
            cartItems = {
                ...cartItems,
                [products.id]: products

            }
        }
    cartItems[products.id ].inCart +=1;
    }else{
        products.inCart = 1;
        cartItems= {[products.id]: products}
    ;
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalprice(products){
    let cartprice = localStorage.getItem("totalPrice");

    if(cartprice != null){
        cartprice = parseInt(cartprice);
        localStorage.setItem("totalPrice", cartprice + products.price)
    }else{
    localStorage.setItem("totalPrice", products.price)
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products")
    let cartprice = localStorage.getItem("totalPrice");
    if (cartItems && productContainer){
        productContainer.innerHTML="";

        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class="id:${item.id}"">
            <div class="product-row">
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src=${item.imageUrl}>
            <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price}
            </div>
            <div class="quanitity"> 
                <div class="itemInCart">
                    <ion-icon name="caret-back-outline" size="xx-small"></ion-icon>
                    <span calss="cartSpan">${item.inCart}</span>
                    <ion-icon name="caret-forward-outline" size="xx-small"></ion-icon>
                </div>
            </div>
            <div class="total">
            ${item.inCart * item.price}
            <br>
            </div>
            </div>
            </div>
            `

        });
        

        productContainer.innerHTML +=`
            <div class= "basketTotalContainer>
                <h4 class="basketTotalTitle">Basket Total </h4>
                <h4 class="basketTotal">
                $${cartprice}
                </h4>
            </div>
        `;
        productContainer.innerHTML +=`        
        <div class="row">
            <div>
                <button class="clearCart"><a href="/products">Clear Cart</a></button>
            </div>

            <div class="ShopeAgain">
                <a href="/products">Add more producst</a>
            </div>
            
        </div>
        `;

    }
}
function removeproducts(){
    let products = document.querySelector(".products");
    let productsContainer = document.querySelector(".products-container");
    productsContainer.removeChild(products);
}
function clearLocalstorage() {
    try {
        let products = document.querySelector(".products");
        if (products){
            let cartSpan = document.querySelector('.cart span');
            let productNumb = localStorage.getItem("cartNumb");
            if (productNumb) {
                productNumb = parseInt(productNumb);
                cartSpan.textContent = productNumb;
            } else {
                cartSpan.textContent = '0';
            }
            localStorage.clear()
        }
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
   
    try{
        let clearCart = document.querySelector(".clearCart");
        clearCart.addEventListener("click", function() {
            clearLocalstorage();
            removeproducts();
        });
    }catch{

    }
   
});

getCartSpan();
displayCart();