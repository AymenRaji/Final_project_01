// importing products from productData file
console.log("Hey ")

// import  products   from "/static/database.json" assert {type: "json"};
let cart = document.querySelectorAll(".cart-button")
let productCard = document.querySelector(".product-card")

let products = [
          {
            "id": "64a654593e91b8e73a351e9b",
            "name": "iphone 14",
            "description": "Short description",
            "price": 2999,
            "brand": "apple",
            "category": "Phone",
            "inStock": true,
            "image": "static/images/Iphone 14/download.jpeg",
            "inCart": 1
          },
          {
            "id": "64a4ebe300900d44bb50628a",
            "name": "Iphone 14 pro",
            "description": "PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision",
            "price": 102.99,
            "brand": "logitech",
            "category": "Accesories",
            "inStock": true,
            "image": "static/images/Iphone 14 pro/download.jpeg",
            "inCart": 1
          },
          {
            "id": "649d775128b6744f0f497040",
            "name": "Smart Watch(Answer/Make Call), 1.85 Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023",
            "description": "Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in 'GloryFit' APP. You will never miss any calls and messages during meetings, workout and riding.",
            "price": 50,
            "brand": "Nerunsa",
            "category": "Watch",
            "inStock": true,
            "image": "static/images/Iphone 14 pro max/download.jpeg",
            "inCart": 1
          }
    
]
console.log(products)
console.log(cart)

for (let i=0; i< cart.length; i++){
    console.log(cart.length)
    cart[i].addEventListener("click",()=>{
        console.log("Added to Cart");
        

        cartNum(products[i]);
        totalprice(products[i])
    })
}

function getCartSpan() {
    let productNumb = localStorage.getItem("cartNumb");
    if(productNumb){
     document.querySelector('.cart span').textContent = productNumb
    }
}
// const addToCart = document.getElementById("prdocuct-button");

function cartNum(product){
    console.log("prod clickec", product)
    let productNumb = localStorage.getItem("cartNumb");
    productNumb = Number(productNumb);
    if(productNumb){
        localStorage.setItem("cartNumb", productNumb + 1);
            document.querySelector('.cart span').textContent = productNumb + 1;
        
    }else{
        localStorage.setItem("cartNumb", 1);
        document.querySelector('.cart span').textContent = 1;
        // cartSpan.innettxt = 1
        
    }
    setItems(product);
}
function setItems(product){
    console.log("Pro inside the set items products", typeof product);
    let cartItems = localStorage.getItem("productsInCart");
    console.log("Pro inside localStorage",typeof cartItems);
    cartItems = JSON.parse(cartItems);
// Thse is block has to be reviewed
    let htmlString = productCard.outerHTML;

    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, "text/html");
     products = {
    image: productCard.querySelectorAll("img").src, 
    name: productCard.querySelector('h3').textContent,
    price: parseFloat(productCard.querySelector('p').textContent.replace(/[^0-9.]/g, ''))
};

    if (cartItems != null){
        if (cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product

            }
        }
        cartItems[product.name ].inCart +=1;
    }else{
        product.inCart = 1;
        cartItems= {[product.name]: product}
    ;
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalprice(product){
    // console.log("product price: ", prdocuct.price)
    let cartprice = localStorage.getItem("totalPrice");
    console.log("My cart cost is", cartprice);
    
    console.log(typeof cartprice);

    if(cartprice != null){
        cartprice = Number(cartprice);
        localStorage.setItem("totalPrice", cartprice + product.price)
    }else{
    localStorage.setItem("totalPrice", product.price)
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems - JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".products")
    let cartprice = localStorage.getItem("totalPrice");
    console.log(cartItems)
    if (cartItems && productContainer){
        productContainer.innerHTML="";

        Object.values(cartItems).map(item =>{
            productContainer.innerHTML=`
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src=${item.image}>
            <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price},00
            </div>
            <div class="quanitity"> 
                <ion-icon name="caret-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
            <div class="total">
            ${item.inCart * item.price}, 00
            </div>
            `
        });
        productContainer.innerHTML=`
            <div class= "basketTotalContainer>
                <h4 class="basketTotalTitle">Basket Total </h4>
                <h4 class="basketTotal">
                $${cartprice},00
                </h4>
            </div>
        `

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