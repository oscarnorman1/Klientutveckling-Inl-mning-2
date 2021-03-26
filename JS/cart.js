$(function () {
  let cartArray = [];
  let totalCost = new Number();
  loadStorage();

  function loadStorage() {
    let data = localStorage.getItem("cart");
    if (data != null) {
      cartArray = JSON.parse(data);
      console.log(cartArray);
    }

    if (cartArray.length > 0) {
      for (let i = 0; i < cartArray.length; i++) {
        $("#tbodyTable").prepend(
          `
                <tr id = "product">
                <th scope="row">
                    <img src="${cartArray[i].productImage}" alt="" id="cartImage">
                </th>
                <td>
                <div id = "productID" style = "display: none;">
                         ${cartArray[i].productID}
                    </div>
                    ${cartArray[i].productTitle}
                </td>
                <td>
                    <div class="number-input md-number-input">
                        <button class="btn btn-secondary" id="removeOneProduct">-</button>
                        <input min="1" name="quantity" value="${cartArray[i].productQuantity}" type="text" readonly="" id="cartQuantity">
                        <button class="btn btn-secondary" id="addOneProduct">+</button>
                      </div>
                </td>
                <td>
                    $${cartArray[i].productPrice}
                </td>
                <td>
                    <button class = "btn btn-warning p-1" id = "removeBtn">Remove</button>
                </td>
                </tr>
                `
        );
      }
    }
  }

  $(document).on("click", "#remove-localStorage", function () {
    localStorage.clear();
  });

  $(document).on("click", "#addOneProduct", function () {
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].productID == $(this).closest("#product").find("#productID").text().trim()) {
        cartArray[i].productQuantity++;
        console.log(cartArray[i].productQuantity);
        $(this)
          .closest("#product")
          .find("#cartQuantity")
          .val(cartArray[i].productQuantity);
          localStorage.setItem("cart", JSON.stringify(cartArray));
      }
    }
  });

  $(document).on("click", "#removeOneProduct", function () {
    for (let i = 0; i < cartArray.length; i++) {
      if (
        cartArray[i].productID ==
        $(this).closest("#product").find("#productID").text().trim()
      ) {
        if (cartArray[i].productQuantity > 1) {
          cartArray[i].productQuantity--;
          console.log(cartArray[i].productQuantity);
          $(this)
            .closest("#product")
            .find("#cartQuantity")
            .val(cartArray[i].productQuantity);
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
      }
    }
  });

  $(document).on("click", "#removeBtn", function() {
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i].productID == $(this).closest("#product").find("#productID").text().trim()) {
            cartArray.splice(i, 1);
            $(this).closest("#product").remove();
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
    }
    
  });

});
