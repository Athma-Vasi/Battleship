import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'

const renderPlayerInfoScreen = function (playerName_: string) {
	const main: HTMLElement | null = document.querySelector('.main')

	const infoScreenWrapper = elemCreator('div')(['preBattle-infoScreen'])
	appendElemToParent(main)(infoScreenWrapper)

	const infoScreenContainer = elemCreator('div')(['infoScreen-container'])
	appendElemToParent(infoScreenWrapper)(infoScreenContainer)

	pipe(
		addTextToElem(
			`Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']))

	pipe(
		addTextToElem(
			`You are about to embark upon the Great Battle, toward which we have striven these many months. The eyes of the galaxy are upon you. The hopes and prayers of liberty-loving people everywhere march with you. In company with our brave Allies and brothers-in-arms on other Sectors, you will bring about the destruction of the Haven war machine, the eliminations of their tyranny over oppressed people, and the security for ourselves in a free galaxy!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']))

	pipe(
		addTextToElem(`Ready fleet formation, Admiral ${playerName_}.`),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']))
}
export { renderPlayerInfoScreen }
