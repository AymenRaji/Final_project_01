

import {  removeproduct, removeAllproducts } from "./removingProducts.js";
import { increaseQuanitityOfProduct, decreaseQuanitityOfProductInRow } from "./cartquantity.js";
import { getCartSpan } from "./localStorag.js";


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
                <h4 class="basketTotalTitle">Basket Total: <span class="basketTotal">${cartprice}</spna> </h4>
                <button class="checkout-button">checkout</button>
            </div>
        `;
        productContainer.innerHTML +=`
            <div class="checkout">
                
            </div>
        
        `;
        productContainer.innerHTML +=`        
        <div class="bottom-row">
            <div class= "bottom-col">
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
            removeAllproducts();
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

document.addEventListener("DOMContentLoaded", function(){
let footer = document.getElementById("footer");
document.querySelector('.footer_URL').addEventListener("click", function(event){
    event.preventDefault();
    footer.scrollIntoView({behavior: "smooth"})
})

let about = document.getElementById("about-us-container");
let aboutLink = document.querySelector('.about_URL');

if (about && aboutLink) {
    aboutLink.addEventListener("click", function(event){
        event.preventDefault();
        about.scrollIntoView({behavior: "smooth"})
    })
}

})

document.addEventListener("DOMContentLoaded", function(){
   try{
    let logingout = document.querySelector("#logout");
    logingout.addEventListener("click", function(){
        localStorage.clear();
    })
   }catch{
    
   }
})


getCartSpan();
displayCart();
