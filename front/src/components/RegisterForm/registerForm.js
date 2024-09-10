import { Button } from "../Button/Button"
import { FieldForm } from "../FieldForm/fieldForm"
import "./registerForm.css"

export const RegisterForm = (form) => {
    
    form.className = "register-form"

    form.innerHTML = `
    ${FieldForm({ labelText: "Username", type: "text", id: "userName" })}
    ${FieldForm({ labelText: "Email", type: "email", id: "email" })}
    ${FieldForm({ labelText: "Password", type: "password", id:"password" })}
    
    `  
    form.append(Button({ text: "Register", fnc: (e) => {

    } })) 
}

