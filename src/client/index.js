// import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

import './styles/base.scss'


const submitButton = document.querySelector(".submit-btn")
submitButton.addEventListener("click", e => {
    handleSubmit(e)
})

export { handleSubmit }