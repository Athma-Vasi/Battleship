import { addEvtListenerToForm } from './components/addEvtListenerToForm'

const mainApp = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	addEvtListenerToForm()
}
document.addEventListener('DOMContentLoaded', mainApp)
