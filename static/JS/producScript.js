// importing products from productData file
console.log("Hey ")


import  products   from "/static/database.json" assert {type: "json"};

fetch("http://localhost:80/products",{
    headers:{'Content-Type': 'application/json'}
}).then(response => response.json())
.then(data =>{
    const arrpr = [...data.product];
    const arrus = [...data.users];
    console.log(arrpr && typeof arrpr);
    console.log(arrus  && typeof arrus);
})

fetch("http://localhost:80/products", {
    headers: { 'Content-Type': 'application/json'}
})
.then(response => response.json())
.then(data => {
    console.log(data);
    if(Array.isArray(data.products)){
        const products = [...data.products];
        updateProductListin(products);  
        console.log(data);
    }else{
        console.error("Expected an array type but it's ", typeof data.products);
    }
   
})

.catch(error => console.error('Error fetching:', error))

// update the product lising

function updateProductListin(products){
        if(Array.isArray(products)){
            products.forEach((product) => {
                if (!product || Object.keys(product).length ===0 ){
                    return console.log("there is an empty object ")
                }
                const productCard = document.createElement("div");
                productCard.className = "product-card";
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Brand:${product.brand}</p>
                    <p>Category:${product.category}</p>
                    <div class="product-images">
                        </div>
                    <button onclick="addToCart('${product.id}, '${product.name}', '${product.images[0].image}')"> Add to Cart </button>
                `;
            ;
            product.images.forEach((image)=>{
                const productImage = document.createElement("div");
                productImage.className="product-image";
                productImage.src = image.image;
                productImage.alt = `${product.name} - ${image.color}`;
                productImage.title = image.color;
                productCard.querySelector(".produc-images").appendChild(productImage);
                
                
            });
            productListin.prepend(productCard);
            })}else{
                console.error("expected an array but got ", typeof products)
            }};
            
        


// Adding to the Cart
function addToCart(productId, productName, productImage){
    console.log(`Product added to cart: ID: ${productId}, Name:${productName}, Image:${productImage}`);
}

updateProductListin(products)
