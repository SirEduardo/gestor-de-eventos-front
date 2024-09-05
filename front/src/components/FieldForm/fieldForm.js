import "./fieldForm.css"

export const FieldForm = ({ labelText, type = "text", id, required = true }) => {
    return `<div class="field-form">
    <label for="${id}">${labelText}</label>
    <input type="${type}" id="${id}" ${required ? 'required' : ''} />
    </div>`
}