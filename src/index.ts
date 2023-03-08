import { greetingsText } from './data/greetingsText';
import { addEvtListenerToForm } from './functions/addEvtListenerToForm';
import { createTypewriterEffect } from './functions/createTypewriterEffect';
import { Div } from './functions/types';

const mainApp = async function () {
	addEvtListenerToForm();

	const greetingsContainer: Div = document.querySelector('.greetings-container');

	createTypewriterEffect({
		containerElem: greetingsContainer,
		strings: greetingsText,
		speed: 25,
	});

	//clears storage upon refresh
	localStorage.clear();
};
document.addEventListener('DOMContentLoaded', mainApp);
