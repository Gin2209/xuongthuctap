// Khai báo các biến và kiểu dữ liệu
let bigImg = document.querySelector(".img-product-detail") as HTMLImageElement;
let product: any;
let quantity: number;

// Hàm để lấy thông tin chi tiết sản phẩm từ localStorage
const getProductDetail = async (): Promise<void> => {
  const store = localStorage.getItem("productDetail");

  if (store) {
    const productDetail = JSON.parse(store);
    const priceVnd = new Intl.NumberFormat("de-DE").format(productDetail.price);

    // Hiển thị thông tin chi tiết sản phẩm
    document.querySelector(".main-right")!.innerHTML = `
        <div class="info-product">
            <h1 class="name-product-detail">${productDetail.name}</h1>
            <p class="price-product-detail">${priceVnd} vnđ</p>
            <div class="capacity">Dung tích: 100ml</div>
          </div>
          <div class="action-product-detail">
            <div class="quantity">
              <input type="number" name="quantity" class="input-quantity-detail" value="1"/>
              <div class="action-quantity">
                <button class="btn-action" onclick="increase()">+</button>
                <button class="btn-action" onclick="decrease()">-</button>
              </div>
            </div>
            <button class="add-cart" type="button" onclick="addToCart(${productDetail.id})">THÊM VÀO GIỎ HÀNG</button>
          </div>
          <div class="intro-product-detail">
            <h2 class="title-intro">Mô tả</h2>
            <p class="intro-text">
          ${productDetail.intro}
            </p>
          </div>
    `;

    product = productDetail;
    bigImg.src = `../assets/product/product1/${productDetail.img}`;
  }
};

// Hàm tăng số lượng sản phẩm
const increase = (): void => {
  let quantity = parseInt((document.querySelector(".input-quantity-detail") as HTMLInputElement).value, 10);
  quantity = isNaN(quantity) ? 0 : quantity;
  quantity++;
  (document.querySelector(".input-quantity-detail") as HTMLInputElement).value = quantity.toString();
};

// Hàm giảm số lượng sản phẩm
const decrease = (): void => {
  let quantity = parseInt((document.querySelector(".input-quantity-detail") as HTMLInputElement).value, 10);
  quantity = isNaN(quantity) ? 0 : quantity;
  quantity--;
  (document.querySelector(".input-quantity-detail") as HTMLInputElement).value = quantity.toString();
};

// Hàm thêm sản phẩm vào giỏ hàng
let cart: { product: any; quantity: number }[] = [];

const addToCart = async (id: number): Promise<void> => {
  let storage = localStorage.getItem("cart");
  let quantity = Number((document.querySelector(".input-quantity-detail") as HTMLInputElement).value);

  if (storage) {
    cart = JSON.parse(storage);
  }

  const productInCart = cart.find((item) => item.product.id === id);
  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "./Cart.html";
};

// Khởi tạo
getProductDetail();
