
/* let editar = document.querySelectorAll("button .container-form__edit"); */

const Swal = require('sweetalert2');  
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
window.addEventListener('load', function(){
[].forEach.call(document.querySelectorAll('.container-form__delete'), function(e) {
  e.addEventListener('click', function(e) {
    alert("hiciste click");
  });
}); 


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