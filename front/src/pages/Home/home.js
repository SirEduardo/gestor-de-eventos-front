
import { createPage } from "../../../utils/functions/createPage"
import { sports } from "../../components/sports/sports"
import "./home.css"

const allSports = sports

const Home = () => {
    const div = createPage("home")
    div.innerHTML = `
   <div class ="home-container"> 
   <h1>Gestión de eventos deportivos en Salamanca</h1>
    <div class="text">
    <section id="sports-section">
        <p>Eventos deportivos grupales a los que asistir u organizar tu mismo :</p>
        <ul id="sports-list"></ul>
    </section>
    </div>
   </div
    `
    const sportsList = div.querySelector("#sports-list")

    allSports.forEach(sport => {
        const div = document.createElement("div")
        const name = document.createElement("p")
        const img = document.createElement("img") 
        name.textContent = sport.name
        img.src = sport.image

        div.appendChild(name)
        div.appendChild(img)
        sportsList.appendChild(div)
    })

}

export default Home