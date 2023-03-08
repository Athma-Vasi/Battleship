import { preBattleTexts } from '../data/preBattleTexts';
import { createTypewriterEffect } from '../functions/createTypewriterEffect';
import { appendElemToParent, elemCreator } from '../functions/elementCreators';

const renderPlayerInfoScreen = function (playerName_: string): void {
	// scroll to top of page
	window.scrollTo(0, 0);

	const main: HTMLElement | null = document.querySelector('.main');

	const infoScreenContainer = elemCreator('div')(['infoScreen-container']);
	appendElemToParent(main)(infoScreenContainer);

	preBattleTexts.push(`Ready fleet formation, Admiral ${playerName_}.`);

	createTypewriterEffect({
		containerElem: infoScreenContainer,
		strings: preBattleTexts,
		speed: 25,
	});
};

export { renderPlayerInfoScreen };
