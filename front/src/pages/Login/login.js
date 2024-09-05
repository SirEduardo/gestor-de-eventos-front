import { createPage } from "../../../utils/functions/createPage";
import { doLogin } from "../../../utils/functions/doLogin";
import { doRegister } from "../../../utils/functions/doRegister";
import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/loginForm";
import { RegisterForm } from "../../components/RegisterForm/registerForm";
import "./login.css"

let showLogin = true

const Login = () => {
  const div = createPage("login")

  const form = document.createElement("form")

  div.append(
    Button({
      text: "Register if you don't have an account",
      fnc: () => {
        showLogin = !showLogin
        showLogin ? LoginForm(form) : RegisterForm(form)
        document.querySelector(".button-toggle").textContent = showLogin
          ? "Register if you don't have an account"
          : "Please Login"
        if (showLogin) {
          form.removeEventListener("submit", doRegister)
          form.addEventListener("submit", doLogin)
        }else{
          form.removeEventListener("submit", doLogin)
          form.addEventListener("submit", doRegister)
        }
        
        
      },
      className: "button-toggle",
    })
  );

  form.addEventListener("submit", doLogin)

  LoginForm(form)
  div.appendChild(form)
}

export default Login
