



const inpUsername = document.querySelector(".inp-username");
const inp_email = document.querySelector(".inp-email");
const inp_password = document.querySelector(".inp-pwd");
const inpConfirmPwd = document.querySelector(".inp-cf-pw");
const registerForm = document.querySelector("#register-form");

function reg(event) {
  event.preventDefault();
  let email = inp_email.value;
  let password = inp_password.value;
  let username = inpUsername.value;
  let conpass = inpConfirmPwd.value;
  let role = "user";

  if (!username || !email || !password || !conpass) {
    alert("Vui lòng điền đủ thông tin");
    return;
  }
  if (password !== conpass) {
    alert("Mật khẩu không khớp");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      
      firebase.firestore().collection("users").doc(user.uid).set({
        username: username, 
        email: email,
        password :  password,
        role: role,
        uid : user.uid,
        isAdmin : false ,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
      })
        .then(() => {
          console.log("Đăng ký thành công với role:", role);
          alert("Đăng ký thành công!");
          window.location.href = "./login.html"; 
        })
        .catch((error) => {
          console.error("Lỗi khi lưu thông tin người dùng:", error);
          alert("Lỗi khi lưu thông tin người dùng: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Lỗi khi tạo tài khoản:", error);
      let errorMessage = error.message;
      let errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        errorMessage = "Email đã được sử dụng.";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "Mật khẩu quá yếu. Mật khẩu phải có ít nhất 6 ký tự.";
      }
      alert("Lỗi đăng ký: " + errorMessage);
    });
}

registerForm.addEventListener("submit", reg);
