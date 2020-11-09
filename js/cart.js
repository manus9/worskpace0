var cart;
var productsContainer;
var articleCountInputs;

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
});

function showArticles(cart){

    let htmlContentToAppend = `
        <div class="row" style="width: 106%">
            <div class="col-10 p-5 mb-4">
                <div class="table-responsive">
                    <table class="table">
                        <thead class="thead-light text-white">
                            <tr class="text-center">
                                <th scope="col" class="border-0">
                                    <div class="py-2 px-3 text-uppercase">Producto</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 px-3 text-uppercase">Cantidad</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 px-3 text-uppercase">Subtotal <small>(USD)</small></div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 px-3 text-uppercase">Eliminar</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                    `;
                    
    for (let i = 0; i < cart.length; i++) {
        let article = cart[i];

        if (article.currency === "UYU") {
            article.unitCost = article.unitCost / 40;
            article.currency = "USD";
        }

        htmlContentToAppend += `
            <tr class="border">
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
                        <input class="form-control text-center article-count-input" type="number" value="${article.count}" min="1" article-pos="${i}"></input>
                    </div>
                </td>

                <td id="subtotal${i}" class="border-0 align-middle text-center">$${article.unitCost * article.count}</td>

                <td class="border-0 align-middle text-center"><button class="btn text-dark ml-1"><i class="fa fa-trash"></i></button></td>
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

}

function changeProductCount (pos, value) {
    let article = cart[pos];

    article.count = value;

    document.getElementById(`subtotal${pos}`).innerHTML = `$${article.unitCost * article.count}`;
}