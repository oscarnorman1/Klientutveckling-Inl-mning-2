$(function () {
  let cartArray = [];
  loadStorage();
  let totalCost = loadPrice();
  console.log(totalCost);

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
  
  $("#totalCost").prepend("$" + totalCost);

  function loadPrice() {
      let temp = 0;
      for(let i = 0; i < cartArray.length; i++) {
        temp += cartArray[i].productPrice * cartArray[i].productQuantity;
      }
      return temp.toFixed(2);
  }

  function updatePrice() {
      totalCost = 0;

      if(cartArray.length > 0) {
        for(let i = 0; i < cartArray.length; i++) {
          totalCost += cartArray[i].productPrice * cartArray[i].productQuantity;
          $("#totalCost").html("$" + totalCost.toFixed(2));
        }
      } else {
        $("#totalCost").html("$" + totalCost.toFixed(2));
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
        updatePrice();
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
          updatePrice();
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
            updatePrice();
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
    }
  });

  $(document).on("click", "#orderButton", function() {
    validate();
  })

  function validate() {
    const emailRGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const fullNameRGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    const phoneNumberRGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const addressRGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    let email = $("#inputEmail").val();
    let fullName = $("#inputFullName").val();
    let phoneNumber = $("#inputPhoneNumber").val();
    let address = $("#inputAddress").val();
    
    // TODO FIXA REGEX!!!!

    console.log("NAME REGEX");
    console.log(fullNameRGEX.test(fullName));
    console.log("EMAIL REGEX");
    console.log(emailRGEX.test(email));
    console.log("PHONE NUMBER REGEX");
    console.log(phoneNumberRGEX.test(phoneNumber));
    console.log("ADDRESS REGEX");
    console.log(addressRGEX.test(address));
  }

});
