$(function () {

    let storageArray = [];
    load();

    function load() {
        fetch("https://webacademy.se/fakestore/")
            .then(resp => resp.json())
            .then(data => render(data))
            .catch(err => console.error(err));
    }
    
    function render(json) {
        console.log(json);
        let output = "";
    
        json.forEach((product) => {
            output += `
            <div id = "product" class = "col-3 border border-dark">
            <p id = "productTitle">
            ${product.title}
            </p>
            <img src="${product.image}" alt="Product image" class = "img-fluid" style="width: 200px; height: 200px">
            <p id = "productDescription">
            ${product.description}
            </p>
            <p id = "productPrice">
            ${product.price}$
            </p>
            <div class = "p-2">
            <button class="btn btn-primary" id="addToCartBtn">
            Add
            </button>
            </div>
            </div>
            `
        });
        $(".row").prepend(output);
    }

    $(document).on("click", "#addToCartBtn", function() {
        let item = $(this).
        storageArray.push
    })
});

