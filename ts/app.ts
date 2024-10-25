interface Product {
    id: number;
    name: string;
    price: string;
    img: string;
  }
  
  let products: Product[] = [];
  let cart: { product: Product; quantity: number }[] = [];
  
  // Lấy danh sách sản phẩm từ JSON
  fetch("../db.json")
    .then((res) => res.json())
    .then((data) => {
      const productsList = data.products.map((item: Product) =>
        ` <div class="product-item">
              <img
                src="./assets/product/product1/${item.img}"
                class="img-product"
                alt=""
              />
              <span class="name-product">${item.name}</span>
              <p class="price-product">${item.price} vnđ</p>
              <div class="button-action">
              <button class="btn-add" type="button" onclick="addToCart(${item.id})">Mua</button>
              <button class="btn-detail" type="button" onclick="addProductDetail(${item.id})">Xem chi tiết</button>
              </div>  
            </div>`
      );
  
      const productHtml = productsList.join("");
      const productContainer = document.querySelector(".list-product");
      if (productContainer) {
        productContainer.innerHTML = productHtml;
      }
    });
  
  // Hàm xem chi tiết sản phẩm
  const addProductDetail = async (id: number): Promise<void> => {
    try {
      fetch("../db/product.json")
        .then((res) => res.json())
        .then((data) => {
          const productDetail = data.products.find((item: Product) => item.id === id);
          if (productDetail) {
            window.localStorage.setItem(
              "productDetail",
              JSON.stringify(productDetail)
            );
          }
        });
      window.location.href = "../view/ProductDetail.html";
    } catch (error) {
      console.log(error);
    }
  };
  
  // Hàm thêm vào giỏ hàng
  const addToCart = async (id: number): Promise<void> => {
    let storage = localStorage.getItem("cart");
    let quantity = 1;
    
    if (storage) {
      cart = JSON.parse(storage);
    }
  
    try {
      fetch("../db/product.json")
        .then((res) => res.json())
        .then((data) => {
          const product = data.products.find((item: Product) => item.id === id);
          if (product) {
            const item = cart.find((c) => c.product.id === id);
            if (item) {
              item.quantity += 1;
            } else {
              cart.push({ product, quantity });
            }
            window.localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      window.location.href = "../view/Cart.html";
    } catch (error) {
      console.log(error);
    }
  };
  