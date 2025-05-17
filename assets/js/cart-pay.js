let currentProduct = { name: "", price: 0 , num : 0};
let base_id = null
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      base_id = user.uid;
    } else {
        console.log("Người dùng chưa đăng nhập.");

    }
});
function toggleCardFields() {
    const payment = document.getElementById("payment").value;
    const cardFields = document.getElementById("cardFields");
    if (payment === "card") {
      cardFields.classList.remove("d-none");
    } else {
      cardFields.classList.add("d-none");
    }
  }
let num1 = 0
function openCheckout(name, price , num) {
  currentProduct.name = name;
  currentProduct.price = price;
  currentProduct.num = num
  num1=num
  console.log(num1)

  document.getElementById("productInfo").textContent = `${name} - ${price.toLocaleString()}đ`;

  const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();
}

function fakeCheckout() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;
  const error = document.getElementById("errorMsg");

  if (!name || !email || !address || !payment) {
    error.classList.remove("d-none");
    return;
  }
  error.classList.add("d-none");

  // Ẩn modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("checkoutModal")
  );
  modal.hide();

  const alredyPayItem = {
    payName : name,
    payEmail : email,
    payAddress : address,
    payPhoneNum : document.getElementById("phoneNum").value,
    payPayment : payment,
    payPaymentCard : document.getElementById("cardNumber").value,
    payPaymentCardExp : document.getElementById("cardExpiry").value,
    payPaymentCardCVV : document.getElementById("cardCVV").value,
    itemId: CurrentItemId,
    quantility: num1,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  firebase.firestore()
      .collection("users")
      .doc(base_id)
      .collection("purchase")
      .add(alredyPayItem)
      .then(() => {
        deleteItemDoc()
        document.getElementById("successAlert").innerHTML = `🎉 Bạn đã thanh toán <strong>${currentProduct.name}</strong> (${currentProduct.price.toLocaleString()}đ) thành công!`;
        document.getElementById("successAlert").classList.remove("d-none");
      })
      .catch((error) => {
        console.error(error);
      });

  // Hiện thông báo thành công
  document.getElementById("successAlert").innerHTML = `🎉 Bạn đã thanh toán <strong>${currentProduct.name}</strong> (${currentProduct.price.toLocaleString()}đ) thành công!`;
  document.getElementById("successAlert").classList.remove("d-none");

  // Reset form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("payment").value = "";
}
