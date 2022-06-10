import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div } from '../utilities/types'

const renderPlayerInfoScreen = function (playerName_: string) {
	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper')

	const infoScreenContainer = elemCreator('div')(['infoScreen-container'])
	appendElemToParent(infoScreenWrapper)(infoScreenContainer)

	pipe(
		addTextToElem(`Admiral ${playerName_}! Some rousing battle talk...`),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen']))
}
export { renderPlayerInfoScreen }
