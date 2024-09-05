import { createEvent } from "../../../utils/functions/events";
import { createPage } from "../../../utils/functions/createPage";
import "./createEvent.css";
import EventList from "../AllEvents/eventList";
import { createLoading } from "../../components/loading/loading";

const CreateEvent = () => {
  const div = createPage("create-events")
  div.id = "createEvent-container"

  const loadingElement = createLoading()

  div.innerHTML = `
    <form id="create-event">
      <input type="text" placeholder="Title" id="title" name="title" required>
      <input type="date" id="date" name="date" required>
      <input type="time" id="time" name="time" required>
      <input type="text" placeholder="Location" id="location" name="location" required>
      <textarea placeholder="Description" id="description" name="description" required></textarea>
      <input type="file" id="img" name="img" required>
      <button type="submit" id="submit-btn">Create Event</button>
    </form>
  `;

  div.querySelector("#create-event").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const dateValue = document.querySelector("#date").value
    const timeValue = document.querySelector("#time").value
    const dateTime = new Date(`${dateValue}T${timeValue}`).toISOString()

    const formData = new FormData();
    formData.append("title", document.querySelector("#title").value);
    formData.append("date", dateTime)
    formData.append("location", document.querySelector("#location").value);
    formData.append("description", document.querySelector("#description").value);
    formData.append("img", document.querySelector("#img").files[0]);

    try {
      div.appendChild(loadingElement)
      const response = await createEvent(formData, token);
      div.removeChild(loadingElement)
      if (response.ok) {
        EventList();
      } else {
        const errorData = await response.json();
        console.error('Error creating event:', errorData);
      }
    } catch (error) {
      div.removeChild(loadingElement)
      console.error('Network error:', error);
    }
  })
  return div
}



export default CreateEvent