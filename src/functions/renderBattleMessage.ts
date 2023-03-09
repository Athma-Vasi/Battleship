import { appendElemToParent, elemCreator } from '../functions/elementCreators';
import { renderBattleMessageHelper } from '../functions/renderBattleMessageHelper';
import { Destroyer, Div, Frigate, RandomizedManticoreShipNames } from '../types';

type renderBattleMessageElemProps = {
	currentCellCoord: string;
	currentShipSymbol: string;
	towardsCombatant: 'player' | 'comp';
	hitOrMiss: 'hit' | 'miss';
	sunkShipName?: string;
};

const renderBattleMessageElem = async function ({
	currentCellCoord,
	currentShipSymbol,
	towardsCombatant,
	hitOrMiss,
	sunkShipName,
}: renderBattleMessageElemProps): Promise<void> {
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? ''
	);

	const battleMessageContainer: Div = document.querySelector('.battleMessage-container');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(battleMessageContainer)(battleMessageElem);

	if (towardsCombatant === 'comp') {
		// checks what compShip currentCellCoord is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
		const compSuperdreadnought: string[] = Object.values(
			JSON.parse(localStorage.getItem('compSuperdreadnought') ?? JSON.stringify([]))
		);
		const compCarrier: string[] = Object.values(
			JSON.parse(localStorage.getItem('compCarrier') ?? JSON.stringify([]))
		);
		const compBattleship: string[] = Object.values(
			JSON.parse(localStorage.getItem('compBattleship') ?? JSON.stringify([]))
		);

		// destroyers consists of an array of objects
		const compDestroyers: string[] = JSON.parse(
			localStorage.getItem('compDestroyers') ?? JSON.stringify([])
		).flatMap((destroyer: Destroyer) => Object.values(destroyer));

		const compFrigates: string[] = JSON.parse(
			localStorage.getItem('compFrigates') ?? JSON.stringify([])
		).flatMap((frigate: Frigate) => Object.values(frigate));

		if (hitOrMiss === 'hit') {
			// player attacking computer scores a hit
			if (compSuperdreadnought.includes(currentCellCoord)) {
				// displays hit on superdreadnought with randomized text
				renderBattleMessageHelper({
					towardsCombatant: 'comp',
					firedStatus: 'hit',
					shipTypeHit: 'superdreadnought',
				});
			} else if (compCarrier.includes(currentCellCoord)) {
				// displays hit on carrier with randomized text
				renderBattleMessageHelper({
					towardsCombatant: 'comp',
					firedStatus: 'hit',
					shipTypeHit: 'carrier',
				});
			} else if (compBattleship.includes(currentCellCoord)) {
				// displays hit on battleship with randomized text
				renderBattleMessageHelper({
					towardsCombatant: 'comp',
					firedStatus: 'hit',
					shipTypeHit: 'battleship',
				});
			} else if (compDestroyers.includes(currentCellCoord)) {
				// there are two destroyers to connect names
				const [destroyer1Coords, _]: [string, string][] = JSON.parse(
					localStorage.getItem('compDestroyers') ?? JSON.stringify([])
				).map((destroyer: Destroyer) => Object.values(destroyer));

				// displays hit on destroyer with randomized text
				renderBattleMessageHelper({
					towardsCombatant: 'comp',
					firedStatus: 'hit',
					shipTypeHit: 'destroyer',
					shipNumber: destroyer1Coords.includes(currentCellCoord) ? 0 : 1,
				});
			} else if (compFrigates.includes(currentCellCoord)) {
				// there are two frigates to connect names
				const [frigate1Coords, _]: [string][] = JSON.parse(
					localStorage.getItem('compFrigates') ?? JSON.stringify([])
				).map((frigate: Frigate) => Object.values(frigate));

				// displays hit on frigate with randomized text
				renderBattleMessageHelper({
					towardsCombatant: 'comp',
					firedStatus: 'hit',
					shipTypeHit: 'frigate',
					shipNumber: frigate1Coords.includes(currentCellCoord) ? 0 : 1,
				});
			}
		} else if (hitOrMiss === 'miss') {
			// player attacking computer misses
			// displays miss on computer with randomized text
			renderBattleMessageHelper({
				towardsCombatant: 'comp',
				firedStatus: 'miss',
			});
		}
	} else if (towardsCombatant === 'player') {
		if (hitOrMiss === 'hit') {
			// if computer attacking player registers a hit
			if (currentShipSymbol === 'S') {
				// computer hits player's superdreadnought
				renderBattleMessageHelper({
					towardsCombatant: 'player',
					firedStatus: 'hit',
					shipTypeHit: 'superdreadnought',
				});

				// comp sinks player's superdreadnought
				if (sunkShipName === manticoreShipNames.superdreadnought) {
					// player CIC text that indicates that computer has sunk their superdreadnought
					renderBattleMessageHelper({
						towardsCombatant: 'player',
						firedStatus: 'sunk',
						shipTypeHit: 'superdreadnought',
					});
				}
			} else if (currentShipSymbol === 'C') {
				// computer hits player's carrier
				renderBattleMessageHelper({
					towardsCombatant: 'player',
					firedStatus: 'hit',
					shipTypeHit: 'carrier',
				});

				// comp sinks player's carrier
				if (sunkShipName === manticoreShipNames.carrier) {
					// player CIC text that indicates that computer has sunk their carrier
					renderBattleMessageHelper({
						towardsCombatant: 'player',
						firedStatus: 'sunk',
						shipTypeHit: 'carrier',
					});
				}
			} else if (currentShipSymbol === 'B') {
				// computer hits player's battleship
				renderBattleMessageHelper({
					towardsCombatant: 'player',
					firedStatus: 'hit',
					shipTypeHit: 'battleship',
				});

				// comp sinks player's battleship
				if (sunkShipName === manticoreShipNames.battleship) {
					// player CIC text that indicates that computer has sunk their battleship
					renderBattleMessageHelper({
						towardsCombatant: 'player',
						firedStatus: 'sunk',
						shipTypeHit: 'battleship',
					});
				}
			} else if (currentShipSymbol === 'D') {
				// there are two destroyers to connect names
				const [destroyer1Coords, _]: [string, string][] = JSON.parse(
					localStorage.getItem('destroyer') ?? JSON.stringify([])
				).map((destroyer: Destroyer) => Object.values(destroyer));

				// computer hits player's destroyer
				renderBattleMessageHelper({
					towardsCombatant: 'player',
					firedStatus: 'hit',
					shipTypeHit: 'destroyer',
					shipNumber: destroyer1Coords.includes(currentCellCoord) ? 0 : 1,
				});

				// comp sinks player's destroyer
				if (
					sunkShipName === manticoreShipNames.destroyers[0] ||
					sunkShipName === manticoreShipNames.destroyers[1]
				) {
					// player CIC text that indicates that computer has sunk their destroyer
					renderBattleMessageHelper({
						towardsCombatant: 'player',
						firedStatus: 'sunk',
						shipTypeHit: 'destroyer',
						shipNumber: destroyer1Coords[0].includes(currentCellCoord) ? 0 : 1,
					});
				}
			} else if (currentShipSymbol === 'F') {
				// there are two frigates to connect names
				const [frigate1Coords, _]: [string][] = JSON.parse(
					localStorage.getItem('frigate') ?? JSON.stringify([])
				).map((frigate: Frigate) => Object.values(frigate));

				// computer hits player's frigate
				renderBattleMessageHelper({
					towardsCombatant: 'player',
					firedStatus: 'hit',
					shipTypeHit: 'frigate',
					shipNumber: frigate1Coords.includes(currentCellCoord) ? 0 : 1,
				});

				// comp sinks player's frigate
				if (
					sunkShipName === manticoreShipNames.frigates[0] ||
					sunkShipName === manticoreShipNames.frigates[1]
				) {
					// player CIC text that indicates that computer has sunk their frigate
					renderBattleMessageHelper({
						towardsCombatant: 'player',
						firedStatus: 'sunk',
						shipTypeHit: 'frigate',
						shipNumber: frigate1Coords[0].includes(currentCellCoord) ? 0 : 1,
					});
				}
			}
		}
	}

	//auto-scrolls to the bottom to have the most recent message visible
	const scrollHeight = battleMessageContainer?.scrollHeight ?? 0;

	battleMessageContainer?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' });
};
export { renderBattleMessageElem };
