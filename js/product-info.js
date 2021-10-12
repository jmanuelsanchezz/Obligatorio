var product = {};
var currentCommentsArray = [];
var relatedProducts = [];

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    if (i === 0) {
      htmlContentToAppend += `      
    <div class="carousel-item active">
      <img src="${imageSrc}" class="d-block w-100">
    </div>`;
    } else if (i === 1) {
      htmlContentToAppend += `
      <div class="carousel-item">
        <img src="${imageSrc}" class="d-block w-100">
      </div>`;
    } else if (i === 2) {
      htmlContentToAppend += `
      <div class="carousel-item">
        <img src="${imageSrc}" class="d-block w-100">
      </div>`;
    } else if (i === 3) {
      htmlContentToAppend += `
      <div class="carousel-item">
        <img src="${imageSrc}" class="d-block w-100">
      </div>`;
    } else if (i === 4) {
      htmlContentToAppend += `
      <div class="carousel-item">
        <img src="${imageSrc}" class="d-block w-100">
      </div>`;
    }
    document.getElementById("productImagesGallery").innerHTML =
      htmlContentToAppend;
  }
}

function showScore(score) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      stars += `<span class="fa fa-star checked"></span>`;
    } else {
      stars += `<span class="fa fa-star"></span>`;
    }
  }
  return stars;
}

function showComments() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCommentsArray.length; i++) {
    let comment = currentCommentsArray[i];

    htmlContentToAppend +=
      `<dl id="description-list">
      <dd class="commentsLog">
        <p>` +
      showScore(comment.score) +
      `</p>
      </dd>

      <dd>
        <p id="user">` +
      comment.user +
      `</p>
      </dd>

      <dd>
        <p id="description">` +
      comment.description +
      `</p>
      </dd>

      <dd>
        <p id="dateTime">` +
      comment.dateTime +
      `</p>
      </dd>
    </dl>`;
  }

  document.getElementById("comments-container").innerHTML = htmlContentToAppend;
}

function getRating() {
  const ratingList = document.getElementsByName("rating");
  let ratingChecked = 0;
  for (let i = 0; i < ratingList.length; i++) {
    let item = ratingList[i];
    if (item.checked === true) {
      ratingChecked = parseInt(item.attributes[2].value);
    }
  }
  return ratingChecked;
}

function commentOnSubmit() {
  const newComment = {
    user: localStorage.getItem("user"),
    description: document.getElementById("comment-section").value,
    dateTime: new Date(),
    score: getRating(),
  };
  console.log(document.getElementsByName("rating"));
  currentCommentsArray.push(newComment);
  showComments();
  document.getElementById("comment-section").value = "";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML =
        document.getElementById("productDescription");
      let productCostHTML = document.getElementById("productCost");
      let productCategoryHTML = document.getElementById("productCategory");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.currency + " " + product.cost;
      productCategoryHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
    }
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCommentsArray = resultObj.data;
      showComments();
    }
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      relatedProducts = resultObj.data;
      let htmlContentToAppend = "";
      let counter = product.relatedProducts;

      for (let index = 0; index < counter.length; index++) {
        let content = counter[index];
        let productShow = relatedProducts[content];

        htmlContentToAppend +=
          `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
          productShow.imgSrc +
          `" alt="` +
          productShow.description +
          `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
          productShow.name +
          `</h4>                            
                        <p class="mb-1">` +
          productShow.currency +
          " " +
          productShow.cost +
          `</p>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">` +
          productShow.description +
          `</p>                        
                    </div>                   
                </div>
            </div>
        </a>
        `;
      }
      document.getElementById("related-prod-container").innerHTML =
        htmlContentToAppend;
    }
  });
});
