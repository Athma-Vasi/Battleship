import { addStyleToElem, addTextToElem, pipe } from '../functions/elementCreators';
import { Div } from '../types';

/**
 *  Handles mouseenter event on game board cells by changing the text content of one cell to 'F' to indicate that it is a valid placement for the frigate ship.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that the mouse is hovering over.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleFrigateMouseEnter = function (this: HTMLDivElement, ev: MouseEvent): void {
	// grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	// changes cell on hover
	const nextCell: Div = document.querySelector(
		`[data-cellplayer="${currentX},${currentY}"]`
	);

	if (!nextCell?.classList.contains('playerShipPresent')) {
		pipe(
			addTextToElem('F'),
			addStyleToElem([
				['color', '#f0a400'],
				['cursor', 'crosshair'],
			])
		)(nextCell);
	}
};
export { handleFrigateMouseEnter };
