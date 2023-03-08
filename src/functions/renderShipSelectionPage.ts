import { Div } from '../functions/types';
import { renderPlayerInfoScreen } from './renderPlayerInfoScreen';
import { renderPlayerShipPlacementBoard } from './renderPlayerShipPlacementBoard';
import { renderShipSelectionBttns } from './renderShipSelectionBttns';

const renderShipSelectionPage = function (playerName_: string): void {
	const playerName = playerName_;

	// removes main page content
	const headerLinks = document.querySelector('.header__links');
	headerLinks?.remove();
	const greetingsContainer = document.querySelector('.greetings-container');
	greetingsContainer?.remove();
	const formContainer: Div = document.querySelector('#form-name');
	formContainer?.remove();

	// renders pre-battle speech and ship placement functionality
	renderPlayerInfoScreen(playerName);
	renderShipSelectionBttns();
	renderPlayerShipPlacementBoard();
};

export { renderShipSelectionPage };
