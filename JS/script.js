$(function () {
  let productArray = [];
  let cartArray = new Array();
  load();
  loadCart();

  function load() {
    fetch("https://webacademy.se/fakestore/")
      .then((resp) => resp.json())
      .then(function (data) {
        render(data);
        loadArray(data);
      })
      .catch((err) => console.error(err));
  }

  function loadArray(json) {
    json.forEach((product) => {
      let prod = {
        productID: product.id,
        productTitle: product.title,
        productDescription: product.description,
        productImage: product.image,
        productPrice: product.price,
        productCategory: product.category,
        productQuantity: 1,
      };
      productArray.push(prod);
    });
  }

  function render(json) {
    let output = "";
    json.forEach((product) => {
      output += `
            <div id = "product" class = "col-lg-4 col-sm-12 col-md-6 border border-dark">
            <div id = "productID" style = "display: none;">
            ${product.id}
            </div>
            <p id = "productTitle">
            ${product.title}
            </p>
            <img src="${product.image}" alt="Product image" class = "img-fluid" style="width: 150px; height: 150px">
            <p id = "productDescription">
            ${product.description}
            </p>
            <p id = "productPrice">
            $${product.price}
            </p>
            <div class = "p-2">
            <button class="btn btn-primary" id="addToCartBtn">
            Add to cart
            </button>
            </div>
            </div>
            `;
    });
    $(".row").prepend(output);
  }

  function loadCart() {
    let data = localStorage.getItem("cart");
    if (data != null) {
      cartArray = JSON.parse(data);
    }
  }

  $(document).on("click", "#addToCartBtn", function () {
    for (let i = 0; i < productArray.length; i++) {
      if (productArray[i].productID == $(this).closest("#product").find("#productID").text().trim()) {
        
        if (cartArray.length == 0 || cartArray == undefined) {
          cartArray.push(productArray[i]);
          localStorage.setItem("cart", JSON.stringify(cartArray));
          window.location.href = "cart.html";
          return;
        } else {
          for (let j = 0; j < cartArray.length; j++) {
            for (let k = 0; k < productArray.length; k++) {
              if (productArray[i].productID == cartArray[j].productID) {
                cartArray[j].productQuantity++;
                localStorage.setItem("cart", JSON.stringify(cartArray));
                window.location.href = "cart.html";
                return;
              }
            }
          }
          cartArray.push(productArray[i]);
          localStorage.setItem("cart", JSON.stringify(cartArray));
          window.location.href = "cart.html";
        }
      }
    }
  });

  });
