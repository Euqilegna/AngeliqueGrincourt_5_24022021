// Class Camera Api affecté dans une variable pour l'appeler de manière plus simple
const api = new CameraApi()

// Fonction qui récupère les données du serveur et les affiches. 
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