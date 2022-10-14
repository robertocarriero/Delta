var form = document.querySelector("#formularioDeContacto");
form.addEventListener("submit", handleSubmit);

/*
la funcion es asincrona por el delay debido a la conexión con el sitio web que envía los mails
*/
async function handleSubmit(event) {
  event.preventDefault(); /* evitar que despues del submit quede en la pagina de formspree */


  /* descomentar si quiero usar un campo del formulario para mostrar los mensajes de resultado */
  var status = document.getElementById("result-msg"); 

  var data = new FormData(form); 
  
 // PARA TESTEAR DEJAR ESTA LINEA COMENTADA:
  // await fetch("https://formspree.io/f/xgeqyddv", {  
//PARA PRODUCCION DESCOMENTAR LA LINEA DE ARRIBA Y COMENTAR LA DE ABAJO:
  await fetch("", {  
    /*
  action: formspree...
  method: post
  body: FormData
  headers: formato de la respuesta que espero (en este caso JSON)
  */
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
        // alert('Gracias por contactarnos! Te responderemos a la brevedad.');
        status.innerHTML = "Gracias por contactarnos! Te responderemos a la brevedad."
      form.reset()  /* limpiamos los campos del formulario */
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Se produjo un error al enviar el formulario."
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Se produjo un error al enviar el formulario."
  });
}

/* clear a form after submission */
window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }