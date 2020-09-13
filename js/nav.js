const user = document.getElementById('user');
const close = document.getElementById('close');

let username = JSON.parse(localStorage.getItem('user'));

if(username != null){
    user.innerHTML=   username[0].usuario ;
}

console.log(username);