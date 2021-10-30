function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $email = qs("#email"),
      $emailErrors = qs("#emailErrors"),
      $password = qs("#password"),
      $passwordErrors = qs("#passwordErrors"),
      regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
      regExPass = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,12}$/;

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
            case !regExPass.test($password.value):
                $passwordErrors.innerHTML = 'Debe ingresar una contraseña válida';
                $password.classList.add('is-invalid')
                break
            default:
                $password.classList.remove('is-invalid');
                $password.classList.add('is-valid');
                $passwordErrors.innerHTML = ''
                break;
        }
    }
)
})

