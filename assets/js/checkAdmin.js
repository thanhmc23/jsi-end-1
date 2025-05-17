function checkIsAdmin(userId) {

    var userDocRef = db.collection("users").doc(userId);
    userDocRef.get().then(function(doc) {
        if (doc.exists) {
            var isAdmin = doc.data().isAdmin;
            console.log(isAdmin);
            permision(isAdmin)
        } else {
            console.log("Người dùng không tồn tại.");
            return false;
        }
    }).catch(function(error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    });
}

function permision(ad){
    if (ad===false) {
        document.getElementById("for_admin").style.display = "none";
    }
    else{
        document.getElementById("isAd").innerText = "Full Permission Account";

    }
}

checkIsAdmin(localStorage.getItem("CurrentUserId"))