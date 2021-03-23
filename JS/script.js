$(function () {

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
            <div id = "product" class = "col-4">
            <img src="${product.image}" alt="Product image" class = "img-fluid">
            ${product.title}
            </div>
            `
        });
    
        $(".row").prepend(output);
    }


});

