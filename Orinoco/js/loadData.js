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



// Fonction qui récupère les données du serveur par leur ID 

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
            <button id="btnAddTo" class="cardContainer__buttonAddToShoppingCart" onclick="addToShoppingCart('${camera._id}')"> Ajouter au panier </button>
        </div>
    </div>
</div>`
    document.getElementById("containerOfProduct").innerHTML = containerOfProduct
}