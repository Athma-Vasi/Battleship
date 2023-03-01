import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';

const renderPlayerInfoScreen = function (playerName_: string) {
	// scroll to top of page
	window.scrollTo(0, 0);

	const main: HTMLElement | null = document.querySelector('.main');

	const infoScreenWrapper = elemCreator('div')(['preBattle-infoScreen']);
	appendElemToParent(main)(infoScreenWrapper);

	const infoScreenContainer = elemCreator('div')(['infoScreen-container']);
	appendElemToParent(infoScreenWrapper)(infoScreenContainer);

	pipe(
		addTextToElem(
			`By the Grace of God, Queen of Manticore, Protector of the Realm, Elizabeth III, to all her loyal soldiers: `
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(`Sailors of Manticore!`),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`You stand on the precipice of a great battle, a battle that has been months in the making. The galaxy watches with bated breath as we prepare to face our enemy, the tyrannical People's Republic of Haven. But we do not stand alone. The hopes and prayers of all those who cherish freedom and liberty march with us into battle.`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`Let our enemies tremble at the sound of our thundering grasers! Let them cower before our fierce determination and unbreakable will! For we are the soldiers of Manticore, and we will not allow our kingdom to be violated or our families to be terrorized!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`Our cause is just, our determination unbreakable, and our courage unwavering. We fight not just for our kingdom, but for the ideals that it represents: justice, freedom, and the rule of law. Our enemy seeks to trample these ideals underfoot, but we will not let them!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`I have faith in you, my fellow sailors. I have seen your bravery, your tenacity, and your skill. You are the best of the best, the defenders of our beloved Manticore. And so I say to you, go forth into battle with heads held high, with hearts filled with the spirit of Manticore. The eyes of the galaxy are upon us, and we will not disappoint. Victory is within our grasp, and we shall seize it with all our might!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(
			`We are the defenders of the Star Kingdom of Manticore, and we will fight to protect our people and our home. We will stand strong against the enemy, and we will not rest until they are defeated and our kingdom is safe!`
		),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));

	pipe(
		addTextToElem(`Ready fleet formation, Admiral ${playerName_}.`),
		appendElemToParent(infoScreenContainer)
	)(elemCreator('p')(['infoScreen-preBattleMssg']));
};
export { renderPlayerInfoScreen };
