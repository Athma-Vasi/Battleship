import { Div } from '../types';

function updatePlayerTacticalOverviewCells(currentCellCoord: string): void {
	const cellToUpdate: Div = document.querySelector(
		`[data-playership="${currentCellCoord}"]`
	);
	if (cellToUpdate) {
		cellToUpdate.textContent = '';
		cellToUpdate.textContent = '💥';
		cellToUpdate.style.color = '#f0a400';
	}
}

export { updatePlayerTacticalOverviewCells };
