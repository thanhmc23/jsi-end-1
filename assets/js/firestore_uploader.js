const cloudinaryConfig = {
    cloud_name: 'dxtpr0fyf',
    api_key: '989442838777222',
    api_secret: '62wSAsa1wYdPfBl5MjyB6XkMFlI'
};
function randomStarRate() {
    let max = 5.0
    let min = 3.0
    let decimals = 2
    let value = Math.random() * (max - min) + min;
    return value.toFixed(decimals)
}
function getRandomSold() {
    let min = 1000;
    let max = 99999;
    let decimals = 1
    value = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${(value/1000).toFixed(decimals)} , origin ${value}`
}
document.getElementById('upload-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    let name = document.getElementById("pro-name").value
    let price = document.getElementById("pro-price").value
    const file = document.getElementById('file-upload').files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'cafe-1'); // Thay 'your_upload_preset' bằng tên upload preset bạn đã tạo

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/upload`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    console.log('File URL:', data.secure_url);

    db.collection("main_products").add({
        product_example_rate: randomStarRate(),
        product_example_sold : getRandomSold(),
        product_name: name,
        product_price: price,
        product_example_img: data.secure_url,
        product_upload_date : new Date().getTime(),
        product_upload_date_formated : firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Upload thành công")
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Upload thất bại")

        
    });
});