import { Div } from '../utilities/types';
import { renderPlayerBoard } from './renderPlayerBoard';
import { renderPlayerInfoScreen } from './renderPlayerInfoScreen';
import { renderShipSelectionBttns } from './renderShipSelectionBttns';

const renderGamePage = function (playerName_: string) {
	const playerName = playerName_;

	//removes main page content
	const greetingsContainer = document.querySelector('.greetings-container');
	greetingsContainer?.remove();
	const formContainer: Div = document.querySelector('.form-container');
	formContainer?.remove();

	//renders pre-battle speech and ship placement functionality
	renderPlayerInfoScreen(playerName);
	renderShipSelectionBttns();
	renderPlayerBoard();
};
export { renderGamePage };
