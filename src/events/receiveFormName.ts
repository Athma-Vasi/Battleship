import { renderShipSelectionPage } from '../functions/renderShipSelectionPage';

/**
 * Handles submit event on form by storing the player's name to local storage and rendering the ship selection page.
 *
 * @function
 * @param {HTMLFormElement} this - The form that was submitted.
 * @param {SubmitEvent} ev - The event object.
 * @returns {void}
 */
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
