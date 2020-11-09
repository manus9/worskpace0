var user = JSON.parse(localStorage.getItem('user'));
var emailContainer = document.getElementById('userEmail');
var userForm = document.getElementById('editProfile');
var userName = document.getElementById('inputFirstName');
var userLastName = document.getElementById('inputLastName');
var userPhoneNumber = document.getElementById('inputPhoneNumber');
var userBirthday = document.getElementById('inputBirthday');
var userAge = document.getElementById('inputAge')

console.log(user);
userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let profile = Array(
        {
            userName: userName.value,
            userLastName: userLastName.value,
            userPhoneNumber: userPhoneNumber.value,
            userBirthday: userBirthday.value,
            userAge: userAge.value
        }
    )
    

    localStorage.setItem('profile', JSON.stringify(profile));
    window.location.href = 'my-profile.html';
});
if (user != null) {
    emailContainer.innerHTML = "<i class='fas fa-envelope text-muted mr-3'></i>" + user[0].email;
    console.log(user);
}


    



    