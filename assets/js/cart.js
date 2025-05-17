let count = 1
let count_current = 1;
let count_new = 1;
let CurrentId = null;
let CurrentItemId = null;
const counterInput  = document.getElementById('counter');
function getIdone(element) {
  CurrentItemId = element.id;
}
function multiplyAndFormatWithDots(stringNumber,multiplyNum) {

  const multipliedNumber = stringNumber * multiplyNum;

  const formattedResult = multipliedNumber.toLocaleString('en-US').replace(/,/g, '.');

  return formattedResult;
}

function getId(button) {
  const parentDiv = button.closest('.card.mb-3'); 
  if (parentDiv) {
      CurrentId = parentDiv.id;
      console.log('ID của thẻ cha:', parentDiv.id);
  } else {
      console.log('Không tìm thấy thẻ cha.');
  }
}

const localUserId = localStorage.getItem("CurrentUserId");
function getUserPurchase() {
  db.collection('users')
    .doc(localUserId)
    .collection('purchase')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        document.getElementById("start").style.display="none"
        console.log(doc.data())
        let te = doc.data().createdAt
        var milliseconds = te.seconds * 1000 + te.nanoseconds / 1000000;
        var date = new Date(milliseconds);
        getDocIdByProductExampleIdPurchase(doc.data().itemId,doc.data().quantility,date.toLocaleString('vi-VN'),doc.id);
        
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}
function getUserCart() {
  db.collection('users')
    .doc(localUserId)
    .collection('cart')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        document.getElementById("start").style.display="none"
        console.log(doc.id)
        let te = doc.data().createdAt
        var milliseconds = te.seconds * 1000 + te.nanoseconds / 1000000;
        var date = new Date(milliseconds);
        getDocIdByProductExampleId(doc.data().id,doc.data().number,date.toLocaleString('vi-VN'),doc.id);
        
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}
function getDocIdByProductExampleId(exampleId,num,date,firebaseCartId) {
  db.collection('main_products')
    .where('product_example_id', '==', exampleId)
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.empty) {
        console.log('Không tìm thấy document nào.');
      } 
      else {
        querySnapshot.forEach(function(doc) {
          let complete_price = multiplyAndFormatWithDots(doc.data().product_price,num)
          document.getElementById("respond_item").innerHTML += `<div class="card mb-3 cart-item" id=${firebaseCartId}>
<div class="row g-0" id=${firebaseCartId}>
  <div class="col-md-2">
    <img src="${doc.data().product_example_img}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-10">
    <div class="card-body">
      <h5 class="card-title">${doc.data().product_name}</h5>
      <p class="card-text mb-0">Giá sản mỗi phẩm : ${doc.data().product_price.toLocaleString('en-US').replace(/,/g, '.')}<sup>₫</sup></p>
      <p class="card-text mb-0">Số lượng đã đặt : ${num}</p>
      <p class="card-text mb-0">Thanh tiền ( Giá sản mỗi phẩm x Số lượng đã đặt) : ${complete_price}<sup>₫</sup></p>
      <p class="card-text mb-1"><small class="text-body-secondary">Được thêm vào giỏ hàng lúc ${date}</small></p>
      <button type="button" id="${exampleId}" class="btn btn-success" onclick="getIdone(this);getId(this);openCheckout('${doc.data().product_name} x ${num}', ${complete_price.replace(/\./g, "")} , ${num})">Thanh toán ngay</button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getId(this)">Chỉnh sửa mặt hàng</button>
      <button type="button" class="btn btn-danger" onclick="getId(this)" data-bs-toggle="modal" data-bs-target="#delmodal">Xoá mặt hàng</button>


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
function getDocIdByProductExampleIdPurchase(exampleId,num,date,firebaseCartId) {
    db.collection('main_products')
      .where('product_example_id', '==', exampleId)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          console.log('Không tìm thấy document nào.');
        } 
        else {
          querySnapshot.forEach(function(doc) {
            let complete_price = multiplyAndFormatWithDots(doc.data().product_price,num)
            document.getElementById("respond_item").innerHTML += `<div class="card mb-3 cart-item" id=${firebaseCartId}>
  <div class="row g-0" id=${firebaseCartId}>
    <div class="col-md-2">
      <img src="${doc.data().product_example_img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <h5 class="card-title">${doc.data().product_name}</h5>
        <p class="card-text mb-0">Giá sản mỗi phẩm : ${doc.data().product_price.toLocaleString('en-US').replace(/,/g, '.')}<sup>₫</sup></p>
        <p class="card-text mb-0">Số lượng đã đặt : ${num}</p>
        <p class="card-text mb-0">Thanh tiền ( Giá sản mỗi phẩm x Số lượng đã đặt) : ${complete_price}<sup>₫</sup></p>
        <p class="card-text mb-1"><small class="text-body-secondary">Được thanh toán lúc lúc ${date}</small></p>
        <button type="button" class="btn btn-danger" onclick="getId(this)" data-bs-toggle="modal" data-bs-target="#cancelmodal">Huỷ mặt hàng</button>


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
function deleteItemDoc() {
  var db = firebase.firestore();

  db.collection('users')
    .doc(localUserId)
    .collection('cart')
    .doc(CurrentId)
    .delete()
    .then(function() {
        alert("Xoá thành công!")
        location.reload();
        console.log("Document đã được xoá thành công!");
    })
    .catch(function(error) {
        console.error("Lỗi khi xoá document: ", error);
    });
}
function calloffItem() {
  var db = firebase.firestore();

  db.collection('users')
    .doc(localUserId)
    .collection('purchase')
    .doc(CurrentId)
    .delete()
    .then(function() {
        alert("Xoá thành công!")
        location.reload();
        console.log("Document đã được xoá thành công!");
    })
    .catch(function(error) {
        console.error("Lỗi khi xoá document: ", error);
    });
}
function updateSubcollectionDocument() {
  db.collection('users')      
    .doc(localUserId)              
    .collection('cart')       
    .doc(CurrentId)               
    .update({
      number:count_current,
    })
    .then(function() {
      console.log("Cập nhật thành công!");
      alert("Cập nhật thành công!")
      location.reload();
    })
    .catch(function(error) {
      console.error(error);
    });
}

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})


console.log(count_current)

function increment() {
  count_current++;
  counterInput.value = count_current;
}

function decrement() {
  if (count_current > 0) {
    count_current--;
    counterInput.value = count_current;
  }
}

function updateCount(newValue) {
  const parsedValue = parseInt(newValue);
  if (!isNaN(parsedValue)) {
    count_current = parsedValue;
  } else {
    // Nếu giá trị nhập không hợp lệ, khôi phục giá trị trước đó hoặc đặt về 0/1
    counterInput.value = count_current;
  }
}