const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let product = [];
db.collection("main_products").where("product_example_id", "==", id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            document.getElementById("pro_name_detail").innerText = doc.data().product_name;
            document.getElementById("pro_price_detail").innerHTML = `${doc.data().product_price} <sup>₫</sup>`;
            document.getElementById("pro_rate_detail").innerText = `Đánh giá : ${doc.data().product_example_rate}⭐`;
            document.getElementById("pro_sold_detail").innerHTML = `Đã bán : ${doc.data().product_example_sold}K`;
            document.getElementById("pro_img_detail").src = doc.data().product_example_img;
            
            
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

