import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses';
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips';
import { pipe, removeEvtListener } from '../functions/elementCreators';
import { NodesDiv } from '../types';

/**
 * Prevents further clicks after winner is announced
 *
 * @function
 * @returns {void}
 */
const preventClicksAfterWin = function (): void {
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent');
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent');

	//prevents further clicks after winner is announced
	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell);
	});
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell);
	});
};
export { preventClicksAfterWin };
