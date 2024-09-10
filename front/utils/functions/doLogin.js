import { Header } from "../../src/components/Header/Header";
import { createLoading } from "../../src/components/loading/loading";
import Home from "../../src/pages/Home/home";
import { fetchWrapper } from "../api/api";

export const doLogin = async (e) => {
  e.preventDefault()
  
  const form = e.target;
  const email = form.querySelector('input#email').value;
  const password = form.querySelector('input#password').value;

  
  if (!email || !password) {
      alert("Email and Password are required");
      return;
  }

  const body = {
      email,
      password
  };

  const loadingElement = createLoading();
  document.body.appendChild(loadingElement);

  try {
    const res = await fetchWrapper({
      endpoint: "/auth/login",
      method: "POST",
      body,
    });

    if (res.error) {
      throw new Error(res.error);
    }

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response:", errorData);
      
      throw new Error(errorData.message || "Login failed. Please try again.");
    }

    const dataRes = await res.json();
    console.log("Login successful:", dataRes);

    if (dataRes.user && dataRes.user.email) {
      localStorage.setItem("user", dataRes.user.userName);
      localStorage.setItem("userEmail", dataRes.user.email);
      localStorage.setItem("userId", dataRes.user._id)

      if (dataRes.token) {
        localStorage.setItem("token", dataRes.token);
        alert("Login successful");
        Header();
        Home();
      } else {
        alert("Authentication failed. Token not found.");
      }
    } else {
      alert("User not found. Please register first.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert(error.message || "An error occurred during login. Please try again.");
  } finally {
    document.body.removeChild(loadingElement);
  }
};
