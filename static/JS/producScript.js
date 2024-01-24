import { removeproducts, clearLocalstorage} from "./removinFromCart.js";


let cart = document.querySelectorAll(".cart-button")
let productCards = document.querySelectorAll(".product-card")

// converting products to an object which now it's come as html product card from the python back-end code, 
// so it can be converted to string and store in the localStorage

let productCardsArray = Array.from(productCards); 
let products = {...productCardsArray}; 


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


//Adding event in the button for all the products card, 
//when it will be clicked it will be stored in the local storage with it's product name, image, prices, how much inCart from the same product
//using the product-card id

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
            let productId = `${item.id}`;
            productContainer.innerHTML +=`
            <div id="${productId}" class="product-row">
            <div class="product">
            <ion-icon class="removeButton" name="close-circle-outline"></ion-icon>
            <img src=${item.imageUrl}>
            <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price}
            </div>
            <div class="quanitity"> 
                <div class="productQuanitity">
                    <ion-icon id="decreaseQuanitity" name="caret-back-outline" size="xx-small"></ion-icon>
                    <span class="itemInCart">${item.inCart}</span>
                    <ion-icon id="increaseQuanitity" name="caret-forward-outline" size="xx-small"></ion-icon>
                </div>
            </div>
            <div class="total">
            ${item.inCart * item.price}
            <br>
            </div>
            </div>
            `
        });
        

        productContainer.innerHTML +=`
            <div class= "basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total </h4>
                <h4 class="basketTotal">${cartprice}</h4>
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




document.addEventListener("DOMContentLoaded", function() {
   
try{
let removebuttons = document.querySelectorAll(".removeButton")
removebuttons.forEach(button => {
    button.addEventListener("click", function(event){
        removeproduct(event);
    });
})
}catch{

}

});


function removeproduct(event){
    let removebutton = event.target;
    let productRow = removebutton.closest('.product-row');
    let productContainer = document.querySelector(".products");
    if (productRow && productContainer){

        let Toatal = document.querySelector(".basketTotal");
        let price = productRow.querySelector(".price");
        let cartSpan = productRow.querySelector(".itemInCart");
        console.log("These is cartSpan", cartSpan, typeof cartSpan)
        let Cartnumber = cartSpan.textContent;
        console.log("These is Cartnumber", Cartnumber, typeof Cartnumber)
        let cartSpanNumber = parseFloat(Cartnumber)
        console.log("These is cartSpanNumber", cartSpanNumber, typeof cartSpanNumber)
  
        let updatedTotal= parseFloat(Toatal.textContent);
        let removedPrice = parseFloat(price.textContent);
        console.log("remove price is ", removedPrice, typeof removedPrice)
        let allRemovedPrice = removedPrice * cartSpanNumber;
        console.log("AllRemoved is ", allRemovedPrice, typeof allRemovedPrice)
        let updatedBasketTotal = updatedTotal - allRemovedPrice;
        updatedBasketTotal = updatedBasketTotal.toFixed(2)
        Toatal.textContent = updatedBasketTotal;

        // let productPrice = parseFloat(productRow.querySelector(".price").textContent);
        
        let productId = Number(productRow.getAttribute('id'));
       
       
        // Update total price and cart number in local storage
        let totalPrice = parseFloat(localStorage.getItem("totalPrice"));
        let cartNumb = parseInt(localStorage.getItem("cartNumb"));
        totalPrice =  totalPrice - allRemovedPrice;
        cartNumb -= Cartnumber;
        let baskentNumber = document.querySelector(".cart span")
        baskentNumber.textContent = cartNumb
        if (cartNumb == 0){
            window.location.href = "/products"
        }
        localStorage.setItem("totalPrice", totalPrice.toFixed(2));
        localStorage.setItem("cartNumb", cartNumb.toString());

        let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        delete productsInCart[productId];
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));


        productContainer.removeChild(productRow);
    }
}




function increaseQuanitityOfProduct(event) {
    let increaseQuanitity = event.currentTarget;
    let productRow = increaseQuanitity.closest(".product-row");
    let onProductQuantity = productRow.querySelector(".itemInCart");
    // let cartSpan = productRow.querySelector(".itemInCart");
    // let Cartnumber = cartSpan.textContent;
    // let cartSpanNumber = parseFloat(Cartnumber)
    // let cartSpans = parseInt(onProductQuantity.textContent);
    // onProductQuantity.textContent = cartSpans + 1;
    
    let updatedProductQuantity = parseInt(onProductQuantity.textContent);
    onProductQuantity.textContent = updatedProductQuantity + 1;


    let basketTotalToatal = document.querySelector(".basketTotal");
    let price = productRow.querySelector(".price");
    let cartSpan = productRow.querySelector(".itemInCart");
    let productTotalInRow = productRow.querySelector(".total")
    // let productTotalInRow = toatal.textContent
    let Cartnumber = cartSpan.textContent;
    console.log("These is Cartnumber", Cartnumber, typeof Cartnumber)
    let cartSpanNumber = parseFloat(Cartnumber)
    console.log("These is cartSpanNumber", cartSpanNumber, typeof cartSpanNumber)
  
    let updatedTotal= parseFloat(basketTotalToatal.textContent);
    let removedPrice = parseFloat(price.textContent);
    if (cartSpanNumber<1){
        console.log("remove price is ", removedPrice, typeof removedPrice)
    let allRemovedPrice = removedPrice * cartSpanNumber;
    productTotalInRow.textContent = allRemovedPrice
    console.log("AllRemoved is ", allRemovedPrice, typeof allRemovedPrice)
    let updatedBasketTotal = updatedTotal + allRemovedPrice;
    updatedBasketTotal = updatedBasketTotal.toFixed(2)
    basketTotalToatal.textContent = updatedBasketTotal;
    console.log(basketTotalToatal)
    localStorage.setItem("totalPrice", updatedBasketTotal);
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    }
    

    let productId = productRow.getAttribute('id');
    productsInCart[productId].inCart += 1;
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

function decreaseQuanitityOfProductInRow(event){
    let decreaseQuanitity = event.currentTarget;
    let productRow = decreaseQuanitity.closest(".product-row");
    let onProductQuantity = productRow.querySelector(".itemInCart");
    
    // let updatedProductQuantity = parseInt(onProductQuantity.textContent);

    // if (updatedProductQuantity > 1) {
    //     onProductQuantity.textContent = updatedProductQuantity - 1;

    //     let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    //     let productId = productRow.getAttribute('id');
    //     productsInCart[productId].inCart -= 1;
    //     localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    // }

    let updatedProductQuantity = parseInt(onProductQuantity.textContent);
    
    
    let basketTotalToatal = document.querySelector(".basketTotal");
    let price = productRow.querySelector(".price");
    let cartSpan = productRow.querySelector(".itemInCart");
    let productTotalInRow = productRow.querySelector(".total")
    // let productTotalInRow = toatal.textContent
    let Cartnumber = cartSpan.textContent;
    console.log("These is Cartnumber", Cartnumber, typeof Cartnumber)
    let cartSpanNumber = parseFloat(Cartnumber)
    console.log("These is cartSpanNumber", cartSpanNumber, typeof cartSpanNumber)
  
    let updatedTotal= parseFloat(basketTotalToatal.textContent);
    let pricePerProduct = parseFloat(price.textContent);
    console.log("remove price is ", pricePerProduct, typeof pricePerProduct)
    let allRemovedPrice = pricePerProduct * cartSpanNumber ;
    productTotalInRow.textContent = allRemovedPrice
    console.log("AllRemoved is ", allRemovedPrice, typeof allRemovedPrice)
    let updatedBasketTotal = updatedTotal - allRemovedPrice;
    updatedBasketTotal = updatedBasketTotal.toFixed(2)
    basketTotalToatal.textContent = updatedBasketTotal;
    console.log(basketTotalToatal)
    localStorage.setItem("totalPrice", updatedBasketTotal);

   

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    let productId = productRow.getAttribute('id');
    if(updatedProductQuantity > 1){
        onProductQuantity.textContent = updatedProductQuantity - 1;
        productsInCart[productId].inCart -= 1;
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}






document.addEventListener("DOMContentLoaded", function () {
    try {
        let increaseQuanitity = document.querySelectorAll("#increaseQuanitity");
        increaseQuanitity.forEach(button => {
            button.addEventListener("click", function (event) {
                increaseQuanitityOfProduct(event);
            });
        });
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    try {
        let decreaseQuanitity = document.querySelectorAll("#decreaseQuanitity");
        decreaseQuanitity.forEach(button => {
            button.addEventListener("click", function (event) {
                decreaseQuanitityOfProductInRow(event);
            });
        });
    } catch (error) {
        console.error(error);
    }
});






document.addEventListener("DOMContentLoaded", function(){
    let flashDuration = 5;
    // let flasContainer = "flash-messages";
    function removeflash(){
    let flaselement = document.querySelectorAll(".flash-messages");
    if (flaselement){
        flaselement.forEach(elements => elements.parentNode.removeChild(elements));
    }
    }
    setTimeout(removeflash, flashDuration * 1000);
})

getCartSpan();
displayCart();
