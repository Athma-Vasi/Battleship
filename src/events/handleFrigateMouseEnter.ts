import { Div } from '../utilities/types';
import { addTextToElem, addStyleToElem, pipe } from '../utilities/elementCreators';

const handleFrigateMouseEnter = function (this: HTMLDivElement, ev: MouseEvent) {
	//grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	//changes cell on hover
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
