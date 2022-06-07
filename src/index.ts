import { addEvtListenerToForm } from './components/addEvtListenerToForm'

const mainApp = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	addEvtListenerToForm()

	//clear storage upon refresh
	localStorage.clear()
}
document.addEventListener('DOMContentLoaded', mainApp)
