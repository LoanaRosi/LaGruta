const $ = id => document.getElementById(id);
let regExLetter = /^[A-Z]+$/i; //para validar que solo se ingresen letras
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/; //para email valido
let regExPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // validar contraseña. Mínimo ocho caracteres, al menos una letra y un número

window.addEventListener('load', function(){
    $('name').addEventListener('blur', () =>{
        $('nameErrors').innerText = null
        switch(true){
            case !$('name').value.trim():
                $('nameErrors').innerText = "Debes ingresar tu nombre y apellido"
                $('name').classList.add('is-invalid')
                break;
            case !regExLetter.test($('name').value.trim()):
                $('nameErrors').innerText = "Solo se admiten letras"
                $('name').classList.add('is-invalid')
                break;
            case $('name').value.trim().length < 2 || $('name').value.trim().length > 100 :
                 $('nameErrors').innerText = "Debe tener un mínimo 2 caracteres y un máximo de 100"
                 $('name').classList.add('is-invalid')
                 break;
            default:
                $('name').classList.remove('is-invalid')
                $('name').classList.add('is-valid')
                $('nameErrors').innerText = null
                break;
        } 
    })
    

    $('email').addEventListener('blur', () =>{
        $('emailErrors').innerText = null
        switch(true){
            case !$('email').value.trim():
                $('emailErrors').innerText = "El correo electrónico es obligatorio";
                $('email').classList.add('is-invalid')
                break;
            case !regExEmail.test($('email').value):
                $('emailErrors').innerText = "El correo ingresado no es válido";
                $('email').classList.add('is-invalid')
                break;         
            default:
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
                $('emailErrors').innerText = null
                break;
        }   
    })
  

    $('password').addEventListener('blur', () =>{
        $('passwordErrors').innerText = null
        switch(true){
            case !$('password').value.trim():
                $('passwordErrors').innerText = "El campo contraseña es obligatorio"
                $('password').classList.add('is-invalid')
                break;
            case !regExPass.test($('password').value):
                $('passwordErrors').innerText = "La contraseña debe tener Mínimo 8 caracteres, al menos una letra y un número";
                $('password').classList.add('is-invalid')
                break; 
            default:
                $('password').classList.remove('is-invalid')
                $('password').classList.add('is-valid')
                $('passwordErrors').innerText = null
                break;
        }   

    })

    
    $('password-confirm').addEventListener('blur',() => {
        if($('password').value !== $('password-confirm').value){
            $('passwordConfirmErrors').innerText = "Las contraseñas no coinciden"
            $('password-confirm').classList.add('is-invalid')
        }else if($('password').value == ""){
            $('passwordConfirmErrors').innerText = "Debes ingresar tu contraseña nuevamente"
            $('password-confirm').classList.add('is-invalid')
        }else{
            $('passwordConfirmErrors').innerText = null
            $('password-confirm').classList.remove('is-invalid')
            $('password-confirm').classList.add('is-valid')            
        }
    })

    $('terminos').addEventListener('click', () =>{
        $('terminos').classList.toggle('is-valid')
        $('terminos').classList.remove('is-invalid')
        $('terminosErrors').innerHTML = null
    })

    $('form-register').addEventListener('submit', e => {
        e.preventDefault();

        let elementsForm = $('form-register').elements;

        let error = false;

        for (let i = 0; i < elementsForm.length -2; i++) {
            
            if (!elementsForm[i].value) {
                 elementsForm[i].classList.add('is-invalid')
                 $('error-empty').innerHTML = "Los campos señalados son obligatorios"
                 error = true; 
                
            }
            
        }
    })

    if(!$('terminos').checked) {
            
        $('terminos').classList.add('is-invalid')
        $('terminosErrors').innerText = "Debes aceptar los términos y condiciones";
        error = true
    }

    if(!error){
        $('form-register').submit()
    }




    
})
