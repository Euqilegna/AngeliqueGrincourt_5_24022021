// Fonction qui permet d'ajouter un produit dans le panier. Utilisation du Json.parse() et Json.stringify pour "traduire" les données reçus et envoyées

const addToShoppingCart = async (productId) => {
  const product = await api.getById(productId);
  const myShoppingCart = localStorage.myShoppingCart
    ? JSON.parse(localStorage.myShoppingCart)
    : [];
  const checkProduct = myShoppingCart.find((e) => e._id === productId);
  if (checkProduct) {
    checkProduct.quantity++;
  } else {
    product.quantity = 1;
    myShoppingCart.push(product);
  }

  localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
  //POP-UP
  let overlay = document.getElementById("overlay");
  overlay.style.display = "block";
};

// Fonction qui permet de retirer complétement un produit du panier

const removeProduct = (productId) => {
  // Récupérer le panier dans le local storage
  const myShoppingCart = JSON.parse(localStorage.myShoppingCart);
  // Chercher le produit dans le tableau via le productId
  const findIndex = myShoppingCart.findIndex((e) => e._id === productId);
  // Si il existe, supprimer le produit du tableau (s'aider de la fonction findIndex et splice)
  if (findIndex > -1) {
    myShoppingCart.splice(findIndex, 1);
  }
  // Re-renseigner le nouveau panier dans le localStorage
  localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
  location.reload();
};

// Fonction pour retirer l'intégralité du panier

const removeShoppingCart = () => {
  localStorage.removeItem("myShoppingCart");
  location.reload();
};

const getTotalProduct = (productId) => {
  const myShoppingCart = localStorage.myShoppingCart
    ? JSON.parse(localStorage.myShoppingCart)
    : [];
  const findProduct = myShoppingCart.find((e) => e._id === productId);
  return findProduct.price * findProduct.quantity;
};

const getCartTotalPrice = () => {
  // Recuperer les articles de mon panier dans le localStorage + vérifie si mon panier existe
  const myShoppingCart = localStorage.myShoppingCart
    ? JSON.parse(localStorage.myShoppingCart)
    : [];
  // Si existe = Faire une boucle pour récuperer le prix et la quantité de mon article
  let sumTotal = 0;
  for (let product of myShoppingCart) {
    sumTotal += product.price * product.quantity;
  }
  return sumTotal;
  // Ajouter au montant total chaque prix des articles multiplié par leur quantité dans le panier // SumTotal
  // Retourne SumTotal
};

const setQtyProduct = (productId, productQuantity) => {
  // Récupérer le panier dans le local storage
  const myShoppingCart = JSON.parse(localStorage.myShoppingCart);
  // Chercher le produit dans le tableau via le productId
  const findProduct = myShoppingCart.find((e) => e._id === productId);
  // Si il existe, set la valeur productQuantity
  findProduct.quantity = productQuantity;
  //  Re-renseigner le nouveau panier dans le localStorage
  localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
};

// FORM
// Recupère les informations envoyées par l'utilisateur
const getUserData = () => {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  return contact;
};

const createOrder = async () => {
  const api = new CameraApi();
  const contact = getUserData();
  const products = [];
  const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
  for (const product of myShoppingCart) {
    for (let i = 0; i < product.quantity; i++) {
      products.push(product._id);
    }
  }
  const result = await api.createOrder(contact, products);
  localStorage.setItem("createdOrder", JSON.stringify(result));
  document.location.href = "orderThankPage.html";
  return result;
};
