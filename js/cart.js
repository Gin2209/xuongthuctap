// Lấy giỏ hàng từ localStorage
var store = localStorage.getItem("cart");
// Kiểm tra nếu giỏ hàng tồn tại trong localStorage
var cart = store ? JSON.parse(store) : [];
var totalPayment = 0;
var totalPrice = 0;
// Truy xuất phần tử HTML có class 'no-data'
var noData = document.querySelector(".no-data");
// Hàm hiển thị giỏ hàng
var showCart = function (cart) {
    var listProductCart = "";
    for (var i = 0; i < cart.length; i++) {
        totalPrice = cart[i].quantity * cart[i].product.price;
        listProductCart += "\n        <div class=\"item-cart\">\n              <img src=\"../assets/product/product1/".concat(cart[i].product.img, "\" class=\"img-product-cart\" alt=\"\" />\n              <div class=\"info-product-cart\">\n                <a href=\"#\" class=\"name-product-cart\">").concat(cart[i].product.name, " - 100ml</a>\n                <span class=\"price-product-cart\">").concat(new Intl.NumberFormat("de-DE").format(cart[i].product.price), " vn\u0111</span>\n              </div>\n              <div class=\"product-quantity\">\n                <div class=\"quantity\">\n                  <input type=\"number\" onchange=\"HandleChangeInput(this.value, ").concat(cart[i].product.id, ")\" class=\"input-quantity\" value=\"").concat(cart[i].quantity, "\" />\n                   <div class=\"action-quantity\">\n                     <button class=\"btn-action\" onclick=\"increase(").concat(cart[i].product.id, ")\">\n                       +\n                     </button>\n                     <button class=\"btn-action\" onclick=\"decrease(").concat(cart[i].product.id, ")\">\n                       -\n                     </button>\n                   </div>\n                </div>\n                <button class=\"icon-delete\" type=\"button\" onclick=\"deleteItemCart(").concat(cart[i].product.id, ")\">\n                  \u00D7\n                </button>\n                <p class=\"total-quantity\">").concat(new Intl.NumberFormat("de-DE").format(totalPrice), " vn\u0111</p>\n              </div>\n            </div>\n        ");
    }
    // Kiểm tra nếu không có dữ liệu trong giỏ hàng
    if (cart.length === 0 && noData) {
        noData.style.display = "block";
    }
    else if (noData) {
        noData.style.display = "none";
    }
    // Tính tổng tiền
    subTotal();
    // Hiển thị danh sách sản phẩm trong giỏ hàng
    var productCartElement = document.querySelector(".list-product-cart");
    if (productCartElement) {
        productCartElement.innerHTML = listProductCart;
    }
};
// Hàm tính tổng số tiền
function subTotal() {
    var totalMoney = 0;
    for (var i = 0; i < cart.length; i++) {
        totalMoney += cart[i].quantity * cart[i].product.price;
    }
    var provisionalElement = document.querySelector(".price-provisional");
    var paymentElement = document.querySelector(".total-payment");
    if (provisionalElement && paymentElement) {
        provisionalElement.innerHTML = "".concat(new Intl.NumberFormat("de-DE").format(totalMoney), " vn\u0111");
        paymentElement.innerHTML = "".concat(new Intl.NumberFormat("de-DE").format(totalMoney), " vn\u0111");
    }
}
// Hàm xử lý khi thay đổi số lượng sản phẩm trong giỏ hàng
function HandleChangeInput(value, id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.id === id) {
            cart[i].quantity = Number(value);
        }
    }
    showCart(cart);
}
// Hàm xóa sản phẩm khỏi giỏ hàng
var deleteItemCart = function (id) {
    var store = localStorage.getItem("cart");
    if (store) {
        cart = JSON.parse(store);
    }
    cart = cart.filter(function (item) { return item.product.id !== id; });
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart(cart);
};
// Hàm tăng số lượng sản phẩm
var increase = function (id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.id === id) {
            cart[i].quantity += 1;
        }
    }
    showCart(cart);
};
// Hàm giảm số lượng sản phẩm
var decrease = function (id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.id === id && cart[i].quantity > 1) {
            cart[i].quantity -= 1;
        }
    }
    showCart(cart);
};
// Hiển thị giỏ hàng khi trang được load
showCart(cart);
var order;
// Hàm xử lý thanh toán
var handlePayment = function () {
    order = { cart: cart, total: totalPayment };
    localStorage.setItem("order", JSON.stringify(order));
    alert("Thanh toán thành công");
    localStorage.removeItem("cart");
    location.reload();
    totalPayment = 0;
};
