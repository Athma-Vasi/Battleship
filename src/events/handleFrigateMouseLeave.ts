import { addStyleToElem, pipe } from '../functions/elementCreators';
import { Div } from '../types';

/**
 *  Handles mouseleave event on game board cells by changing the text content of one cell to '' to indicate that it is no longer a valid placement for the frigate ship.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that the mouse is hovering over.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleFrigateMouseLeave = function (this: HTMLDivElement, ev: MouseEvent): void {
	// grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	// changes cell on hover
	const nextCell: Div = document.querySelector(
		`[data-cellplayer="${currentX},${currentY}"]`
	);

	// avoids changing cells of ships already present
	if (!nextCell?.classList.contains('playerShipPresent')) {
		if (nextCell) nextCell.textContent = '';
		pipe(
			addStyleToElem([
				['color', 'gainsboro'],
				['cursor', 'default'],
			])
		)(nextCell);
	}
};
export { handleFrigateMouseLeave };
