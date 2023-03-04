import { addEvtListenerToForm } from './components/addEvtListenerToForm';
import { greetingsText } from './data/greetingsText';
import { testing } from './utilities/createTypewriterEffect';
import { elemCreator } from './utilities/elementCreators';
import { Div } from './utilities/types';

const mainApp = function () {
	addEvtListenerToForm();

	const greetingsContainer: Div = document.querySelector('.greetings-container');

	const childElem = elemCreator('p')(['greetings']);

	testing(greetingsContainer, greetingsText, 25);

	//clears storage upon refresh
	localStorage.clear();
};
document.addEventListener('DOMContentLoaded', mainApp);
