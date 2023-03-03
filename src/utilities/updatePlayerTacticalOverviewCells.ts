import { Div } from './types';

function updatePlayerTacticalOverviewCells(
	currentCellCoord: string
	// towardsCombatant: 'player' | 'comp'
) {
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

/**
 
switch (towardsCombatant) {
		case 'player': {
			const cellToUpdate: Div = document.querySelector(
				`[data-${towardsCombatant}ship="${currentCellCoord}"]`
			);
			if (cellToUpdate) {
				cellToUpdate.textContent = '';
				cellToUpdate.textContent = '💥';
				cellToUpdate.style.color = '#f0a400';
			}

			break;
		}
		case 'comp': {
			const cellToUpdate: Div = document.querySelector(
				`[data-${towardsCombatant}ship="${currentCellCoord}"]`
			);
			if (cellToUpdate) {
				cellToUpdate.textContent = '';
				cellToUpdate.textContent = '💥';
				cellToUpdate.style.color = '#f0a400';
			}

			break;
		}
		default:
			break;
	}

 */
