regExgImg = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

let nameProduct = document.getElementById("name-validate");
let nameError = document.getElementById("name-error");

let formCreate = document.getElementById("form-create");
let formError = document.getElementById("form-error");

let productPrice = document.getElementById("productPrice");
let priceError = document.getElementById("price-error");

let productImg = document.getElementById("product-img")
let imgError = document.getElementById("img-error")

let productStatus = document.getElementById("product-status")
let statusError = document.getElementById("status-error")

let productCategory = document.getElementById("product-category")
let categoryError = document.getElementById("category-error")

const $ = id => document.getElementById(id)


window.addEventListener("load", () => {


    //

    /* imagen previa del producto */

    $("product-img").addEventListener('change', (e) => {

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => $("img-preview").src = reader.result
    })

    $("product-sub-img-1").addEventListener('change', (e) => {

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => $("sub-img-preview-1").src = reader.result
    })

    $("product-sub-img-2").addEventListener('change', (e) => {

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => $("sub-img-preview-2").src = reader.result
    })

    $("product-sub-img-3").addEventListener('change', (e) => {

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => $("sub-img-preview-3").src = reader.result
    })

    nameProduct.addEventListener("blur", () => {

        switch (true) {
            case !nameProduct.value.trim():
                nameError.innerHTML = "El nombre es obligatorio"
                nameProduct.classList.add('is-invalid')

                break;
            case nameProduct.value.trim().length < 2:
                nameError.innerText = "Debe tener un minimo de 2 caracteres"
                nameProduct.classList.add('is-invalid')
                break;
            default:
                nameProduct.classList.remove('is-invalid')
                nameProduct.classList.add('is-valid')
                nameError.innerText = null
                break;
        }

    })

    productPrice.addEventListener("blur", () => {
        switch (true) {
            case !productPrice.value.trim():
                priceError.innerText = "Debe indicar un precio"
                productPrice.classList.add("is-invalid")
                break;

            case productPrice.value < 0:
                priceError.innerText = "No puede ser un numero negativo"
                productPrice.classList.add("is-invalid")
                break;

            default:
                productPrice.classList.remove('is-invalid')
                productPrice.classList.add('is-valid')
                priceError.innerText = null
                break;
        }
    })

    $("product-discount").addEventListener("blur", () => {
        switch (true) {
            case $("product-discount").value < 0:
                $("discountError").innerText = "No puede ser un numero negativo"
                $("product-discount").classList.add("is-invalid")
                break

            default:
                $("product-discount").classList.remove('is-invalid')
                $("product-discount").classList.add('is-valid')
                $("discountError").innerText = null
                break;
        }
    })



    productImg.addEventListener("change", () => {
        switch (true) {
            case !productImg.value.trim():
                imgError.innerText = "Debe ingresar una imagen"
                productImg.classList.add("is-invalid")
                break;

            case !regExgImg.test(productImg.value):
                imgError.innerText = "solo se permiten imagenes jpg, jpeg, png, gif, webp"
                productImg.classList.add("is-invalid")
                break

            case productImg.value > 1:
                imgError.innerText = "solo se permite una imagen por cuadro"
                productImg.classList.add("is-invalid")

            default:
                productImg.classList.remove('is-invalid')
                productImg.classList.add('is-valid')
                imgError.innerText = null
                break;
        }
    })

    productStatus.addEventListener("blur", () => {

        if (!productStatus.value.trim()) {
            statusError.innerHTML = "Debe elegir un estado"
            productStatus.classList.add('is-invalid')
        } else {
            productStatus.classList.remove('is-invalid')
            productStatus.classList.add('is-valid')
            statusError.innerText = null
        }

    })

    productCategory.addEventListener("blur", () => {

        if (!productCategory.value.trim()) {
            categoryError.innerHTML = "Debe elegir una categoria"
            productCategory.classList.add('is-invalid')
        } else {
            productCategory.classList.remove('is-invalid')
            productCategory.classList.add('is-valid')
            categoryError.innerText = null
        }

    })

    $("product-autor").addEventListener("blur", () => {
        switch (true) {
            case !$("product-autor").value.trim():
                $("autor-error").innerHTML = "Debe ingresar un autor"
                $("product-autor").classList.add('is-invalid')
                break;
            default:
                $("product-autor").classList.remove('is-invalid')
                $("product-autor").classList.add('is-valid')
                $("autor-error").innerText = null
                break;
        }
    })

    $("product-mechanic").addEventListener("blur", () => {
        switch (true) {
            case !$("product-mechanic").value.trim():
                $("mechanic-error").innerHTML = "Debe ingresar un mecanica"
                $("product-mechanic").classList.add('is-invalid')
                break;
            default:
                $("product-mechanic").classList.remove('is-invalid')
                $("product-mechanic").classList.add('is-valid')
                $("mechanic-error").innerText = null
                break;
        }
    })

    $("product-tematic").addEventListener("blur", () => {
        switch (true) {
            case !$("product-tematic").value.trim():
                $("tematic-error").innerHTML = "Debe ingresar una tematica de juego"
                $("product-tematic").classList.add('is-invalid')
                break;
            default:
                $("product-tematic").classList.remove('is-invalid')
                $("product-tematic").classList.add('is-valid')
                $("tematic-error").innerText = null
                break;
        }
    })

    $("product-publisher").addEventListener("blur", () => {
        switch (true) {
            case !$("product-publisher").value.trim():
                $("publisher-error").innerHTML = "Debe ingresar la editorial"
                $("product-publisher").classList.add('is-invalid')
                break;
            default:
                $("product-publisher").classList.remove('is-invalid')
                $("product-publisher").classList.add('is-valid')
                $("publisher-error").innerText = null
                break;
        }
    })

    $("product-time").addEventListener("blur", () => {
        switch (true) {
            case !$("product-time").value.trim():
                $("time-error").innerHTML = "Debe ingresar un tiempo de juego"
                $("product-time").classList.add('is-invalid')
                break;
            default:
                $("product-time").classList.remove('is-invalid')
                $("product-time").classList.add('is-valid')
                $("time-error").innerText = null
                break;
        }
    })

    $("product-complexity").addEventListener("blur", () => {
        switch (true) {
            case !$("product-complexity").value.trim():
                $("complexity-error").innerHTML = "Debe ingresar la complejidad del juego"
                $("product-complexity").classList.add('is-invalid')
                break;
            default:
                $("product-complexity").classList.remove('is-invalid')
                $("product-complexity").classList.add('is-valid')
                $("complexity-error").innerText = null
                break;
        }
    })

    $("product-language").addEventListener("blur", () => {
        switch (true) {
            case !$("product-language").value.trim():
                $("language-error").innerHTML = "Debe ingresar el idioma del juego"
                $("product-language").classList.add('is-invalid')
                break;
            default:
                $("product-language").classList.remove('is-invalid')
                $("product-language").classList.add('is-valid')
                $("language-error").innerText = null
                break;
        }
    })

    $("product-player").addEventListener("blur", () => {
        switch (true) {
            case !$("product-player").value.trim():
                $("player-error").innerHTML = "Debe ingresar la cantidad de jugadores"
                $("product-player").classList.add('is-invalid')
                break;
            default:
                $("product-player").classList.remove('is-invalid')
                $("product-player").classList.add('is-valid')
                $("player-error").innerText = null
                break;
        }
    })

    $("product-content").addEventListener("blur", () => {
        switch (true) {
            case !$("product-content").value.trim():
                $("content-error").innerHTML = "Debe ingresar el contenido del juego"
                $("product-content").classList.add('is-invalid')
                break;
            default:
                $("product-content").classList.remove('is-invalid')
                $("product-content").classList.add('is-valid')
                $("content-error").innerText = null
                break;
        }
    })
})

formCreate.addEventListener('submit', event => {
    event.preventDefault();

    let elementsForm = formCreate.elements;
    console.log(elementsForm)
    let error = false;

    for (let i = 0; i < elementsForm.length - 4; i++) {

        if (!elementsForm[i].value) {
            elementsForm[i].classList.add('is-invalid')
            formError.style.border = "1px solid var(--color-Rojo3)"
            formError.style.padding = "6px"
            formError.style.borderRadius = "50px"
            formError.innerHTML = "Los campos señalados son obligatorios" + "<i class='fas fa-exclamation-triangle'></i>";
            error = true
        }
    }

    for (let i = 0; i < elementsForm.length - 4; i++) {

        if (elementsForm[i].classList.contains('is-invalid')) {
            error = true
        }
    }


    if (error == false) {
        formCreate.submit()
    }
})