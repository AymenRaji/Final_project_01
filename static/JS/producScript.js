

let cart = document.querySelectorAll(".cart-button")
let productCards = document.querySelectorAll(".product-card")



let productCardsArray = Array.from(productCards); // Convert HTML collection to array
let products = {...productCardsArray}; // Convert array to object
products = {};

productCards.forEach((card, index) => {
    let imgElement = card.querySelector('img');
    let h3Element = card.querySelector('h3');
    let pElement = card.querySelector('p');
    let oneProductInCart = card.querySelector('span');

    products[index] = {
        imageUrl: imgElement.getAttribute('src'),
        name: h3Element.innerText,
        price: parseInt(pElement.innerText.split(': ')[1]),
        inCart: parseInt(oneProductInCart.innerText.split(': ')[1])
    };
});

console.log(products)
console.log(cart)

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
// const addToCart = document.getElementById("prdocuct-button");

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
function setItems(products){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[products.name] == undefined){
            cartItems = {
                ...cartItems,
                [products.name]: products

            }
        }
    cartItems[products.name ].inCart +=1;
    }else{
        products.inCart = 1;
        cartItems= {[products.name]: products}
    ;
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalprice(products){
    // console.log("product price: ", products.price, typeof products.price)
    let cartprice = localStorage.getItem("totalPrice");
    console.log("My cart cost is", cartprice);
    
    console.log(typeof cartprice);

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
    console.log(cartItems);
    let productContainer = document.querySelector(".products")
    let cartprice = localStorage.getItem("totalPrice");
    console.log("cart price type is ",typeof cartprice)
    if (cartItems && productContainer){
        productContainer.innerHTML="";

        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
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
                    <span calss="qu-span">${item.inCart}</span>
                    <ion-icon name="caret-forward-outline" size="xx-small"></ion-icon>
                </div>
            </div>
            <div class="total">
            ${item.inCart * item.price}
            <br>
            </div>
            </div>
            `
            console.log(typeof item.price)
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
        
        
        `

    }
}



getCartSpan();
displayCart();