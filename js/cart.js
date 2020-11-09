var cart;
var productsContainer;
var articleCountInputs;
var shippingType = "Elige un método de envío";
var shippingForm;
var paymentForm;

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
      if (resultObj.status === "ok"){
        cart = resultObj.data.articles;
        console.log(cart)
      }
      
        //Muestro las categorías ordenadas
        showArticles(cart);
      hideSpinner();
  });

  productsContainer = document.getElementById("productsInfo");
  paymentForm = document.getElementById("paymentForm");
  shippingForm = document.getElementById("shippingForm");
});

function showArticles(cart){

    let htmlContentToAppend = `
        <div class="row">
            <div class="col-9"  style="width: auto; margin: auto;">
                <div class="table-responsive shadow-sm bg-white rounded">
                    <table class="table mb-0">
                        <thead class="thead-light text-white">
                            <tr class="text-center">
                                <th scope="col" class="border-0">
                                    <div class="py-1 px-2 text-uppercase">Producto</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-1 px-2 text-uppercase">Cantidad</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-1 px-2 text-uppercase">Subtotal <small>(USD)</small></div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-1 px-2 text-uppercase">Eliminar</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                    `;
                    
    for(let i = 0; i < cart.length; i++){
        let article = cart[i];

        if(article.currency === "UYU"){
            article.unitCost = article.unitCost / 40;
            article.currency = "USD";
        }

        htmlContentToAppend += `
            <tr class="border-bottom">
                <th scope="row" class="border-0">
                    <div class="p-2">
                        <img src="${article.src}" width="70" class="img-fluid rounded shadow-sm">
                        <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0">${article.name}</h5>
                            <span class="text-muted font-weight-normal font-italic d-block">$${article.unitCost}</span>
                        </div>
                    </div>
                </th>

                <td class="border-0 align-middle text-center" style="width: 15%;">
                    <div class="col-10 d-inline-flex">
                        <input class="form-control text-center article-count-input pr-1" type="number" value="${article.count}" min="1" article-pos="${i}"></input>
                    </div>
                </td>

                <td id="subtotal${i}" class="border-0 align-middle text-center">$${article.unitCost * article.count}</td>

                <td class="border-0 align-middle text-center"><button class="btn text-dark ml-1" onclick="removeArticle(${i})"><i class="fa fa-trash"></i></button></td>
            </tr>
            
        `;
    }

    htmlContentToAppend += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    productsContainer.innerHTML = htmlContentToAppend;

    articleCountInputs = document.querySelectorAll(".article-count-input");

    articleCountInputs.forEach((countInput) => countInput.addEventListener("change", (e) => changeProductCount(e.target.attributes["article-pos"].value, e.target.value)));

    showCosts();
}


function changeProductCount (pos, value) {
    let article = cart[pos];

    article.count = value;

    document.getElementById(`subtotal${pos}`).innerHTML = `$${article.unitCost * article.count}`;

    showCosts();
}

function removeArticle (pos) {
    cart.splice(pos, 1) 
    showArticles(cart)
}

function showCosts () {
    let subtotalCostHTML = document.getElementById("subtotalCost")
    let shippingCostHTML = document.getElementById("shippingCost")
    let totalCostHTML = document.getElementById("totalCost")

    let subtotalValue = cart.reduce((suma, x) => suma = suma + x.unitCost * x.count, 0)
    subtotalCostHTML.innerHTML = "$" + subtotalValue;

    let shippingValue = 0;

    if (shippingType >= 1) {
        shippingValue = Math.ceil(subtotalValue * shippingType);
        shippingCostHTML.innerHTML = "$" + shippingValue;
    }

    totalCostHTML.innerHTML = "$" + (subtotalValue + shippingValue);
    
}

function setShippingType (value) {
    shippingType = value;

    showCosts();
}

function checkForms (e) {
    if (shippingForm.checkValidity() === false) {
        shippingForm.classList.add("was-validated");
    } else  if (paymentForm.checkValidity() === false) {
        document.getElementById("paymentError").style.display="block";
    } else {
        document.getElementById("buySuccess").style.display="block";
        document.getElementById("paymentError").style.display="none";
    }
}

function changePayment (method) {
    if (method === "bank") {
        document.getElementById("cardNumber").setAttribute("disabled", "")
        document.getElementById("securityCode").setAttribute("disabled", "")
        document.getElementById("expiredDate").setAttribute("disabled", "")

        document.getElementById("accountNumber").removeAttribute("disabled", "")
    } else  {
        document.getElementById("cardNumber").removeAttribute("disabled", "")
        document.getElementById("securityCode").removeAttribute("disabled", "")
        document.getElementById("expiredDate").removeAttribute("disabled", "")

        document.getElementById("accountNumber").setAttribute("disabled", "")
    }
}
