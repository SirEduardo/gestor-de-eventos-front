import "./loading.css"

export const createLoading = () =>  {
    const loadingElement = document.createElement("div")
    loadingElement.className = "loading"
    loadingElement.innerHTML = `
    <div class="spinner"></div>
    <p>Cargando...</p>
    `
    return loadingElement
}