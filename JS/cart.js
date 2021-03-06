$(function () {
  let cartArray = [];
  loadStorage();
  let totalCost = loadPrice();

  function loadStorage() {
    let data = localStorage.getItem("cart");
    if (data != null) {
      cartArray = JSON.parse(data);
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

  $(document).on("click", "#addOneProduct", function () {
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].productID == $(this).closest("#product").find("#productID").text().trim()) {
        cartArray[i].productQuantity++;
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
    const fullNameRGEX = /^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$/
    const phoneNumberRGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let email = $("#inputEmail").val();
    let fullName = $("#inputFullName").val();
    let phoneNumber = $("#inputPhoneNumber").val();
    let address = $("#inputAddress").val();
  
    if(!fullNameRGEX.test(fullName)) {
      $("#fullNameValidationText").html("");
      $("#fullNameValidationText").prepend("Enter a valid full name!");
    }

    if(!emailRGEX.test(email)) {
      $("#emailValidationText").html("");
      $("#emailValidationText").prepend("Enter a valid email!");
    }

    if(!phoneNumberRGEX.test(phoneNumber)) {
      $("#phoneNumberValidationText").html("");
      $("#phoneNumberValidationText").prepend("Enter a valid phone number!");
    }

    if(address.length === 0) {
      $("#addressValidationText").html("");
      $("#addressValidationText").prepend("Enter a valid address!");
    }
    
    if(fullNameRGEX.test(fullName) && emailRGEX.test(email) && 
       phoneNumberRGEX.test(phoneNumber) && address.length > 0) {
      alert("Order skickad!");
      $("#fullNameValidationText").html("");
      $("#emailValidationText").html("");
      $("#phoneNumberValidationText").html("");
      $("#addressValidationText").html("");

      localStorage.clear();
      window.location.href = "index.html";
    }
  
  }

});
