var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Chọn hình ảnh lớn của sản phẩm
var bigImg = document.querySelector(".img-product-detail");
var product = [];
var quantity;
// Hàm lấy thông tin chi tiết sản phẩm từ localStorage
var getProductDetail = function () { return __awaiter(_this, void 0, void 0, function () {
    var store, productDetail, priceVnd;
    return __generator(this, function (_a) {
        store = localStorage.getItem("productDetail");
        if (store) {
            productDetail = JSON.parse(store);
            priceVnd = new Intl.NumberFormat("de-DE").format(productDetail.price);
            document.querySelector(".main-right").innerHTML = "\n      <div class=\"info-product\">\n          <h1 class=\"name-product-detail\">".concat(productDetail.name, "</h1>\n          <p class=\"price-product-detail\">").concat(priceVnd, " vn\u0111</p>\n          <div class=\"capacity\">Dung t\u00EDch: 100ml</div>\n        </div>\n        <div class=\"action-product-detail\">\n          <div class=\"quantity\">\n            <input type=\"number\" name=\"quantity\" class=\"input-quantity-detail\" value=\"1\"/>\n            <div class=\"action-quantity\">\n              <button class=\"btn-action\" onclick=\"increase()\">+</button>\n              <button class=\"btn-action\" onclick=\"decrease()\">-</button>\n            </div>\n          </div>\n          <button class=\"add-cart\" type=\"button\" onclick=\"addToCart(").concat(productDetail.id, ")\">TH\u00CAM V\u00C0O GI\u1ECE H\u00C0NG</button>\n        </div>\n        <div class=\"intro-product-detail\">\n          <h2 class=\"title-intro\">M\u00F4 t\u1EA3</h2>\n          <p class=\"intro-text\">\n        ").concat(productDetail.intro, "\n          </p>\n        </div>\n    ");
            product = productDetail;
            if (bigImg) {
                bigImg.src = "../assets/product/product1/".concat(productDetail.img);
            }
        }
        return [2 /*return*/];
    });
}); };
// Hàm tăng số lượng sản phẩm
var increase = function () {
    var quantityInput = document.querySelector(".input-quantity-detail");
    var currentQuantity = parseInt(quantityInput.value, 10);
    currentQuantity = isNaN(currentQuantity) ? 1 : currentQuantity;
    quantityInput.value = (currentQuantity + 1).toString();
};
// Hàm giảm số lượng sản phẩm
var decrease = function () {
    var quantityInput = document.querySelector(".input-quantity-detail");
    var currentQuantity = parseInt(quantityInput.value, 10);
    currentQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;
    if (currentQuantity > 1) {
        quantityInput.value = (currentQuantity - 1).toString();
    }
};
// Hàm thêm sản phẩm vào giỏ hàng
var cart = [];
var addToCart = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var storage, quantity, productInCart;
    return __generator(this, function (_a) {
        storage = localStorage.getItem("cart");
        quantity = parseInt(document.querySelector(".input-quantity-detail").value, 10);
        if (storage) {
            cart = JSON.parse(storage);
        }
        productInCart = cart.find(function (item) { return item.product.id === id; });
        if (productInCart) {
            productInCart.quantity += quantity;
        }
        else {
            cart.push({ product: product, quantity: quantity });
        }
        window.localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "./Cart.html";
        return [2 /*return*/];
    });
}); };
// Gọi hàm để hiển thị thông tin sản phẩm chi tiết khi trang được load
getProductDetail();
