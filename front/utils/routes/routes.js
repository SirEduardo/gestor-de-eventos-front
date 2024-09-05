import EventList from "../../src/pages/AllEvents/eventList";
import CreateEvent from "../../src/pages/CreateEvent/createEvent";
import Home from "../../src/pages/Home/home";

export const routes = [
    {
        path: "/",
        text: "Home",
        page: Home,
        auth: false
    },
    {
        path: "/events",
        text: "Events",
        page: EventList,
        auth: true
    },
    {
        path: "/create-event",
        text: "Create your Event",
        page: CreateEvent,
        auth: true
    }
]