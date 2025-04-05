const provider = new GoogleAuthProvider();

function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User signed in:", user);
      alert("Sign in success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Sign-in error:", errorCode, errorMessage);
      alert("Sign in fail");
      // ...
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("User is signed in (state change):", user);
  } else {
    console.log("User is signed out (state change)");
  }
});