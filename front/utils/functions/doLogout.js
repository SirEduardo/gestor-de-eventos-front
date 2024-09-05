
import { Header } from "../../src/components/Header/Header"
import Home from "../../src/pages/Home/home"


export const doLogout = () => {
    const confirmation = confirm("Seguro que quieres salir?")
    if (confirmation){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        Header()
        Home()
    }

}