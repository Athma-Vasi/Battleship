import { addStyleToElem, pipe } from '../utilities/elementCreators'
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

		//assigns '✖' to currently missed co-ordinate and colors it Apple amber
		if (playerShipCell) {
			playerShipCell.textContent = ''
			playerShipCell.textContent = '✖'
			pipe(addStyleToElem([['color', '#f0a400']]))(playerShipCell)
		}

		//initialize storage for previously missed co-ordinates
		if (!localStorage.getItem('prevCompMissOnPlayerCoord')) {
			localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(''))
		}

		//grab the previous miss co-ordinates in order to turn them back into gray
		const prevCompMissOnPlayerCoord = JSON.parse(
			localStorage.getItem('prevCompMissOnPlayerCoord') ?? ''
		)
		const prevCompMissOnPlayerCell: Div = document.querySelector(
			`[data-cellplayer="${prevCompMissOnPlayerCoord}"]`
		)
		pipe(addStyleToElem([['color', 'gainsboro']]))(prevCompMissOnPlayerCell)

		//store current miss co-ordinates in order to highlight the current round's co-ordinates
		localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(currentCellCoord))
	}
}
export { computerAttacks }
