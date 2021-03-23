
// Fonction qui permet d'ajouter un produit dans le panier. Utilisation du Json.parse() et Json.stringify pour "traduire" les données reçus et envoyées
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

    //Affichage PopUp confirmation d'ajout 
    let overlay = document.getElementById('overlay')
    overlay.style.display = 'block';
}

// Fonction qui permet de retirer complétement un produit du panier

const removeProduct = (productId) => {
    // Récupérer le panier dans le local storage
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // Chercher le produit dans le tableau via le productId
    const findIndex = myShoppingCart.findIndex(e => e._id === productId)
    // Si il existe, supprimer le produit du tableau (s'aider de la fonction findIndex et splice)
    if (findIndex > -1) {
        myShoppingCart.splice(findIndex, 1)
    }
    // Re-renseigner le nouveau panier dans le localStorage
    localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
    location.reload()
}

// Fonction pour retirer un produit d'une quantité 

// const removeQtyProduct = (productId) => {
//     // Récupérer le panier dans le local storage
//     const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
//     // Chercher le produit dans le tableau via le productId
//     const findProduct = myShoppingCart.find(e => e._id === productId)
//     // Si il existe, retirer 1 de la quantité du produit (si quantity = 0 => supprimer le produit (appel fonction removeProduct))
//     if (findProduct && findProduct.quantity - 1 > 0) {
//         findProduct.quantity--
//         //  Re-renseigner le nouveau panier dans le localStorage
//         localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
//         console.log('myShoppingCart', myShoppingCart)
//     } else {
//         removeProduct(productId)
//     }
// }

// Fonction pour retirer l'intégralité du panier 

const removeShoppingCart = () => {
    localStorage.removeItem('myShoppingCart')
    location.reload()
}

const showCartContent = () => {

    // Variables : 
    // - Pour stocker le panier que récupère : const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // - Pour stocker le block html que je vais créer a chaque article : let blocOfMyShoppingCart = ``
    // - Pour stocker le montant total et l'initialisé a 0 : let SumTotal = 0

    //     Etape 1 : Récupérer les articles de mon panier (verifie que myShoppingCart existe dans mon localStorage)
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    let blocOfMyShoppingCart = ''
    console.log('myShoppingCart', myShoppingCart)
    // - Etape 2 : Afficher les articles
    //  Si panier vide j'affiche "panier vide" // blocOfMyShoppingCart (avec "Panier Vide")
    if (!myShoppingCart.length) {
        blocOfMyShoppingCart =
            `
            <div class="cartEmpty"> 
            <span class="cartEmpty__content"> Le panier est vide. </span>
            <div id="sumTotal" class="cartEmpty__price"><span> Total : </span> <span> 0 € </span> </div> 
            </div>
            `
        document.getElementById('products').innerHTML = blocOfMyShoppingCart
    } else { //Sinon 

        // e créé une boucle qui va permettre de
        for (let product of myShoppingCart) {

            // Créer un nouveau bloc html pour chaque article blocOfMyShoppingCart  (avec les valeurs de mon panier)
            blocOfMyShoppingCart +=
                `<div class="containerCardShoppingCartPage__product"> 
                    
                    <img id="img" class="containerCardShoppingCartPage__img" src="${product.imageUrl}" class=""></img> 
                    
                    <div class="containerCardShoppingCartPage__colContent">
                    
                    <span class="containerCardShoppingCartPage__colContent--nameOfProduct"> ${product.name} </span>
                    <span class="containerCardShoppingCartPage__colContent--descriptionOfProduct"> ${product.description} </span>
                    <div class="rowSelect">
                    <select id="select-${product._id}" class="quantityOfProduct" name="quantityOfProduct">
                    <option value="1" selected > 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                    <option value="7"> 7 </option>
                    <option value="8"> 8 </option>
                    <option value="9"> 9 </option>
                    <option value="10"> 10 </option>
                    </select>
                    <div class="containerCardShoppingCartPage__colContent--buttonRemoveProduct"><span onclick="removeProduct('${product._id}')"> Supprimer </span></div>
                    </div>
                    <div id="totalProduct-${product._id}" class="containerCardShoppingCartPage__colContent--priceProduct"> ${product.price * product.quantity / 100} € </div>  
                    </div> 
                    </div>
                    
                `
        }

        document.getElementById('products').innerHTML = blocOfMyShoppingCart
        document.getElementById('sumTotal').innerHTML = `<span> Total : </span> <span> ${getCartTotalPrice()} € </span>`

        for (let product of myShoppingCart) {
            const selectQuantity = document.getElementById(`select-${product._id}`)
            const totalProduct = document.getElementById(`totalProduct-${product._id}`)
            console.log(totalProduct)
            // selectQuantity = tableau, -1 car index commence a 0
            selectQuantity.selectedIndex = product.quantity - 1
            selectQuantity.addEventListener('change', () => {
                console.log('totalProduct', totalProduct, product)
                setQtyProduct(product._id, selectQuantity.value)
                totalProduct.innerHTML = `${getTotalProduct(product._id)} €`
                const totalPriceOfCart = getCartTotalPrice()
                console.log(totalPriceOfCart)
                document.getElementById('sumTotal').innerHTML = `<span> Total : </span> <span> ${totalPriceOfCart} € </span> `
            })
        }
    }
}

const getTotalProduct = (productId) => {
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    const findProduct = myShoppingCart.find(e => e._id === productId)
    return findProduct.price * findProduct.quantity
}

const getCartTotalPrice = () => {
    // Recuperer les articles de mon panier dans le localStorage + vérifie si mon panier existe 
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    // Si existe = Faire une boucle pour récuperer le prix et la quantité de mon article
    let sumTotal = 0
    for (let product of myShoppingCart) {
        sumTotal += product.price * product.quantity / 100
    }
    return sumTotal
    // Ajouter au montant total chaque prix des articles multiplié par leur quantité dans le panier // SumTotal
    // Retourne SumTotal 
}

const setQtyProduct = (productId, productQuantity) => {
    // Récupérer le panier dans le local storage
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // Chercher le produit dans le tableau via le productId
    const findProduct = myShoppingCart.find(e => e._id === productId)
    // Si il existe, set la valeur productQuantity
    findProduct.quantity = productQuantity
    //  Re-renseigner le nouveau panier dans le localStorage
    localStorage.setItem('myShoppingCart', JSON.stringify(myShoppingCart))
}

