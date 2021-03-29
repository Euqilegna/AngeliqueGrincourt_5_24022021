const showCartContent = () => {

    // Variables : 
    // - Pour stocker le panier que récupère : const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // - Pour stocker le block html que je vais créer a chaque article : let blocOfMyShoppingCart = ``
    // - Pour stocker le montant total et l'initialisé a 0 : let SumTotal = 0

    //     Etape 1 : Récupérer les articles de mon panier (verifie que myShoppingCart existe dans mon localStorage)
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    let blocOfMyShoppingCart = ''
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
        for (const product of myShoppingCart) {

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
                    <div id="totalProduct-${product._id}" class="containerCardShoppingCartPage__colContent--priceProduct"> ${product.price * product.quantity} € </div>  
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
                document.getElementById('sumTotal').innerHTML = `<span> Total : </span> <span> ${totalPriceOfCart} € </span> `
            })
        }
    }
}