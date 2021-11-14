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
})

