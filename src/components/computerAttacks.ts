import { Div, NodesDiv } from '../utilities/types'
import { renderBattleMessageElem } from './renderBattleMessage'

const computerAttacks = function (compAttackGuess_: string) {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	)

	let totalHitsOnPlayerShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnPlayerShips') ?? ''
	)

	//compAttackGuess_ is assumed to be unique at this point
	//check if playerShip is present
	if (playerShipsCoords.includes(compAttackGuess_)) {
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		)

		//call function to display battle message when computer registers a hit on a player ship
		const currentCellCoord = compAttackGuess_
		const currentShipSymbol = playerShipCell?.textContent ?? ''
		const towardsCombatant = 'player'
		const hitOrMiss = 'hit'

		renderBattleMessageElem(
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant,
			hitOrMiss
		)

		//update playercell to visually indicate hit
		if (playerShipCell) {
			playerShipCell.textContent = ''
			playerShipCell.textContent = '💥'
		}

		//update hit counter and store
		totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1
		localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(totalHitsOnPlayerShips))
	} else {
		//if its a miss
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		)

		//call function to display battle message when computer does not hit a player ship
		const currentCellCoord = compAttackGuess_
		const currentShipSymbol = playerShipCell?.textContent ?? ''
		const towardsCombatant = 'player'
		const hitOrMiss = 'miss'

		renderBattleMessageElem(
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant,
			hitOrMiss
		)

		//update playercell to visually indicate miss
		if (playerShipCell) {
			playerShipCell.textContent = ''
			playerShipCell.textContent = '✖'
		}
	}
}
export { computerAttacks }
