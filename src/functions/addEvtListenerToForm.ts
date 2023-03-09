import { receiveFormName } from '../events/receiveFormName';
import { Form } from '../types';

/**
 * Adds event listener to name input form
 * @function
 * @returns {void}
 */
const addEvtListenerToForm = function (): void {
	const formName: Form = document.querySelector('#form-name');

	formName?.addEventListener('submit', receiveFormName);
};
export { addEvtListenerToForm };
