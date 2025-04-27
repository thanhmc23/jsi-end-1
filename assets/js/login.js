
const provider = new firebase.auth.GoogleAuthProvider();
// document.getElementById("signOutButton").addEventListener("click", () => {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       console.log("Người dùng đã đăng xuất");
//     })
//     .catch((error) => {
//       console.error("Lỗi đăng xuất:", error);
//     });
// });

document.getElementById("googleSignIn").addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      
      console.log("User signed in successfully.");
      const user = result.user.multiFactor.user;
      console.log(user);
      firebase.firestore().collection("users").doc(user.uid).set({
        username: user.displayName, 
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
        uid : user.uid
      })
      window.location.href = "./index.html";

    })
    .catch((error) => {
      // Handle errors.
      console.error(error);
      // ...
    });
});

const inpEmail = document.querySelector(".inp-email");
const inpPwd = document.querySelector(".inp-pwd");
const loginForm = document.querySelector("#login-form");

function login(event) {
  event.preventDefault();
  let email = inpEmail.value;
  let password = inpPwd.value;
  if (!email || !password) {
    alert("Vui lòng điền đủ thông tin");
    return;
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = "./";
      console.log("thành công");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorMessage);
    });
}

loginForm.addEventListener("submit", login);
