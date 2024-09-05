export const createPage = (id) => {
    const app = document.querySelector("#app")
    const div = document.createElement("div")

    app.innerHTML = ""
    div.id = id

    app.append(div)
    return div
}