import "./loginForm.css"
import { Button } from "../Button/Button"
import { FieldForm } from "../FieldForm/fieldForm"

export const LoginForm = (form) => {
    form.className = "login-form"

    form.innerHTML = `
    ${FieldForm({ labelText: "Email", type: "email" })}
    ${FieldForm({ labelText: "Password", type: "password" })}
    `
    form.append(Button({ text: "Login", fnc: () => {

    } }))
}