import {
	Battleship,
	Carrier,
	Destroyer,
	Frigate,
	PlayerCompShipsCoords,
	Superdreadnought,
} from '../types';

/**
 * Returns an object containing the player and comp ships and their coords in an array, minus the ship sections (head, body, tail)
 *
 * @function
 * @returns {PlayerCompShipsCoords}
 */
function returnPlayerCompShipsCoords(): PlayerCompShipsCoords {
	// grabs the player and comp ships coords from local storage in order to
	// assign ship cells in the tac overview to the correct ship cells from game board
	// this is more explicit and easier to read, albeit verbose and also guarantees order sequence

	const playerSuperdreadnought: Superdreadnought = JSON.parse(
		localStorage.getItem('superdreadnought') ?? JSON.stringify([{}])
	);
	const playerSuperdreadnoughtCoords = [
		playerSuperdreadnought.head,
		playerSuperdreadnought.body1,
		playerSuperdreadnought.body2,
		playerSuperdreadnought.body3,
		playerSuperdreadnought.tail,
	];

	const playerCarrier: Carrier = JSON.parse(
		localStorage.getItem('carrier') ?? JSON.stringify([{}])
	);
	const playerCarrierCoords = [
		playerCarrier.head,
		playerCarrier.body1,
		playerCarrier.body2,
		playerCarrier.tail,
	];

	const playerBattleship: Battleship = JSON.parse(
		localStorage.getItem('battleship') ?? JSON.stringify([{}])
	);
	const playerBattleshipCoords = [
		playerBattleship.head,
		playerBattleship.body,
		playerBattleship.tail,
	];

	const playerDestroyers: Destroyer[] = JSON.parse(
		localStorage.getItem('destroyer') ?? JSON.stringify([{}])
	);
	const playerDestroyersCoords = [
		[playerDestroyers[0].head, playerDestroyers[0].tail],
		[playerDestroyers[1].head, playerDestroyers[1].tail],
	];

	const playerFrigates: Frigate[] = JSON.parse(
		localStorage.getItem('frigate') ?? JSON.stringify([{}])
	);
	const playerFrigatesCoords = [[playerFrigates[0].body], [playerFrigates[1].body]];

	const compSuperdreadnought: Superdreadnought = JSON.parse(
		localStorage.getItem('compSuperdreadnought') ?? JSON.stringify([{}])
	);
	const compSuperdreadnoughtCoords = [
		compSuperdreadnought.head,
		compSuperdreadnought.body1,
		compSuperdreadnought.body2,
		compSuperdreadnought.body3,
		compSuperdreadnought.tail,
	];

	const compCarrier: Carrier = JSON.parse(
		localStorage.getItem('compCarrier') ?? JSON.stringify([{}])
	);
	const compCarrierCoords = [
		compCarrier.head,
		compCarrier.body1,
		compCarrier.body2,
		compCarrier.tail,
	];

	const compBattleship: Battleship = JSON.parse(
		localStorage.getItem('compBattleship') ?? JSON.stringify([{}])
	);
	const compBattleshipCoords = [
		compBattleship.head,
		compBattleship.body,
		compBattleship.tail,
	];

	const compDestroyers: Destroyer[] = JSON.parse(
		localStorage.getItem('compDestroyers') ?? JSON.stringify([{}])
	);
	const compDestroyersCoords = [
		[compDestroyers[0].head, compDestroyers[0].tail],
		[compDestroyers[1].head, compDestroyers[1].tail],
	];

	const compFrigates: Frigate[] = JSON.parse(
		localStorage.getItem('compFrigates') ?? JSON.stringify([{}])
	);
	const compFrigatesCoords = [[compFrigates[0].body], [compFrigates[1].body]];

	return {
		playerShipCoords: {
			superdreadnought: playerSuperdreadnoughtCoords,
			carrier: playerCarrierCoords,
			battleship: playerBattleshipCoords,
			destroyers: playerDestroyersCoords,
			frigates: playerFrigatesCoords,
		},
		compShipCoords: {
			superdreadnought: compSuperdreadnoughtCoords,
			carrier: compCarrierCoords,
			battleship: compBattleshipCoords,
			destroyers: compDestroyersCoords,
			frigates: compFrigatesCoords,
		},
	};
}

export { returnPlayerCompShipsCoords };
