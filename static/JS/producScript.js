// importing products from productData file
console.log("Hey ")

// import  products   from "/static/database.json" assert {type: "json"};
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
    if(productNumb){
     document.querySelector('.cart span').textContent = productNumb;
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
    console.log("Pro inside the set items products", typeof products);
    let cartItems = localStorage.getItem("productsInCart");
    console.log("Pro inside localStorage",typeof cartItems);
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
                <ion-icon name="caret-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-outline"></ion-icon>
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

    }
}

// fetch("http://localhost:80/products",{
//     headers:{'Content-Type': 'application/json'}
// }).then(response => response.json())
// .then(data =>{
//     const arrpr = JSON.stringify(data);
//     const arrus = [...data.users];
//     console.log(arrpr && typeof arrpr);
//     console.log(arrus  && typeof arrus);
// })

// fetch("http://localhost:80/products", {
//     headers: { 'Content-Type': 'application/json'}
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     if(Array.isArray(data.products)){
//         const products = [...data.products];
//         updateProductListin(products);  
//         console.log(data);
//     }else{
//         console.error("Expected an array type but it's ", typeof data.products);
//     }
   
// })

// .catch(error => console.error('Error fetching:', error))

// // update the product lising

// function updateProductListin(products){
//         if(Array.isArray(products)){
//             products.forEach((product) => {
//                 if (!product || Object.keys(product).length ===0 ){
//                     return console.log("there is an empty object ")
//                 }
//                 const productCard = document.createElement("div");
//                 productCard.className = "product-card";
//                 productCard.innerHTML = `
//                     <h3>${product.name}</h3>
//                     <p>${product.description}</p>
//                     <p>Price: $${product.price}</p>
//                     <p>Brand:${product.brand}</p>
//                     <p>Category:${product.category}</p>
//                     <div class="product-images">
//                         </div>
//                     <button onclick="addToCart('${product.id}, '${product.name}', '${product.images[0].image}')"> Add to Cart </button>
//                 `;
//             ;
//             product.images.forEach((image)=>{
//                 const productImage = document.createElement("div");
//                 productImage.className="product-image";
//                 productImage.src = image.image;
//                 productImage.alt = `${product.name} - ${image.color}`;
//                 productImage.title = image.color;
//                 productCard.querySelector(".produc-images").appendChild(productImage);
                
                
//             });
//             productListin.prepend(productCard);
//             })}else{
//                 console.error("expected an array but got ", typeof products)
//             }};
            
        


// // Adding to the Cart
// function addToCart(productId, productName, productImage){
//     console.log(`Product added to cart: ID: ${productId}, Name:${productName}, Image:${productImage}`);
// }

// updateProductListin(products)


// // let cart_product = {
// //     name :"Aymen",
// //     Age: 26,
// //     image: "static\images\Iphone 14 pro max\download.jpeg"
// // }

// let dataSterlize = JSON.stringify(cart_product)
// localStorage.setItem(1, dataSterlize);

// console.log(dataSterlize)

// let data = localStorage.getItem(1)
// data = JSON.parse(data)
// console.log(data)


// const car = document.getElementById("cart_produ")

// let  cartProduct = createElement("div")
// cartProduct.innerHTML = `
//     <img  src
// `
// let products = {
//     ImageUrl: productCard.querySelector('img').src,
//     name: productCard.querySelector("h3").textContent,
//     price: parseFloat(productCard.querySelector("p").textContent.replace(/[^0-9.]/g, "")),
//     inCart: ""
// }

getCartSpan();
displayCart();