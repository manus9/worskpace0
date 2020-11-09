
var profile = JSON.parse(localStorage.getItem('profile'));

var nameContainer = document.getElementById('userName')
var phoneContainer = document.getElementById('userPhoneNumber')
var birthdayContainer = document.getElementById('userBirthday')

if (profile != null){
    nameContainer.innerHTML = profile[0].userName + " " +  profile[0].userLastName
    phoneContainer.innerHTML = "<i class='fas fa-phone text-muted mr-3'></i>" + profile[0].userPhoneNumber
    birthdayContainer.innerHTML = "<i class='fa fa-birthday-cake text-muted mr-3'></i>" + profile[0].userBirthday + " / " + profile[0].userAge 
}
console.log(profile);

document.querySelector("#myFileInput").addEventListener("change", function() {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
});

document.addEventListener("DOMContentLoaded", () => {
    const recentImageDataUrl = localStorage.getItem("recent-image");

    if(recentImageDataUrl) {
        document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
    }
})