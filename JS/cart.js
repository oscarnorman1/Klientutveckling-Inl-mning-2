$(function() {

let storageArray = [];
let totalCost = new Number();
loadStorage();

function loadStorage() {
    let data = localStorage.getItem("cart");
    if(data !=null) {
        storageArray = JSON.parse(data);
        console.log(storageArray);
    }

    if(storageArray.length > 0) {
        for (let i = 0; i < storageArray.length; i++) {
            $("#tbodyTable").prepend(
                `
                <tr>
                <th scope="row">
                    <img src="${storageArray[i].productImage}" alt="" id="cartImage">
                </th>
                <td>
                    ${storageArray[i].productTitle}
                </td>
                <td>
                    <div class="number-input md-number-input">
                        <button class="btn btn-secondary" id="removeOneProduct">-</button>
                        <input min="1" name="quantity" value="${storageArray[i].productQuantity}" type="text" readonly="" id="cartQuantity">
                        <button class="btn btn-secondary" id="addOneProduct">+</button>
                      </div>
                </td>
                <td>
                    $${storageArray[i].productPrice}
                </td>
                <td>
                    <button class = "btn btn-warning p-1">Remove</button>
                </td>
                </tr>
                `
            )
        }
    }
}

$(document).on("click", "#remove-localStorage", function() {
    localStorage.clear();
})




});