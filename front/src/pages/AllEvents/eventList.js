import "./eventList.css";
import { deleteEvent, getEvents } from "../../../utils/functions/events";
import { createPage } from "../../../utils/functions/createPage";
import EventDetail from "./eventDetail";
import { createLoading } from "../../components/loading/loading";

const EventList = async () => {
  const div = createPage("events");
  const eventList = document.createElement("div");
  eventList.className = "event-list";
  eventList.innerHTML = "";

  const loadingElement = createLoading();
  const showLoading = () => div.appendChild(loadingElement);
  const hideLoading = () => div.removeChild(loadingElement);

  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")

  try {
    showLoading()
    const response = await getEvents();
    const events = await response.json();
    hideLoading()

    if (Array.isArray(events) && events.length > 0) {
      for (const event of events) {
        
        const eventDate = new Date(event.date);
        const formattedEventDate = eventDate.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedEventTime = eventDate.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        });

        let creatorName = ""
        let creatorId = ""
        
        if (event.createdBy && event.createdBy.length > 0) {
          creatorName = event.createdBy[0].userName
          creatorId = event.createdBy[0]._id
        
        }

        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
        <img src=${event.img} alt=${event.title}/>
        <h3>${event.title}</h3>
        <h5>Creado por: ${creatorName}</h5>
        <p>Dia: ${formattedEventDate}</p>
        <p>Hora: ${formattedEventTime} H</p>
        <p>Lugar: ${event.location}</p>
        <div class="btn-div">
        <button data-id="${event._id}" class="detail-btn">View details</button>
        <button data-id="${event._id}" class="delete-btn">Delete</button>
        </div>
        `;
        eventItem.querySelector(".detail-btn").addEventListener("click", () => {
          eventList.innerHTML = "";
          EventDetail(event._id, userEmail);
        });
      

        eventItem
          .querySelector(".delete-btn")
          .addEventListener("click", async () => {

            if (!token) {
              alert("Necesitas estar logeado para eliminar el evento");
              return;
            }

            if (!event.createdBy || event.createdBy.length === 0 || userId !== creatorId) {             
              alert("Este usuario no puede eliminar este evento")
              return
            }

            const confirmation = confirm("Seguro que quieres eliminar este evento?");
            if (!confirmation) return;
  
            try {
              showLoading()
              const res = await deleteEvent(event._id, token);
              const deleteResponse = await res.json();
              hideLoading()
  
              if (deleteResponse.error) {
                alert("Error al eliminar el evento");
              } else {
                eventItem.remove();
                EventList();
              }
            } catch (error) {
              hideLoading()
              console.log(error);
            }
          });
        eventList.appendChild(eventItem);
      }
    } else {
      eventList.innerHTML = '<p style="color: white;">No se encontraron eventos.</p>';
    }
  } catch (error) {
    eventList.innerHTML = "<p>Hubo un error cargando eventos.</p>";
    console.log(error);
    hideLoading()
  }
  div.appendChild(eventList);

  return div;
};

export default EventList;
