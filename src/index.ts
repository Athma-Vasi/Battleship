import { addEvtListenerToForm } from './components/addEvtListenerToForm';
import { greetingsText } from './data/greetingsText';
import { renderTypewriterText } from './utilities/renderTypewriterText';

const mainApp = function () {
	addEvtListenerToForm();

	const greetingsContainer: HTMLElement | null =
		document.querySelector('.greetings-container');

	renderTypewriterText(greetingsText, greetingsContainer, 25);

	//clears storage upon refresh
	localStorage.clear();
};
document.addEventListener('DOMContentLoaded', mainApp);
