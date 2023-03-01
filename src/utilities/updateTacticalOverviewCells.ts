import { Div } from './types';

function updateTacticalOverviewCells(
	currentCellCoord: string,
	towardsCombatant: 'player' | 'comp'
) {
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
}

export { updateTacticalOverviewCells };

/**
 
  const tacticalOverviewCells: NodesDiv = document.querySelectorAll(
		`[data-${towardsCombatant}-tacticalCell]`
	);

	tacticalOverviewCells.forEach((cell) => {
		if (cell?.dataset[`${towardsCombatant}TacticalCell`] === currentCellCoord) {
			cell.textContent = currentShipSymbol;
		}
	});

 */
