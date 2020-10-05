const user = document.getElementById('dropdownMenuButton');
const close = document.getElementById('close');

let username = JSON.parse(localStorage.getItem('user'));

if(username != null){
    user.innerHTML=   username[0].usuario ;
}

console.log(username);


logOut.addEventListener('click', function(){
    localStorage.removeItem('user')
    window.location = "index.html"
});
