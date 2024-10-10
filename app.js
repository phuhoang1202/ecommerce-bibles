// Introduce
let currentIndexIntroduce = 0;
let productsDataIntroduce = [];

// Fetch data from JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    productsDataIntroduce = data.introduce; // Assign data to productsDataIntroduce
    showProduct(currentIndexIntroduce); // Show the first product
    showRelatedProducts(); // Show related products
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to display the current product
function showProduct(index) {
  const product = productsDataIntroduce[index];

  const productHTML = `
    <div class="img-product">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="detail-product">
      <div class="main-title-product">
        <div class="main-title">${product.name}</div>
        <div class="sub-title">
          <div>${product.author[0]}</div>
          <div class="dots">
            <img src="/assets/images/icon/IconDots.svg" alt="icon" />
          </div>
          <div>${product.author[1]}</div>
        </div>
      </div>
      <div class="price-product">
        <span>${product.discount}</span>${product.price} <span>${product.currency}</span>
      </div>
      <div class="sub-title-product">
        <div>${product.description[0]}</div>
        <div>${product.description[1]}</div>
      </div>
    </div>
  `;

  document.querySelector(".show-deital-product").innerHTML = productHTML;
}

// Function to display related products
function showRelatedProducts() {
  let relatedProductsHTML = "";

  productsDataIntroduce.forEach((product, index) => {
    if (index !== currentIndexIntroduce) {
      // Skip the main product
      relatedProductsHTML += `
        <div class="product-content" data-index="${index}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="title-book-main">
            <div class="title-book-sub">${product.name}</div>
            <div class="title-author">저자</div>
          </div>
        </div>
      `;
    }
  });

  document.querySelector(".list-product-content").innerHTML =
    relatedProductsHTML;

  // Add click event to change the main product when related product is clicked
  document.querySelectorAll(".product-content").forEach((item) => {
    item.addEventListener("click", function () {
      currentIndexIntroduce = parseInt(this.getAttribute("data-index"));
      showProduct(currentIndexIntroduce);
      showRelatedProducts(); // Refresh the related products
    });
  });
}

// Function to handle sliding effect
function slideProduct(direction) {
  const productElement = document.querySelector(".show-deital-product");

  // Add sliding effect
  if (direction === "next") {
    productElement.classList.add("slide-left");
  } else if (direction === "prev") {
    productElement.classList.add("slide-right");
  }

  // After animation ends, show the product and remove the sliding class
  setTimeout(() => {
    showProduct(currentIndexIntroduce);
    if (direction === "next") {
      productElement.classList.remove("slide-left");
    } else if (direction === "prev") {
      productElement.classList.remove("slide-right");
    }
  }, 500); // Matches the transition duration in CSS
}

// Event listeners for next and previous buttons
document.querySelector(".btn-next").addEventListener("click", () => {
  currentIndexIntroduce =
    (currentIndexIntroduce + 1) % productsDataIntroduce.length;
  slideProduct("next"); // Apply sliding effect for "next"
  showRelatedProducts();
});

document.querySelector(".btn-prev").addEventListener("click", () => {
  currentIndexIntroduce =
    (currentIndexIntroduce - 1 + productsDataIntroduce.length) %
    productsDataIntroduce.length;
  slideProduct("prev"); // Apply sliding effect for "prev"
  showRelatedProducts();
});

// New Product
let currentIndexNewPrd = 0;
const itemsPerPageNewPrd = 5;
let productsDataNewPrd = [];

// Fetch data from JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    productsDataNewPrd = data.newProducts;
    showProducts(currentIndexNewPrd);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to display products
function showProducts(startIndex) {
  const endIndex = startIndex + itemsPerPageNewPrd;
  const productsToShow = productsDataNewPrd.slice(startIndex, endIndex);

  let productHTML = "";
  productsToShow.forEach((product) => {
    productHTML += `
      <div class="new-product">
        <div class="new-product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="new-product-main">
          <div class="new-product-sub">${product.name}</div>
          <div class="title-author">${product.author}</div>
        </div>
        <div class="new-product-price">
          <div class="new-product-discount">${product.discount}</div>
          <div class="new-product-original-price">
            ${product.price} <span class="new-product-unit">${product.currency}</span>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".list-new-product").innerHTML = productHTML;
}

// Event listeners for next and previous buttons
document
  .querySelector(".btn-next-new-product")
  .addEventListener("click", () => {
    currentIndexNewPrd =
      (currentIndexNewPrd + itemsPerPageNewPrd) % productsDataNewPrd.length;
    showProducts(currentIndexNewPrd);
  });

document
  .querySelector(".btn-prev-new-product")
  .addEventListener("click", () => {
    currentIndexNewPrd =
      (currentIndexNewPrd - itemsPerPageNewPrd + productsDataNewPrd.length) %
      productsDataNewPrd.length;
    showProducts(currentIndexNewPrd);
  });

// Best product
let currentIndexBestPrd = 0;
const itemsPerPageBestPrd = 6;
let bestProductsData = [];

// Fetch data từ JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    bestProductsData = data.bestProducts;
    showBestProducts(currentIndexBestPrd);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Hàm để hiển thị sản phẩm
function showBestProducts(startIndex) {
  let endIndex = startIndex + itemsPerPageBestPrd;

  // Đảm bảo endIndex không vượt quá số lượng sản phẩm
  if (endIndex > bestProductsData.length) {
    endIndex = bestProductsData.length;
  }

  const productsToShow = bestProductsData.slice(startIndex, endIndex);
  let productHTML = "";

  productsToShow.forEach((product) => {
    productHTML += `
      <div class="best-product">
        <div class="best-product-image">
          <img src="${product.image}" alt="image" />
        </div>

        <div class="best-rating">
          <img src="${product.ratingImage}" alt="icon" />
          <div class="number-best">${product.numberBest}</div>
        </div>

        <div class="best-product-main">
          <div class="best-product-sub">${product.name}</div>

          <div class="title-author">${product.author}</div>

          <div class="new-product-price">
            <div class="new-product-discount">${product.discount}</div>
            <div class="new-product-original-price">
              ${product.price} <span class="new-product-unit">원</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".list-best-product").innerHTML = productHTML;
}

// Sự kiện cho nút Next
document.getElementById("btn-next-best").addEventListener("click", () => {
  currentIndexBestPrd += itemsPerPageBestPrd;

  // Nếu vượt quá số sản phẩm, quay về đầu danh sách
  if (currentIndexBestPrd >= bestProductsData.length) {
    currentIndexBestPrd = 0;
  }

  showBestProducts(currentIndexBestPrd);
});

// Sự kiện cho nút Prev
document.getElementById("btn-prev-best").addEventListener("click", () => {
  currentIndexBestPrd -= itemsPerPageBestPrd;

  // Nếu currentIndex nhỏ hơn 0, quay về cuối danh sách
  if (currentIndexBestPrd < 0) {
    currentIndexBestPrd = Math.max(
      0,
      bestProductsData.length - itemsPerPageBestPrd
    );
  }

  showBestProducts(currentIndexBestPrd);
});
