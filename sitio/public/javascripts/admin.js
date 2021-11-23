
/* FRANCO */


let buttonDelete = document.querySelectorAll(`.butoonDelete`)

  let modalDelete = document.querySelectorAll(`.modalDelete`)

console.log(buttonDelete)
console.log(modalDelete)


  window.addEventListener("load", () =>{

    for (let index = 0; index < buttonDelete.length; index++) {

      buttonDelete[index].addEventListener("click",() =>{

        for (let index = 0; index < modalDelete.length; index++){
          modalDelete[index].classList.add("showFormDelete")
        }
    })
  }
})




/* window.addEventListener("load", () =>{

    
  buttonDelete.forEach(button => {
    button.addEventListener("click",() =>{

      modalDelete.forEach((modal,i) => {

        modalDelete.classList.add("showFormDelete")

      })
     
  })
  
  
      
    })
  }) */

















/* const Swal = require('sweetalert2')



let buttonDelete = document.querySelector(".butoonDelete")

let modalDelete = document.querySelector(".modalDelete")

window.addEventListener("load", () =>{

buttonDelete.addEventListener("click",function(e){

      e.preventDefault()
  
      Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: "Los cambios no son reversibles!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          e.submit();
        }  
      })

  
})


}) */



/* 

let buttonDelete = document.querySelectorAll(".butoonDelete")

let modalDelete = document.querySelectorAll(".modalDelete")



window.addEventListener("load", () =>{

  buttonDelete.forEach(button => {
  
    modalDelete.forEach(modal =>{
  
      button.addEventListener("click",function(e,modal){
        e.preventDefault();
    
        Swal.fire({
          title: '¿Estás seguro de eliminar el producto?',
          text: "Los cambios no son reversibles!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            modal.submit();
          }  
        })
        
      })
    })
  
    
  })
  
  
  }) */


/* ---------------------- */
/* ---------------------- */
/* ---------------------- */


/* let editar = document.querySelectorAll("button .container-form__edit"); */

/* const Swal = require('sweetalert2');   */
/* let button = document.querySelectorAll('button .container-form__delete');

const confirmDelete = (e, form) => {
  e.preventDefault();

  Swal.fire({
    title: '¿Estás seguro de eliminar el producto?',
    text: "Los cambios no son reversibles!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      form.submit();
    }  
  })
}



window.addEventListener('load', function(){
  [].forEach.call(document.querySelectorAll('.container-form__delete'), function(e) {
    e.addEventListener('click', function(e) {
      confirmDelete
 })
})
})
 */
/* window.addEventListener('load', function(){
[].forEach.call(document.querySelectorAll('.container-form__delete'), function(e) {
  e.addEventListener('click', function(e) {
    alert("hiciste click");
  });
});  */


/* 
Swal.fire({
  title: '¿Estás seguro de eliminar el producto?',
  text: "Los cambios no son reversibles!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aceptar',
  cancelButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
}
 */

/* window.addEventListener('load', function(){
    editar.addEventListener('click', function(){
     alert("hiciste click");
    })


    eliminarAlerta.addEventListener('click', function(){
      alert("Querés borrar el producto?");
     })
}) */

/* [].forEach.call(document.querySelectorAll('.container-form__edit'), function(e) {
  e.addEventListener('click', function(e) {
    alert("hiciste click");
  });
}); */ 


/* window.addEventListener('load', function(){
[].forEach.call(document.querySelectorAll('.container-form__delete'), function(e) {
  e.addEventListener('click', function(e) {
    document.querySelectorAll('.container-form__delete').Swal.fire("Alerta prueba");
  });
});


}) */

/* window.addEventListener('load', function(){
  eliminarAlerta.addEventListener('click', () =>{
    eliminarAlerta.Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
})  
})  */

/* 
$(function(){
    $('container-form__delete').click(function(){
        swal({   
                    title: "Are you sure?",   
                    text: "You will not be able to recover this imaginary file!",   
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Yes, delete it!",   
                    closeOnConfirm: false 
            }, 
            function(isConfirmed){ 
          if(isConfirmed) {
            $('container-form__delete').addClass("isDeleted");
            swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
          }
        }
      );
    });
  }); */