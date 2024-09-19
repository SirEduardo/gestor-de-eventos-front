export const storeUserData = (user, token) => {
    if (user && user.email) {
      localStorage.setItem("user", user.userName);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user._id);
  
      if (token) {
        localStorage.setItem("token", token);
        alert("Operation successful");
      } else {
        alert("Authentication failed. Token not found.");
      }
    }
  };