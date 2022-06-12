import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import { pipe, addEvtListener } from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'
import { announceGameWinner } from './announceGameWinner'
import { computerAttacks } from './computerAttacks'
import { genRandCompAttackGuess } from './genRandCompAttackGuess'

const computersTurn = function () {
	//checks if game has been won
	if (!localStorage.getItem('isGameWon')) {
		localStorage.setItem('isGameWon', JSON.stringify(''))
	}
	const isGameWon: boolean = JSON.parse(localStorage.getItem('isGameWon') ?? '')

	//this conditional check is to prevent computer from having a turn after player has destroyed all of computer's ships
	if (!isGameWon) {
		if (!localStorage.getItem('totalHitsOnPlayerShips')) {
			localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(0))
		}

		const playerShipsCoords: string[] = JSON.parse(
			localStorage.getItem('playerShipsCoords') ?? ''
		)

		const compAttackGuess = genRandCompAttackGuess()

		//if compAttackGuess is on a playerShipCoord, then checks the hit counter
		//avoids registering a win when the computer misses
		if (playerShipsCoords.includes(compAttackGuess)) {
			let totalHitsOnPlayerShips: number = JSON.parse(
				localStorage.getItem('totalHitsOnPlayerShips') ?? ''
			)
			if (totalHitsOnPlayerShips === 17) {
				//calls game winner function
				announceGameWinner('comp')
			}
		}

		//if no winner, continues attack
		computerAttacks(compAttackGuess)

		//if game win condition has not been reached, adds the event listeners back on to continue round
		const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')
		compShipPresent.forEach((cell) => {
			pipe(addEvtListener('click')(handlePlayerClickOnCompShips))(cell)
		})

		const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')
		compShipNotPresent.forEach((cell) => {
			pipe(addEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
		})
	}
}
export { computersTurn }
