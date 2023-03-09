import { Div } from '../types';

/**
 * Updates the player's tactical overview board with '💥' emoji when a cell that contains a player's ship is fired upon
 * @param {string} currentCellCoord - Current cell coordinate
 */
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
