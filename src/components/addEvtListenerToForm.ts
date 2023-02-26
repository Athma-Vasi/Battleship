import { receiveFormName } from '../events/receiveFormName';
import { Form } from '../utilities/types';

const addEvtListenerToForm = function () {
	const formName: Form = document.querySelector('#form-name');

	formName?.addEventListener('submit', receiveFormName);
};
export { addEvtListenerToForm };
