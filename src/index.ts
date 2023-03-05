import { addEvtListenerToForm } from './components/addEvtListenerToForm';
import { greetingsText } from './data/greetingsText';
import { createTypewriterEffect } from './utilities/createTypewriterEffect';
import { Div } from './utilities/types';

const mainApp = async function () {
	addEvtListenerToForm();

	const greetingsContainer: Div = document.querySelector('.greetings-container');

	createTypewriterEffect({
		containerElem: greetingsContainer,
		strings: greetingsText,
		speed: 10,
	});

	//clears storage upon refresh
	localStorage.clear();
};
document.addEventListener('DOMContentLoaded', mainApp);
