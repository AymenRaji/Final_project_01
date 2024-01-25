let cart = document.querySelectorAll(".cart-button")
let productCards = document.querySelectorAll(".product-card")





let productCardsArray = Array.from(productCards);   // converting products to an object which now it's come as html product card from the python back-end code, 
let products = {...productCardsArray};              // so it can be converted to string and store in the localStorage


productCards.forEach((card, index) => {
    let idElement = card.querySelector('h6')
    let imgElement = card.querySelector('img');
    let h3Element = card.querySelector('h3');
    let pElement = card.querySelector('p');
    let oneProductInCart = card.querySelector('span');

    products[index] = {
        id: parseInt(idElement.innerText.split(': ')[1]),
        imageUrl: imgElement.getAttribute('src'),
        name: h3Element.innerText.split(":")[1],
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
        totalprice(products[i])
        ;
    });
};

document.querySelector('.about_URL').addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById('message').textContent = "You clicked the About link!";
});


export function getCartSpan() {
    let productNumb = localStorage.getItem("cartNumb");
    console.log("These getCartSoan",getCartSpan)
    try{
        if(productNumb){
            document.querySelector('.cart span').textContent = productNumb;
            console.log("These cartsSpan",productNumb)
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
    }
    setItems(products);
}



// To edite and make by id instead of the name 
function setItems(products){
    let cartItems = localStorage.getItem("productsInCart");
    console.log("The are cartItems before" , cartItems)
    cartItems = JSON.parse(cartItems);
    console.log("The are cartItems before" , cartItems)
    if (cartItems != null){
        if (cartItems[products.id] == undefined){
            console.log(products.id)
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