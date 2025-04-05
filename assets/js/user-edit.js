// for (let i = 0; i < 100; i++) {
//     db.collection("product").add({
//         name: i,
//         state: i+1*10-9+2-9+12,
//         country: i+10*69-92+12+11
//     })
//     .then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });
// }

// }
const product_list = [];
function render_item() {
  let doc1 = document.getElementById("product");
  product_list.forEach((element) => {
    doc1.innerHTML += `
        <div class="card col-6">
  <div class="card-body">
    ${element.name}
    ${element.state}
    ${element.country}
  </div>
</div>`;
    console.log("thành công");
  });
}

db.collection("product")
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
