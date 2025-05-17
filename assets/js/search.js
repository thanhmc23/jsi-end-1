function loadProducts() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const sortOrder = document.getElementById("sortOrder").value;

  let query = db.collection("main_products");

  if (sortOrder === "date_desc") {
    query = query.orderBy("product_upload_date", "desc");
  } else if (sortOrder === "date_asc") {
    query = query.orderBy("product_upload_date", "asc");
  } else if (sortOrder === "rate_desc") {
    query = query.orderBy("product_example_rate", "desc");
  } else if (sortOrder === "rate_asc") {
    query = query.orderBy("product_example_rate", "asc");
  } else if (sortOrder === "price_desc") {
    query = query.orderBy("product_price", "desc");
  } else if (sortOrder === "price_asc") {
    query = query.orderBy("product_price", "asc");
  }
  

  query.get()
    .then((querySnapshot) => {
      document.getElementById("product1").innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const name = data.product_name || "";

        if (name.toLowerCase().includes(searchTerm)) {
          render_item1(
            data.product_example_id,
            data.product_example_img,
            data.product_example_rate,
            data.product_example_sold,
            name,
            data.product_price,
            data.product_upload_date,
            data.product_upload_date_formated
          );
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function render_item1(id, img, rate, sold, name, price, date, date_f) {
  const formatted = price.toLocaleString("vi-VN")
  console.log(formatted);
  let doc1 = document.getElementById("product1");
  doc1.innerHTML += `
  <div id="${id}" class="col-2 card-between-witd" onclick="goToDetail(this.id)">
    <div class="card" style="width: 13.5rem;">
      <img src="${img}" class="card-img-top img-rule" alt="${img}">
      <div class="card-body p-2 product">
        <p class="card-title product-name mb-1 text-start bold">${formatText(name)}</p>
        <p class="card-text product-price fs-6 mb-0 text-start fs-5"> 
          ${formatted}<sup>₫</sup>
        </p>
        <p class="card-text product-price fs-6 mb-0 text-start">⭐${rate}</p>
      </div>
    </div>
  </div>`;
}
