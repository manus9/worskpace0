//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', function(event){
    event.preventDefault();
    let users = Array(
        {
            usuario: username.value,
            contraseña: password.value
        }
    );
    localStorage.setItem('user' , JSON.stringify(users));
    location.href= 'inicio.html';
    
});
