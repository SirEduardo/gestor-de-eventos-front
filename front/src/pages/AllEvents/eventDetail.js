import {
  getAttendeeById,
  confirmAttendance,
  removeAttendance,
} from "../../../utils/functions/attendees";
import { createPage } from "../../../utils/functions/createPage";
import { getEventsById } from "../../../utils/functions/events";
import { createLoading } from "../../components/loading/loading";
import "./eventDetail.css";
import EventList from "./eventList";

const EventDetail = async (id, userEmail) => {
  const div = createPage("events");
  const eventDetail = document.createElement("div");
  eventDetail.className = "event-detail";

  const loadingElement = createLoading();

  const showLoading = () => div.appendChild(loadingElement);
  const hideLoading = () => div.removeChild(loadingElement);

  try {
    showLoading();
    const res = await getEventsById(id);
    const event = await res.json();
    hideLoading();

    const token = localStorage.getItem("token");

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

    const eventItem = document.createElement("div");
    eventItem.className = "event-item";
    eventItem.innerHTML = `
    <img src=${event.img} alt=${event.title}/>
    <h1>${event.title}</h1>
    <p>Dia: ${formattedEventDate}</p>
    <p>Hora: ${formattedEventTime} H</p>
    <p>Lugar: ${event.location}</p>
    <p> Info: ${event.description}</p>
    <button id="confirm-attendance">Confirm Attendance</button>
    `;
    eventDetail.appendChild(eventItem);

    const checkAttendance = async () => {
      try {
        showLoading();
        const attendeeRes = await getAttendeeById(userEmail);
        const attendeeData = await attendeeRes.json();
        hideLoading();

        const isAttending = attendeeData.events.some(
          (attendedEvent) => attendedEvent._id === id
        );

        const confirmButton = eventDetail.querySelector("#confirm-attendance");
        confirmButton.textContent = isAttending
          ? "Eliminar Asistencia"
          : "Confirmar Asistencia";

        confirmButton.addEventListener("click", async () => {
          
          try {
            showLoading();
            const res = isAttending
              ? await removeAttendance(id, token)
              : await confirmAttendance(event._id, token);
            const response = await res.json();
            hideLoading();

            if (response.error) {
              alert(`Error: ${response.message}`);
            } else {
              alert(isAttending ? "Asistencia eliminada." : "Asistencia confirmada.");
              EventList();
            }
          } catch (error) {
            hideLoading();
            console.error("Error al gestionar la asistencia:", error);
            alert("Hubo un error al gestionar la asistencia.");
          }
        });
      } catch (error) {
        hideLoading();
        console.error("Error al verificar asistencia:", error);
        alert("Hubo un error al verificar la asistencia.");
      }
    };

    checkAttendance();
  } catch (error) {
    hideLoading();
    console.error("Error al cargar los detalles del evento:", error);
    eventDetail.innerHTML = "<p>Error al cargar los detalles del evento.</p>";
  }

  div.appendChild(eventDetail);
  return div;
};

export default EventDetail;
