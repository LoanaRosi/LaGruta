const $ = id => document.getElementById(id);


let cartTotal = $("cartTotal");
let changuito = $("changuito");
let containerProductCard = $("containerProductCard");
let cardProduct = $("cardProduct") //carHead
let cartEmpty = $("cartEmpty");
let buyCart = $("buyCart"); //boton
let goShop = $("goShop") //boton
let btnEmptyCart = $("emptyCart")
let spanCantidad = $('span-cantidad')

const mostrarCantidad = cart => {

    var cantidad = 0;
    var total = 0;

    if(cart){
        cart.forEach(item => {
            cantidad += item.amount;
            total += item.subTotal 
        })
    }

    spanCantidad.innerHTML = cantidad
    cartTotal.innerHTML = `$ ${total}`
   
    if (cantidad === 0) {
        cardProduct.style.display = "none"
        cartEmpty.style.display = "block"
        buyCart.classList.add('disabled')
        btnEmptyCart.classList.add('disabled')

    } else {

        cardProduct.style.display = "flex"
        cartEmpty.style.display = "none"
        buyCart.classList.remove('disabled')
        btnEmptyCart.classList.remove('disabled')

    }
}

const cargarTabla = cart => {
    containerProductCard.innerHTML = null

    cart.forEach(product => {
        let item = `
        <article class="container-product" id="cardProduct" >
            <div class="arriba">
                <img src="/images/productos/${product.image}" alt="">
            </div>
            <div class="container-datos-products">
                <div class="container-name-price">
                    <div class="container-name">
                        <p class="container-name__name">${product.name}</p>
                    </div>
                    <div class="container-price">
                        <span class="container-price__price">$${product.price}</span>
                    </div>
                </div>

                <div class="cantidad">
                    <a class="text-danger h5" onClick="removeItem(event,${product.id})"><i class="fas fa-minus-square"></i></a>
                        <span class="h5">${product.amount}<span>
                    <a class="text-success h5" onClick="addItem(event,${product.id})"><i class="fas fa-plus-square"></i></a>
                </div>
            </div>
        </article>
        `
        containerProductCard.innerHTML += item
    });
    return false
}


const getCarrito = async () => {
    try {
        let response = await fetch("/api/cart/show")
        let result = await response.json()

        cargarTabla(result.data)
        mostrarCantidad(result.data)
    } catch (error) {
        console.log(error)
    }
}

const addItem = async (e,id) => {
    e.preventDefault()

    try {
        let response = await fetch('/api/cart/add/'+ id)
        let result = await response.json()

        cargarTabla(result.data)
        mostrarCantidad(result.data)

    } catch (error) {
        console.log(error)
    }
}

const removeItem = async (e,id) =>{
    e.preventDefault()
    try {
        let response = await fetch('/api/cart/remove/'+ id)
        let result = await response.json()

        cargarTabla(result.data)
        mostrarCantidad(result.data)

    } catch (error) {
        console.log(error)
    }
}

const emptyCart = async () => {
    try {
        let response = await fetch('/api/cart/empty')
        let result = await response.json()
        containerProductCard.innerHTML = null
        mostrarCantidad(result.data)
    } catch (error) {
        console.log(error)

    }
}

btnEmptyCart.addEventListener("click", () =>{
    emptyCart()
})

let modalCart = document.getElementById('modalCart')
let modalCartProduct = document.getElementById('modalCartProduct')

window.addEventListener("click",(e)=>{
    if(e.target ==  goShop || e.target == closeModalCart ){
        modalCart.classList.remove("openCart")
        modalCartProduct.classList.remove("openCartProduct")
    }
    
})

getCarrito()