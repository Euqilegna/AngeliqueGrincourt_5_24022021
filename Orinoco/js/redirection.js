// Fonction qui recupère l'id du produit et redirige vers la page produit. 

const redirectToProductPage = (idProduct) => {
    localStorage.setItem("productId", idProduct);
    // redirection vers la page produit
    document.location.href = "productPage.html";
}


//PopUp - retour à la page produit
const returnToHome = () => {
    document.location.href = "home.html";
}

//PopUp - Aller au panier 
const goToShoppingCartPage = () => {
    document.location.href = "shoppingCartPage.html"
}
