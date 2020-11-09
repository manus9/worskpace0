var userNav = document.getElementById('dropdownMenuButton');
var close = document.getElementById('close');
var user = JSON.parse(localStorage.getItem('user'));

if(user != null){
    userNav.innerHTML =  user[0].email ;
}


console.log(user);

logOut.addEventListener('click', function(){
    localStorage.removeItem('user')
    window.location = "index.html"
});




