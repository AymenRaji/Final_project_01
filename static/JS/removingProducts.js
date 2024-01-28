// The function when the user want to remove all the products or one one product
// by click the X button and remove all button by clicking the Clear Cart button 

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
        let Cartnumber = cartSpan.textContent;
        let cartSpanNumber = parseFloat(Cartnumber)
  
        let updatedTotal= parseFloat(Toatal.textContent);
        let removedPrice = parseFloat(price.textContent);
        let allRemovedPrice = removedPrice * cartSpanNumber;
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
