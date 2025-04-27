// let date = new Date();

// for (let i = 0; i < 100; i++) {
//     db.collection("product").add({
//         name: i,
//         state: i+1*10-9+2-9+12,
//         country: i+10*69-92+12+11,
//         date : firebase.firestore.FieldValue.serverTimestamp()
//     })
//     .then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });
// }
function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}
function formatText(text) {
  let defult_letter = 24;
  if (text.length > defult_letter) {
    return text.slice(0, defult_letter - 1) + "...";
  } else {
    return text + "\n";
  }
}

let user_data_store = [];
const userList = JSON.parse(localStorage.getItem("user_data_store"));
console.log(userList);

db.collection("users")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      user_data_store.push({
        id: doc.id,
        ...doc.data(),
      });
      localStorage.setItem("user_data_store", JSON.stringify(user_data_store));
      console.log(user_data_store);
    });
  })
  .catch(function (error) {
    console.error("Lỗi khi lấy dữ liệu: ", error);
  });

let user_display = document.getElementById("user_display");
let sign_in = document.getElementById("sign-in");
const user_detail = [];
let userId = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.multiFactor.user);
    user_detail.push(user.multiFactor.user);
    var uid = user.uid;
    userId = user_detail[0].uid;
    localStorage.setItem("CurrentUserId", userId);
    sign_in.style.display = "none";
    // user.style.display="inline-block"
    var foundUser = userList.find(function (user_region) {
      return user_region.email === user.email;
    });
    user_display.innerText = `Xin chào , ${foundUser.username}`;
    console.log("Đang đăng nhập:", foundUser.username);
  } else {
    user_display_a.style.display = "none";
    // sign_in.style.display = "inline-block";
    console.log("Người dùng chưa đăng nhập.");
  }
});
console.log(user_detail);

const product_list = [];
function render_item() {
  let doc1 = document.getElementById("product");
  product_list.forEach((element) => {
    let display_price = element.product_price.split(";");
    doc1.innerHTML += `<div id="${
      element.product_example_id
    }" class="col-2 card-between-witd" onclick="goToDetail(this.id)">
    <div class="card" style="width: 13.5rem;">
    <img src="${
      element.product_example_img
    }" class="card-img-top img-rule" alt="${element.product_example_img}">
    <div class="card-body p-2 product">
    <p class="card-title product-name mb-1 text-start bold">${formatText(
      element.product_name
    )}</p>
    <p class="card-text product-price fs-6 mb-0 text-start fs-5"> ${
      display_price[0]
    }<sup>₫</sup></p>
    <p class="card-text product-price fs-6 mb-0 text-start">⭐${
      element.product_example_rate
    }</p>
  </div>
</div>
   

      
  </div>
    
  </div>
</div>
</div>`;
    console.log("thành công");
  });
}

db.collection("main_products")
  .orderBy("product_upload_date_formated", "desc")
  .limit(5)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      product_list.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    render_item();
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

// var docRef = db.collection("cities").doc("SF");

// docRef.get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
