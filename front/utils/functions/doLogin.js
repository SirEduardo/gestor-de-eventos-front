import { Header } from "../../src/components/Header/Header";
import { createLoading } from "../../src/components/loading/loading";
import Home from "../../src/pages/Home/home";
import { fetchWrapper } from "../api/api";
import { storeUserData } from "../storage";

export const doLogin = async (e) => {
  e.preventDefault();
  let email, password;

  const form = e.target;
  email = form.querySelector("input#email").value;
  password = form.querySelector("input#password").value;

  if (!email || !password) {
    alert("Email and Password are required");
    return;
  }

  let body = {
    email,
    password,
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
    storeUserData(dataRes.user, dataRes.token);

    if (dataRes.user && dataRes.token) {
      Header();
      Home();
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert(error.message || "An error occurred during login. Please try again.");
  } finally {
    document.body.removeChild(loadingElement);
  }
};
