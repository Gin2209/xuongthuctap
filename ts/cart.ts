// Lấy giỏ hàng từ localStorage
const store = localStorage.getItem("cart");
let cart: { product: any; quantity: number }[] = store ? JSON.parse(store) : [];

// Hàm hiển thị giỏ hàng
const showCart = (): void => {
  let listProductCart = "";
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice = cart[i].quantity * cart[i].product.price;

    listProductCart += `
        <div class="item-cart">
          <img src="../assets/product/product1/${cart[i].product.img}" class="img-product-cart" alt="" />
          <div class="info-product-cart">
            <a href="#" class="name-product-cart">${cart[i].product.name} - 100ml</a>
            <span class="price-product-cart">${new Intl.NumberFormat("de-DE").format(cart[i].product.price)} vnđ</span>
          </div>
          <div class="product-quantity">
            <input type="number" onchange="HandleChangeInput(this.value, ${cart[i].product.id})" class="input-quantity" value="${cart[i].quantity}" />
            <div class="action-quantity">
              <button class="btn-action" onclick="increase(${cart[i].product.id})">+</button>
              <button class="btn-action" onclick="decrease(${cart[i].product.id})">-</button>
            </div>
          </div>
          <button class="icon-delete" type="button" onclick="deleteItemCart(${cart[i].product.id})">×</button>
          <p class="total-quantity">${new Intl.NumberFormat("de-DE").format(Number(totalPrice))} vnđ</p>
        </div>
    `;
  }

  document.querySelector(".list-product-cart")!.innerHTML = listProductCart;
  subTotal();
};

// Hàm tính tổng tiền
const subTotal = (): void => {
  let totalMoney = 0;

  for (let i = 0; i < cart.length; i++) {
    totalMoney += cart[i].quantity * cart[i].product.price;
  }

  document.querySelector(".price-provisional")!.innerHTML = `${new Intl.NumberFormat("de-DE").format(Number(totalMoney))} vnđ`;
  document.querySelector(".total-payment")!.innerHTML = `${new Intl.NumberFormat("de-DE").format(Number(totalMoney))} vnđ`;
};

// Hàm thay đổi số lượng sản phẩm
const HandleChangeInput = (value: string, id: number): void => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      cart[i].quantity = Number(value);
    }
  }
  showCart();
};

// Hàm xóa sản phẩm khỏi giỏ hàng
const deleteItemCart = (id: number): void => {
  cart = cart.filter((item) => item.product.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
};

// Hàm tăng số lượng sản phẩm
const increase = (id: number): void => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      cart[i].quantity++;
    }
  }
  showCart();
};

// Hàm giảm số lượng sản phẩm
const decrease = (id: number): void => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      cart[i].quantity--;
    }
  }
  showCart();
};

// Hiển thị giỏ hàng khi khởi động
showCart();
