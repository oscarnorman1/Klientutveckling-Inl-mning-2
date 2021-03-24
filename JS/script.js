$(function () {

    let productArray = [];
    let storageArray = [];
    load();

    function load() {
        fetch("https://webacademy.se/fakestore/")
            .then(resp => resp.json())
            .then(function (data) {
                render(data);
                loadArray(data);
            })
            .catch(err => console.error(err));
    }
    
    function loadArray(json) {
        json.forEach((product) => {
            let prod = {
                productID: product.id,
                productTitle: product.title,
                productDescription: product.description,
                productImage: product.image,
                productPrice: product.price,
                productCategory: product.category
            }
            productArray.push(prod);
        });
        console.log(productArray[0]);
    }

    function render(json) {
        console.log(json);
        let output = "";
        json.forEach((product) => {
            output += `
            <div id = "product" class = "col-4 border border-dark">
            <div id = "productID" style = "display: none;">
            ${product.id}
            </div>
            <p id = "productTitle">
            ${product.title}
            </p>
            <img src="${product.image}" alt="Product image" class = "img-fluid" style="width: 200px; height: 200px">
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
            `
        });
        $(".row").prepend(output);
    }

    $(document).on("click", "#addToCartBtn", function() {
        for(let i = 0; i < productArray.length; i++) {
            if(productArray[i].productID == $(this).closest("#product").find("#productID").text().trim()) {
                storageArray.push(productArray[i]);
                localStorage.setItem("cart", JSON.stringify(storageArray));
            }
        }
    })
});

