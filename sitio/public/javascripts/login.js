let formLogin = document.querySelector('#formLogin');
let formError = document.getElementById("form-error");

function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $email = qs("#email"),
      $emailErrors = qs("#emailErrors"),
      $password = qs("#password"),
      $passwordErrors = qs("#passwordErrors"),
      regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

      $email.addEventListener('blur', function() {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio';
                $email.classList.add('is-invalid')
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid')
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = ''
                break;
        }
    })

    $password.addEventListener('blur', function() {
        switch (true) {
            case !$password.value.trim():
                $passwordErrors.innerHTML = 'El campo contraseña es obligatorio';
                $password.classList.add('is-invalid')
                break;
            default:
                $password.classList.remove('is-invalid');
                $password.classList.add('is-valid');
                $passwordErrors.innerHTML = ''
                break;
        }
    },
    
    formLogin.addEventListener('submit', event => {
        event.preventDefault();

        let elementsForm = formLogin.elements;
        console.log(elementsForm)
        let error = false;

        for (let i = 0; i < elementsForm.length -2; i++) {
            
            if(!elementsForm[i].value){
                elementsForm[i].classList.add('is-invalid')
                formError.style.border = "1px solid var(--color-Rojo3)"
                formError.style.padding = "6px"
                formError.style.borderRadius = "50px"
                formError.style.margin = '0 auto'
                formError.style.marginBottom = '20px'
                formError.style.color = 'red'
                formError.innerHTML = "Los campos señalados son obligatorios" + "<i class='fas fa-exclamation-triangle'></i>";
                error = true
            }
        }

        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(elementsForm[i].classList.contains('is-invalid')){
                error = true
            }
        }


        if(error == false){
            formLogin.submit()
        }
    })
)
})

