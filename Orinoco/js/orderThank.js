const getCreatedOrder = () => {
    const myCreatedOrder = JSON.parse(localStorage.createdOrder)
    let blockOfMyCreatedOrder =
        `
        <div> Merci pour votre achat ${myCreatedOrder.contact.firstName} ${myCreatedOrder.contact.lastName} ! </div>
        <div> Montant total de la transaction : ${getCartTotalPrice()}  € </div> 
        <div> Numéro de commande N°${myCreatedOrder.orderId} </div>

        `

    document.getElementById('orderTicket').innerHTML = blockOfMyCreatedOrder
    localStorage.removeItem('myShoppingCart','createdOrder')
    
}




