const provider = new firebase.auth.GoogleAuthProvider();
document.getElementById('signOutButton').addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('Người dùng đã đăng xuất');
        })
        .catch((error) => {
            console.error('Lỗi đăng xuất:', error);
        });
});

document.getElementById("googleSignIn").addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("User signed in successfully.");
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle errors.
      console.error(error);
      // ...
    });
});