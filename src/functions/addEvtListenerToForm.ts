import { receiveFormName } from '../events/receiveFormName';
import { Form } from '../functions/types';

const addEvtListenerToForm = function (): void {
	const formName: Form = document.querySelector('#form-name');

	formName?.addEventListener('submit', receiveFormName);
};
export { addEvtListenerToForm };
