import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	removeEvtListener,
	pipe,
	addEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'
import { preventClicksAfterWin } from './preventClicksAfterWin'
import { restartGame } from './restartGame'

const announceGameWinner = function (winner_: string) {
	const main: HTMLElement | null = document.querySelector('.main')

	const winnerContainer = elemCreator('div')(['winner-container'])
	appendElemToParent(main)(winnerContainer)

	pipe(
		addTextToElem('Restart'),
		addEvtListener('click')(restartGame),
		appendElemToParent(winnerContainer)
	)(elemCreator('button')(['bttn-restart']))

	if (winner_ === 'comp') {
		pipe(
			addTextToElem('Fall back and regroup! We will not surrender!'),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']))

		//remove event listeners after win
		preventClicksAfterWin()
	} else {
		pipe(
			addTextToElem(`Congrats ${winner_}! You have destroyed the Haven Fleet!`),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']))

		//remove event listeners after win
		preventClicksAfterWin()
	}

	//this is being used to prevent computers turn from adding evt listeners back on
	localStorage.setItem('isGameWon', JSON.stringify(true))
}
export { announceGameWinner }
