// "123"  + id + "456" = concaténation classique 
// `123${id}456` = (entrecôte alt gr 7) création d'une chaine de caractère avec variable (pas besoin de +)

class CameraApi {

    constructor() {
        this.apiUrl = "http://localhost:3000/api/cameras"
    }

    getAll() {

        const result = fetch(this.apiUrl, {  //fetch méthode qui fait un appel au serveur 
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        return result
    }

    getById(id) {

        const result = fetch(`${this.apiUrl}/${id}`, {  //fetch méthode qui fait un appel au serveur 
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        return result
    }


    // const contact = { //info du formulaire 
    //     "firstName": "P",
    //     "lastName": "a",
    //     "address": "sssss",
    //     "city": "sddfffs",
    //     "email": "dsfsdfsvd"
    // }
    // const products = [ //id des produits dans le panier
    //     "5be1ed3f1c9d44000030b061",
    //     "5be1ef211c9d44000030b062",
    //     "5be9bc241c9d440000a730e7"
    // ]
    createOrder(contact, products) {

        const data = {
            "contact": contact,
            "products": products
        }

        const result = fetch(`${this.apiUrl}/order`, {  //fetch méthode qui fait un appel au serveur 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        return result
    }
}
