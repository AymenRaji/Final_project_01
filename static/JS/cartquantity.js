

// These bot function, when the user adde the product item (if user need 2 item from the smae product),
//  can add product and the total will be adjusted both in the browesre and localStorage

export function increaseQuanitityOfProduct(event) {
    let increaseQuanitity = event.currentTarget;
    let productRow = increaseQuanitity.closest(".product-row");
    let itemInCart = productRow.querySelector(".itemInCart");
    let basketTotal = document.querySelector(".basketTotal");
    
    
    let itemInCartNu = parseFloat(itemInCart.textContent);  // Updateing the itemIncart Number by adding 1 everytime the user clicks
    let newItemInCartNu = itemInCartNu + 1;
    itemInCart.textContent = newItemInCartNu
    let itemInCartLS = JSON.parse(localStorage.getItem("productsInCart"));
    let productId = productRow.getAttribute('id');
    itemInCartLS[productId].inCart += 1;
    localStorage.setItem("productsInCart", JSON.stringify(itemInCartLS));
    

    let price = parseFloat(productRow.querySelector(".price").textContent);  // Adding the price in row everytime the user click
    let productTotalInRow = productRow.querySelector(".total");
    let priceXItemInCart = parseFloat(productTotalInRow.textContent)
    let newproductTotalInRow = price + priceXItemInCart;
    productTotalInRow.textContent = newproductTotalInRow


    let newBasketTotalNumber = parseFloat(basketTotal.textContent); // updating the TotalBasket
    let updatedBasketTotal = newBasketTotalNumber + price 
    basketTotal.textContent = updatedBasketTotal
    localStorage.setItem("totalPrice", updatedBasketTotal)

    let cartNumb = localStorage.getItem("cartNumb")
    let updatedCartNumbe = parseFloat(cartNumb) + 1
    localStorage.setItem("cartNumb", updatedCartNumbe)

    let cartSpan = parseFloat(document.querySelector(".cart span").textContent);
    let updatedCartSpan = cartSpan + 1
    console.log("Thes", cartSpan, typeof cartSpan)
    document.querySelector(".cart span").textContent = updatedCartSpan;

}





export function decreaseQuanitityOfProductInRow(event){
    let decreaseQuanitity = event.currentTarget;
    let productRow = decreaseQuanitity.closest(".product-row");
   
    let itemInCart = productRow.querySelector(".itemInCart");
    let basketTotal = document.querySelector(".basketTotal");

    
    let itemInCartNu = parseFloat(itemInCart.textContent);  // Updateing the itemIncart Number by adding 1 everytime the user clicks

    if(itemInCartNu > 1 ){
        let newItemInCartNu = itemInCartNu - 1;
    itemInCart.textContent = newItemInCartNu
    let itemInCartLS = JSON.parse(localStorage.getItem("productsInCart"));
    let productId = productRow.getAttribute('id');
    itemInCartLS[productId].inCart -= 1;
    localStorage.setItem("productsInCart", JSON.stringify(itemInCartLS));


    let price = parseFloat(productRow.querySelector(".price").textContent);  // Adding the price in row everytime the user click
    let productTotalInRow = productRow.querySelector(".total");
    let priceXItemInCart = parseFloat(productTotalInRow.textContent)
    let newproductTotalInRow =  priceXItemInCart - price;
    productTotalInRow.textContent = newproductTotalInRow

    let newBasketTotalNumber = parseFloat(basketTotal.textContent); // updating the TotalBasket
    let updatedBasketTotal = newBasketTotalNumber - price 
    basketTotal.textContent = updatedBasketTotal
    localStorage.setItem("totalPrice", updatedBasketTotal)


    let cartNumb = localStorage.getItem("cartNumb")
    let updatedCartNumbe = parseFloat(cartNumb) - 1
    localStorage.setItem("cartNumb", updatedCartNumbe)

    let cartSpan = parseFloat(document.querySelector(".cart span").textContent);
    let updatedCartSpan = cartSpan - 1
    console.log("Thes", cartSpan, typeof cartSpan)
    document.querySelector(".cart span").textContent = updatedCartSpan;


    }
}

