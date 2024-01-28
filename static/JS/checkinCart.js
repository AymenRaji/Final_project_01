let redirected = false;
function checkingCartNumb(){
    let cartNumb = localStorage.getItem("cartNumb");
    cartNumb = JSON.parse(cartNumb);
    if(!cartNumb && !redirected){
        try{
            
            window.location.href = "/products";
            redirected =true;
        }catch{
    
        }
    
    }
}

checkingCartNumb();