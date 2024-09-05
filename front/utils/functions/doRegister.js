import { createLoading } from "../../src/components/loading/loading";
import { fetchWrapper } from "../api/api";
import { doLogin } from "./doLogin";

export const doRegister = async (e) => {
  e.preventDefault();

  const [userNameInput, emailInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const loadingElement = createLoading();
  document.body.appendChild(loadingElement);

  try {
    const res = await fetchWrapper({
      endpoint: "/auth/register",
      method: "POST",
      body,
    });

    if (res.error) {
      throw new Error(res.error);
    }

    if (res.ok) {
      const dataRes = await res.json();
      console.log("Registration successful:", dataRes);

      await doLogin ({
        email: emailInput.value,
        password: passwordInput.value
      })
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error during registration.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.message || "An error occurred during registration.");
  } finally {
    document.body.removeChild(loadingElement);
  }
};
