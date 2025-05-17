document.getElementById('signOutButton').addEventListener('click', function () {
  firebase.auth().signOut().then(function () {
    console.log("Đã đăng xuất thành công!");
    window.location.href = "index.html"; // ← Chuyển về trang index
  }).catch(function (error) {
    console.error("Lỗi khi đăng xuất:", error);
  });
});
