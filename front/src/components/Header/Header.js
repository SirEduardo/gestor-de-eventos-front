import { doLogout } from "../../../utils/functions/doLogout";
import { navigate } from "../../../utils/functions/navigate";
import { routes } from "../../../utils/routes/routes";
import Login from "../../pages/Login/login";
import "./Header.css";

export const Header = () => {
  const header = document.querySelector("header");

  header.innerHTML = "";

  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  const openMenu = document.createElement("button")
  const closeMenu = document.createElement("button")

  openMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`
  openMenu.classList.add("open")
  closeMenu.innerHTML = `<i class="fa-solid fa-x"></i>`
  closeMenu.classList.add("close")

  openMenu.addEventListener("click", () => {
    nav.classList.add("visible")
  })

  closeMenu.addEventListener("click", () => {
    nav.classList.remove("visible")
  })

  const isLoggedIn = !!localStorage.getItem("token");

    for (const route of routes) {
      if ((!route.auth) || (route.auth && isLoggedIn)) {
        const li = document.createElement("li")
        const a = document.createElement("a")
  
        a.textContent = route.text
        a.href = route.path

        a.addEventListener("click", (e) => {
          navigate(e, route)
          ul.classList.remove("visible")
        })
  
        li.appendChild(a)
        ul.appendChild(li)
      }
      

    }

if (!isLoggedIn){
      const loginLi = document.createElement("li");
      const loginButton = document.createElement("a");
      
      loginButton.href = "/login"
      loginButton.textContent = "Login";
      loginButton.addEventListener("click", (e) => {
        e.preventDefault()
        Login()
      })
      loginLi.appendChild(loginButton)
      ul.appendChild(loginLi) 
    }

  
    if (isLoggedIn) {
      const logoutLi = document.createElement("li");
      const logoutButton = document.createElement("a");
      
      logoutButton.href = "/doLogout"
      logoutButton.textContent = "Logout";
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        doLogout()
      })
      logoutLi.appendChild(logoutButton)
      ul.appendChild(logoutLi)
    }
  
    nav.appendChild(closeMenu)
    nav.appendChild(ul)
    header.appendChild(openMenu)
  header.appendChild(nav)
  

}

Header()