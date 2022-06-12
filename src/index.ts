import { addEvtListenerToForm } from './components/addEvtListenerToForm'

const mainApp = function () {
	addEvtListenerToForm()

	//clears storage upon refresh
	localStorage.clear()
}
document.addEventListener('DOMContentLoaded', mainApp)
