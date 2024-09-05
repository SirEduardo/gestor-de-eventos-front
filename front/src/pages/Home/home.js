
import { createPage } from "../../../utils/functions/createPage"
import { sports } from "../../components/sports/sports"
import "./home.css"

const allSports = sports

const Home = () => {
    const div = createPage("home")
    div.innerHTML = `
   <div class ="home-container"> 
     <img src ="https://png.pngtree.com/thumb_back/fh260/back_pic/04/07/48/465811cc88e057c.jpg">
    <div class="text">
    <h1>Gestión de eventos deportivos Salamanca</h1>
    <section>
        <p>Eventos deportivos grupales para diferentes niveles:</p>
        <ul id="sports-list"></ul>
    </section>
    </div>
   </div
    `
    const sportsList = div.querySelector("#sports-list")

    allSports.forEach(sport => {
        const li = document.createElement("li")
        li.textContent = sport
        sportsList.appendChild(li)
    })

}

export default Home