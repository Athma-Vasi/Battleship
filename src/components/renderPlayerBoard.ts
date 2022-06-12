import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
} from '../utilities/elementCreators'
import { Div } from '../utilities/types'

const renderPlayerBoard = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const main: HTMLElement | null = document.querySelector('.main')

	const bothBoardsContainer = elemCreator('div')(['bothBoards-container'])
	appendElemToParent(main)(bothBoardsContainer)

	const playerBoardWrapper = elemCreator('div')(['playerBoard-wrapper'])
	appendElemToParent(bothBoardsContainer)(playerBoardWrapper)

	const playerBoardContainer = elemCreator('div')(['playerBoard-container'])
	appendElemToParent(playerBoardWrapper)(playerBoardContainer)

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			//render a div per iteration of for-loop
			pipe(
				addAttributeToElem([['data-cellplayer', `${j},${i}`]]),
				appendElemToParent(playerBoardContainer)
			)(elemCreator('div')(['player-gameCell']))
		}
	}
}
export { renderPlayerBoard }
