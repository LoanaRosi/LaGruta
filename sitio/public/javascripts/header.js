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
})
