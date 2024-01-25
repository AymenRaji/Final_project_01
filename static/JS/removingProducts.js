export function removeAllproducts(){
    let products = document.querySelector(".products");
    let productsContainer = document.querySelector(".products-container");
    productsContainer.removeChild(products);
    localStorage.clear();
    window.location.href="/products";
}

export function removeproduct(event){
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
