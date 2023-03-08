import { renderShipSelectionPage } from '../functions/renderShipSelectionPage';

const receiveFormName = function (this: HTMLFormElement, ev: SubmitEvent): void {
	ev.preventDefault();

	const formData = new FormData(this);
	const playerName = formData.get('form-name-input')?.toString() ?? '';

	// stores playerName to use for battle texts
	if (!localStorage.getItem('playerName')) {
		localStorage.setItem('playerName', JSON.stringify(playerName));
	}

	renderShipSelectionPage(playerName);
};
export { receiveFormName };
