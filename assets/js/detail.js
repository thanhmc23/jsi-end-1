const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let product = [];
db.collection("main_products")
  .where("product_example_id", "==", id)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      document.getElementById("pro_name_detail").innerText =
        doc.data().product_name;
      document.getElementById("pro_price_detail").innerHTML = `${
        doc.data().product_price.toLocaleString("vi-VN")
      }<sup>₫</sup>`;
      document.getElementById("pro_rate_detail").innerText = `Đánh giá : ${
        doc.data().product_example_rate
      }⭐`;
      document.getElementById("pro_sold_detail").innerHTML = `Đã bán : ${
        doc.data().product_example_sold
      }K`;
      document.getElementById("pro_img_detail").src =
        doc.data().product_example_img;
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });


let base_id = null
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      base_id = user.uid;
    } else {
        console.log("Người dùng chưa đăng nhập.");

    }
});

console.log(base_id)


function addToCart() {
let sl =document.getElementById("sl").value
    const item = {
      id: id,
      number: sl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
  
    firebase.firestore()
      .collection("users")
      .doc(base_id)
      .collection("cart")
      .add(item)
      .then(() => {
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      });
}

