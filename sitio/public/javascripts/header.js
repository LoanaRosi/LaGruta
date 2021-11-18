// MENU MOBILE
window.addEventListener("load",()=>{

    let burguerExit = document.querySelector('#exit-menuBurguer')

    let menu = document.querySelector('#burguer')

    let menuActive = document.querySelector('.menu-options')

    menu.addEventListener("click",function(){
        menuActive.classList.add('menuActive')
    })

    burguerExit.addEventListener("click",function(e){
        e.preventDefault()
        menuActive.classList.remove('menuActive')
    })

    // carrito

    let openCart = document.getElementById('openModalCart')
    let openModalCartMovile = document.getElementById('openModalCartMovile')
    let modalCart = document.getElementById('modalCart')
    let modalCartProduct = document.getElementById('modalCartProduct')

    let closeModalCart = document.getElementById('closeModalCart')

    openCart.addEventListener("click", function(e){
        e.preventDefault()
        modalCart.classList.add("openCart")
        modalCartProduct.classList.add("openCartProduct")
    })

    openModalCartMovile.addEventListener("click", function(e){
        e.preventDefault()
        modalCart.classList.add("openCart")
        modalCartProduct.classList.add("openCartProduct")
    })

    window.addEventListener("click",(e)=>{
        if(e.target ==  modalCart || e.target == closeModalCart ){
            modalCart.classList.remove("openCart")
            modalCartProduct.classList.remove("openCartProduct")
        }
        
    })

    let domSearchForm1 = document.getElementById('domSearchForm1')
    let domSearch1 = document.getElementById('domSearch1')

    domSearchForm1.addEventListener("submit", function(e){
        e.preventDefault()

        if (domSearch1.value != 0 ) {
            domSearchForm1.submit()
        }

    })

    let domSearchForm2 = document.getElementById('domSearchForm2')
    let domSearch2 = document.getElementById('domSearch2')

    domSearchForm2.addEventListener("submit", function(e){
        e.preventDefault()

        if (domSearch2.value != 0 ) {
            domSearchForm2.submit()
        }

    })

    /* let loginAvertCart = document.getElementById("loginAvertCart")
    let avertCartOpen = document.getElementById("avertCartOpen")

    avertCartOpen.addEventListener("click", function(e){
        e.preventDefault()
        loginAvertCart.classList.add("modalAvertCart")
    }) */
})
