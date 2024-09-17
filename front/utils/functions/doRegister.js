import { createLoading } from "../../src/components/loading/loading";
import { fetchWrapper } from "../api/api";
import { doLogin } from "./doLogin";

export const doRegister = async (e) => {
  e.preventDefault()

  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!userName || !email || !password) {
      alert("All fields are required");
      return;
  }

  const body =({
      userName,
      email,
      password
  });

  const loadingElement = createLoading();
  document.body.appendChild(loadingElement);

  try {
    const res = await fetchWrapper({
      endpoint: "/auth/register",
      method: "POST",
      body,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
      alert(errorData.message || "Error during registration.");
      throw new Error(errorData.message || "Error during registration.");
    }

      const dataRes = await res.json();
      console.log("Registration successful:", dataRes);

       await doLogin (null, {
        email,
        password
      })

 
  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.message || "An error occurred during registration.");
  } finally {
    document.body.removeChild(loadingElement);
  }
};
