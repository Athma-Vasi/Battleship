import { Div } from '../utilities/types';
import { addStyleToElem, pipe } from '../utilities/elementCreators';

const handleDestroyerMouseLeave = function (this: HTMLDivElement, ev: MouseEvent) {
	//grabs the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector');
	const currentAxis = axisSelector?.textContent;

	//grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	//changes consecutive cells in corresponding axes on hover
	if (currentAxis === 'Axis-X') {
		for (let i = 0; i < 2; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			);

			//avoids changing cells of ships already present
			if (!nextCell?.classList.contains('playerShipPresent')) {
				if (nextCell) nextCell.textContent = '';
				pipe(
					addStyleToElem([
						['color', 'gainsboro'],
						['cursor', 'default'],
					])
				)(nextCell);
			}
		}
	} else if (currentAxis === 'Axis-Y') {
		for (let i = 0; i < 2; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			);

			//avoids changing cells of ships already present
			if (!nextCell?.classList.contains('playerShipPresent')) {
				if (nextCell) nextCell.textContent = '';
				pipe(
					addStyleToElem([
						['color', 'gainsboro'],
						['cursor', 'default'],
					])
				)(nextCell);
			}
		}
	}
};
export { handleDestroyerMouseLeave };
