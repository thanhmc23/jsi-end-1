
function getUserCart() {
  db.collection('users')
    .doc(userId)
    .collection('cart')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data().id);
        console.log(doc.data().createdAt);
        let te = doc.data().createdAt
        var milliseconds = te.seconds * 1000 + te.nanoseconds / 1000000;
        var date = new Date(milliseconds);
        getDocIdByProductExampleId(doc.data().id,doc.data().number,date.toLocaleString('vi-VN'));
        
        // console.log(doc.);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}
function getDocIdByProductExampleId(exampleId,num,date) {
    db.collection('main_products')
      .where('product_example_id', '==', exampleId)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          console.log('Không tìm thấy document nào.');
        } 
        else {
          querySnapshot.forEach(function(doc) {
            console.log('Document ID:', doc.id);
            console.log('Dữ liệu:', doc.data());
            document.getElementById("respond_item").innerHTML += `<div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${doc.data().product_example_img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${doc.data().product_name}</h5>
        <p class="card-text">Giá sản phẩm : ${doc.data().product_price}</p>
        <p class="card-text">Số lượng đã đặt : ${num}</p>

        <p class="card-text"><small class="text-body-secondary">Được thêm vào giỏ hàng lúc ${date}</small></p>
      </div>
    </div>
  </div>
</div>`
            
          });
        }
      })
      .catch(function(error) {
        console.error('Lỗi khi tìm document:', error);
      });
}
