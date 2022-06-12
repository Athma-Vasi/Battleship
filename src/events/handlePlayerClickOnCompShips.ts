import { announceGameWinner } from '../components/announceGameWinner'
import { computersTurn } from '../components/computersTurn'
import {
	addEvtListener,
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
	removeEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { shipNames } from '../data/shipNames'
import { battleTexts } from '../data/battleTexts'
import { renderBattleMessageElem } from '../components/renderBattleMessage'

const handlePlayerClickOnCompShips = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	//initialize the hit counter on first hit
	//when total hits reaches 18, game ends
	if (!localStorage.getItem('totalHitsOnCompShips')) {
		localStorage.setItem('totalHitsOnCompShips', JSON.stringify(0))
	}

	const compShipsCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsCoords') ?? ''
	)

	let totalHitsOnCompShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnCompShips') ?? ''
	)

	const currentCellCoord = this.dataset.cellcomp ?? ''
	//to prevent winner being called when a miss is registered
	if (compShipsCoords.includes(currentCellCoord)) {
		//check hit counter to see if its the last hit
		if (totalHitsOnCompShips === 17) {
			//call game winner function
			announceGameWinner('player')
		}
	}

	const currentShipSymbol = this.textContent ?? ''
	const towardsCombatant = 'comp'
	const hitOrMiss = 'hit'

	renderBattleMessageElem(
		currentCellCoord,
		currentShipSymbol,
		towardsCombatant,
		hitOrMiss
	)

	//auto-scroll to the bottom to have the most recent message visible
	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper')
	const scrollHeight = infoScreenWrapper?.scrollHeight ?? 0

	infoScreenWrapper?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' })

	this.textContent = ''
	this.textContent = '💥'

	//to prevent clicks on previously hit cells counting towards totalHitsOnCompShips
	if (!localStorage.getItem('compShipsHitCoords')) {
		localStorage.setItem('compShipsHitCoords', JSON.stringify([]))
	}
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? ''
	)

	//update hit counter only when new hit is not on a previously hit cell, and store
	if (!compShipsHitCoords.includes(currentCellCoord)) {
		//store the unique hit co-ordinate
		compShipsHitCoords.push(currentCellCoord)
		localStorage.setItem('compShipsHitCoords', JSON.stringify(compShipsHitCoords))

		//increment the hit counter and store
		totalHitsOnCompShips = totalHitsOnCompShips + 1
		localStorage.setItem('totalHitsOnCompShips', JSON.stringify(totalHitsOnCompShips))
	}

	//to prevent player clicking while computer's turn
	//while timer runs, clicks on comp grid cells do not register
	//after relevant work is done, event listeners are added back on
	//simulates computer taking time to 'think'
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')

	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell)
	})
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
	})

	setTimeout(computersTurn, 0)
}
export { handlePlayerClickOnCompShips }
