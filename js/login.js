//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var login = document.getElementById('login');
var email = document.getElementById('email');
var password = document.getElementById('password');

console.log(login);
login.addEventListener('submit', function(event){
    event.preventDefault();
    let userLogin = Array(
        {
            email: email.value,
            password: password.value,
        }
    );
    console.log(userLogin);
    
    localStorage.setItem('user' , JSON.stringify(userLogin));
    window.location.href= 'inicio.html';
    
});