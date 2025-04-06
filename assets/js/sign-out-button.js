document.getElementById('signOutButton').addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      console.log("Đã đăng xuất thành công!");
      // Thực hiện các hành động sau khi đăng xuất, ví dụ chuyển hướng trang
    }).catch(function(error) {
      console.error("Lỗi khi đăng xuất:", error);
    });
});