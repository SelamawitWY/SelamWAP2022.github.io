var productId = null;
let productDb = [];
var cartDb = [];
window.onload = function () {
  let accessToken = sessionStorage.getItem("accessToken");

  if (accessToken == "0" || accessToken == null) {
    viewLogin();
  } else {
    loadData();
  }

  document.getElementById("loginBtn").onclick = async function (event) {
    event.preventDefault();
    document.getElementById("errorMessage").style.visibility = "hidden";
    if (validateForm()) {
      await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.accessToken) {
            accessToken = res.accessToken;
            sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);

            loadData();
          } else {
            setLoginErrorMessage(res.error);
          }
        })
        .catch((err) => {
          // alert(err);
          setLoginErrorMessage(err);
        });
    }
  };

  document.getElementById("orderBtn").onclick = placeOrder;
};

async function loadData() {
  await fetchProducts();
  await fetchUserCart();
}
function validateForm() {
  if (
    !document.getElementById("username").value ||
    !document.getElementById("password").value
  ) {
    setLoginErrorMessage("Please enter username and password.");
    return false;
  } else {
    document.getElementById("errorMessage").style.visibility = "hidden";
    return true;
  }
}

function setServerErrorMessage(message) {
  if (message.toLowerCase().includes("unauthorized")) {
    sessionStorage.removeItem("accessToken");
    viewLogin();
  } else {
    document.getElementById("serverError").innerHTML = message;
    document.getElementById("serverError").style.visibility = "visible";
    setTimeout(function () {
      document.getElementById("serverError").style.visibility = "hidden";
    }, 5000);
  }
}

function setLoginErrorMessage(message) {
  document.getElementById("errorMessage").innerHTML = message;
  document.getElementById("errorMessage").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("errorMessage").style.visibility = "hidden";
  }, 5000);
}

function viewLogin() {
  document.getElementById("logoutDiv").style.display = "none";
  document.getElementById("loginDiv").style.display = "flex";
  document.getElementById("productDiv").style.display = "none";
  document.getElementById("welcomeDiv").style.display = "block";
  document.getElementById("cartSection").style.display = "none";
}

function viewProducts() {
  document.getElementById("logoutDiv").style.display = "flex";
  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("productDiv").style.display = "block";
  document.getElementById("welcomeDiv").style.display = "none";
  document.getElementById("cartSection").style.display = "block";

  let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
  let name = accessToken.split("-")[1];
  document.getElementById("nameSpan").innerHTML = name;

  document.getElementById("logoutBtn").onclick = function (e) {
    sessionStorage.removeItem("accessToken");
    viewLogin();
  };
}

function viewCart() {
  if (cartDb.length == 0) {
    document.getElementById("cartStatus").style.display = "block";
    document.getElementById("cartDiv").style.display = "none";
  } else {
    document.getElementById("cartStatus").style.display = "none";
    document.getElementById("cartDiv").style.display = "block";
  }
}

async function fetchProducts() {
  try {
    await fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((products) => {
        productDb = products;

        if (!products.error) {
          drawProductTable(products);
          viewProducts();
        } else {
          viewLogin();
        }
      });
  } catch (e) {
    viewLogin();
  }
}

async function fetchUserCart() {
  let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
  let userId = accessToken.split("-")[0];

  try {
    let response = await fetch(`http://localhost:3000/users/${userId}/carts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${sessionStorage.getItem("accessToken")}`,
      },
    });

    let carts = await response.json();

    if (!carts.error) {
      cartDb = carts;
      if (cartDb.length > 0) {
        drawCartTable(carts);
      }
      viewCart();
    } else {
      setServerErrorMessage("User Cart : " + carts.error);
    }
  } catch (e) {
    viewLogin();
  }
}

async function addProductToCart(productId, quantity) {
  if (sessionStorage.getItem("accessToken")) {
    let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
    let userId = accessToken.split("-")[0];
    let orderItem = cartDb.find((item) => item.productId == productId);

    if (orderItem) {
      updateUserCart(productId, quantity);
    } else {
      addUserCart(productId, quantity);
    }
  } else {
    viewLogin();
  }
}

async function addUserCart(id, quantity) {
  if (sessionStorage.getItem("accessToken")) {
    let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
    let userId = accessToken.split("-")[0];

    let response = await fetch(`http://localhost:3000/users/${userId}/carts`, {
      method: "POST",
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${sessionStorage.getItem("accessToken")}`,
      },
    });

    let carts = await response.json();

    if (!carts.error) {
      cartDb = carts;
      if (cartDb.length > 0) {
        drawCartTable(carts);
      }
      viewCart();
    } else {
      setServerErrorMessage("User Cart : " + carts.error);
    }
  } else {
    viewLogin();
  }
}

async function updateUserCart(id, quantity) {
  if (sessionStorage.getItem("accessToken")) {
    let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
    let userId = accessToken.split("-")[0];

    let response = await fetch(
      `http://localhost:3000/users/${userId}/carts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          quantity: quantity,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `${sessionStorage.getItem("accessToken")}`,
        },
      }
    );

    let carts = await response.json();

    if (!carts.error) {
      cartDb = carts;
      if (cartDb.length > 0) {
        drawCartTable(carts);
      }
      viewCart();
    } else {
      setServerErrorMessage("User Cart : " + carts.error);
    }
  } else {
    viewLogin();
  }
}

async function placeOrder() {
  if (sessionStorage.getItem("accessToken")) {
    let accessToken = sessionStorage.getItem("accessToken").split(" ")[1];
    let userId = accessToken.split("-")[0];

    let response = await fetch(
      `http://localhost:3000/users/${userId}/cart/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `${sessionStorage.getItem("accessToken")}`,
        },
      }
    );

    let result = await response.json();

    if (!result.error) {
      cartDb = result.cart;
      productDb = result.products;

      if (cartDb.length > 0) {
        drawCartTable(result.cart);
      }

      if (productDb.length > 0) {
        drawProductTable(result.products);
      }

      viewCart();
    } else {
      setServerErrorMessage("User placing order : " + result.error);
    }
  } else {
    viewLogin();
  }
}

function addProductButtonAction(name, val) {
  var buttons = document.getElementsByClassName(name);
  Array.from(buttons).forEach((button) => {
    button.onclick = function () {
      this.val = val;
      let product = productDb.find((product) => product.productId == this.id);
      let orderItem = cartDb.find((item) => item.productId == this.id);
      let quantity = orderItem ? orderItem.quantity : 0;

      if (quantity + this.val <= product.stock) {
        quantity = quantity + this.val;
        orderItem ? (orderItem.quantity = quantity) : null;
        addProductToCart(this.id, quantity);
      } else {
        setServerErrorMessage(
          `Product : Sorry, have only ${product.stock} ${product.name} product in stock.`
        );
      }
    };
  });
}

function drawCartTable(data) {
  let html = "";
  let total = 0;
  data.forEach((item) => {
    total += item.price * item.quantity;
    html += `
                <tr id=${item.productId}>
                  <td>${item.productName}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button id=${item.productId} class="minusButton">
                      <img src="../asset/minus.svg" />  
                    </button>
                    <input
                      autocomplete="off"
                      class="mx-2 quantity"
                      value= ${item.quantity}
                      id=${item.productId}
                      readonly
                      name="quantity"
                      min="1"
                      style="width: 48px; text-align: center; height: 32px;"
                    />
                    <button id=${item.productId} class="addButton">
                      <img src="../asset/add.svg" />
                    </button>
                </td>
                </tr>
              `;
  });
  document.getElementById("totalPrice").innerHTML = Number(
    parseFloat(total).toFixed(2)
  ).toLocaleString("en");
  document.getElementById("cartContent").innerHTML = html;
  addProductButtonAction("addButton", 1);
  addProductButtonAction("minusButton", -1);
}

function drawProductTable(data) {
  let html = "";
  data.forEach((product) => {
    html += `
        <tr id=${product.productId}>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img width = 40 src=http://localhost:3000${product.image} /></td>
          <td>${product.stock}</td>
          <td>
          <button id=${product.productId} class="addItemButton updateButton">
            <img width = 40 src="../asset/cart.png" />
          </button>
        </td>
        </tr>
      `;
  });

  document.getElementById("content").innerHTML = html;
  addProductButtonAction("addItemButton", 1);
}
