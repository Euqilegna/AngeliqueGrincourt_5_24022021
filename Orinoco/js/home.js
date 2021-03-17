//démarer API : node server.js 
const api = new CameraApi()


const loadData = async () => {
    const productList = await api.getAll()
    let containerOfProductList = ""
    for (const product of productList) {
        containerOfProductList += `
        <div class="cardContainer__card" onClick="redirectToProductPage('${product._id}')">
            <img id="img" src="${product.imageUrl}" class="cardContainer__img"></img>
            <div id="description" class="cardContainer__description">
                <div class="cardContainer__descriptionTitle">${product.name}</div>
                <div class="cardContainer__descriptionPrice"><p>${product.price} euros</p></div>
            </div>
        </div>
        `
    }

    document.getElementById("containerOfProductList").innerHTML = containerOfProductList
}


const redirectToProductPage = (idProduct) => {
    localStorage.setItem("productId", idProduct);
    // redirection vers la page produit
    document.location.href = "productPage.html";
}


const loadDataById = async () => {
    const camera = await api.getById(localStorage.getItem("productId"))

    let containerOfProduct =
        `<div class="cardContainer__card--product">
        <div class="cardContainer__card--productLeftInfo">
            <img id="img" src="${camera.imageUrl}" class="cardContainer__img--productImg"> </img>
        </div>  
    <div class="cardContainer__card--productRightInfo">
        <div class="cardContainer__description--productInfo">
            <span class="cardContainer__descriptionTitle--titlePageProduct"> ${camera.name} </span>
            <span class="cardContainer__descriptionPrice--PricePageProduct"> ${camera.price} euros </span>
            <div class="cardContainer__personnalisationpOfProduct">
                <span class="cardContainer__personnalisationpOfProduct--title"> Personnalisation :
                </span>
                <div class="cardContainer__personnalisationpOfProduct--list">
                    <select class="form-control">
                        <option>Personnalisation 1</option>
                        <option>Personnalisation 2</option>
                        <option>Personnalisation 3</option>
                        <option>Personnalisation 4</option>
                        <option>Personnalisation 5</option>
                    </select>

                </div>
            </div>
            <div class="cardContainer__descriptionpOfProduct">
                <span class="cardContainer__descriptionpOfProduct--title"> Descritpion : </span>
                <div class="cardContainer__descriptionpOfProduct--text">
                    <p> ${camera.description} </p>
                </div>
            </div>
            <button class="cardContainer__buttonAddToShoppingCart" onclick="addToShoppingCart('${camera._id}')"> Ajouter au panier </button>
        </div>
    </div>
</div>`
    document.getElementById("containerOfProduct").innerHTML = containerOfProduct
}


const addToShoppingCart = async (productId) => {
    const product = await api.getById(productId)
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    const checkProduct = myShoppingCart.find(e => e._id === productId)
    if (checkProduct) {
        checkProduct.quantity++
    } else {
        product.quantity = 1
        myShoppingCart.push(product)
    }

    localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
    console.log('myShoppingCart', myShoppingCart)
}

const removeProduct = (productId) => {
    console.log('================= removeProduct')
    console.log('productId', productId)
    // Récupérer le panier dans le local storage
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // Chercher le produit dans le tableau via le productId
    const findIndex = myShoppingCart.findIndex(e => e._id === productId)
    console.log('findIndex', findIndex)
    // Si il existe, supprimer le produit du tableau (s'aider de la fonction findIndex et splice)
    if (findIndex > -1) {
        myShoppingCart.splice(findIndex, 1)
    }
    // Re-renseigner le nouveau panier dans le localStorage
    localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
    console.log('myShoppingCart', myShoppingCart)
}


const removeQtyProduct = (productId) => {
    // Récupérer le panier dans le local storage
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // Chercher le produit dans le tableau via le productId
    const findProduct = myShoppingCart.find(e => e._id === productId)
    // Si il existe, retirer 1 de la quantité du produit (si quantity = 0 => supprimer le produit (appel fonction removeProduct))
    if (findProduct && findProduct.quantity - 1 > 0) {
        findProduct.quantity--
        //  Re-renseigner le nouveau panier dans le localStorage
        localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
        console.log('myShoppingCart', myShoppingCart)
    } else {
        removeProduct(productId)
    }
}

const removeShoppingCart = () => {
    localStorage.removeItem('myShoppingCart')  
}

//location.reload() pour rafraîchir la page 


// if / else
if (true) { // Si ma condition est vraie

} else { // Sinon

}

// Equivalent if / else
console.log(true ? 'if' : 'else')
