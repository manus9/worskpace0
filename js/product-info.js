var comments = {};
var products = {};
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

    }
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let nameHTML  = document.getElementById("productName");
            let descriptionHTML = document.getElementById("productDescription");
            let costHTML = document.getElementById("productCost");
            let currency = document.getElementById("productCurrency")
            let soldCountHTML = document.getElementById("productSoldCount");

            nameHTML.innerHTML = product.name;
            descriptionHTML.innerHTML = product.description;
            costHTML.innerHTML = product.cost;
            currency.innerHTML = product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            console.log(product.relatedProducts)
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            relatedProducts = resultObj2.data;

            showRelatedProducts();
            
        }
    });
});

function showRelatedProducts(){

    let htmlContentToAppend = "";

    for(let i = 0; i < product.relatedProducts.length; i++){
        let relatedProduct = relatedProducts[i];
        htmlContentToAppend += `
        <div >
            <a href="product-info.html">
                <img  class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `" style="width:200px;"></a>
                <span style="padding-left: 10px;">`+ relatedProduct.name +`</span>
            
        </div>
        `
        
    }
        document.getElementById("related").innerHTML = htmlContentToAppend;
}


function showComments(){

    let htmlContentToAppend = "";

    for(let i = 0; i < comments.length; i++){
        let comentarioActual = comments[i];

        htmlContentToAppend += `
            <div class="comment-box">
                <div class="comment-head">
                    <div><b>` + comentarioActual.user + ` </b><span class="date"> ` + comentarioActual.dateTime + `</span></div><strong class="score"> score: `+ comentarioActual.score + `</strong>
                </div>   
                <p class="comment-description">` + comentarioActual.description + `</p>
            </div>
        `
    }
        document.getElementById("comment").innerHTML = htmlContentToAppend;

};  

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj3){
    if (resultObj3.status === "ok") {
        comments = resultObj3.data;
        console.log(comments);
        showComments();

    }
}); 
console.log(comments);

