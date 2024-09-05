import { Button } from "../Button/Button"
import { FieldForm } from "../FieldForm/fieldForm"
import "./registerForm.css"

export const RegisterForm = (form) => {
    
    form.className = "register-form"

    form.innerHTML = `
    ${FieldForm({ labelText: "Username" })}
    ${FieldForm({ labelText: "Email", type: "email" })}
    ${FieldForm({ labelText: "Password", type: "password" })}
    
    `  
    form.append(Button({ text: "Register", fnc: (e) => {

    } })) 
}

