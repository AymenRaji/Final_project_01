
export function removeproducts(){
    let products = document.querySelector(".products");
    let productsContainer = document.querySelector(".products-container");
    productsContainer.removeChild(products);
}



export function clearLocalstorage() {
    try {
        let products = document.querySelector(".products");
        if (products){
            let cartSpan = document.querySelector('.cart span');
            let productNumb = localStorage.getItem("cartNumb");
            if (productNumb) {
                productNumb = parseInt(productNumb);
                cartSpan.textContent = productNumb;
            } else {
                cartSpan.textContent = '0';
            }
            localStorage.clear()
        }
    } catch (error) {
        console.error(error);
    }
}