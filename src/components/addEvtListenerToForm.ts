import { receiveFormName } from '../events/receiveFormName'
import { Form } from '../utilities/types'

const addEvtListenerToForm = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const formName: Form = document.querySelector('#form-name')

	formName?.addEventListener('submit', receiveFormName)
}
export { addEvtListenerToForm }
