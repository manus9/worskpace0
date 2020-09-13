//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const login = document.getElementById('login');
const usuario = document.getElementById('username');
const password = document.getElementById('password');

login.addEventListener('submit', function(event){
    event.preventDefault();
    let users = Array(
        {
            usuario: username.value,
            contraseña: password.value
        }
    );
    console.log(users)
    
    localStorage.setItem('user' , JSON.stringify(users));
    window.location.href= 'inicio.html';
    
});
