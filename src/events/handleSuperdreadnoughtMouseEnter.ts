import { addStyleToElem, addTextToElem, pipe } from '../functions/elementCreators';
import { Div } from '../types';

/**
 * Handles mouseenter event on game board cells by changing the text content of one cell to 'S' to indicate that it is a valid placement for the superdreadnought ship.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that the mouse is hovering over.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleSuperdreadnoughtMouseEnter = function (
	this: HTMLDivElement,
	ev: MouseEvent
): void {
	// grabs the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector');
	const currentAxis = axisSelector?.textContent;

	// grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	// changes consecutive cells in corresponding axes on hover
	if (currentAxis === 'Axis-X') {
		for (let i = 0; i < 5; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			);

			if (!nextCell?.classList.contains('playerShipPresent')) {
				pipe(
					addTextToElem('S'),
					addStyleToElem([
						['color', '#f0a400'],
						['cursor', 'crosshair'],
					])
				)(nextCell);
			}
		}
	} else if (currentAxis === 'Axis-Y') {
		for (let i = 0; i < 5; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			);

			if (!nextCell?.classList.contains('playerShipPresent')) {
				pipe(
					addTextToElem('S'),
					addStyleToElem([
						['color', '#f0a400'],
						['cursor', 'crosshair'],
					])
				)(nextCell);
			}
		}
	}
};
export { handleSuperdreadnoughtMouseEnter };
