import {
	addEvtListener,
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../functions/elementCreators';
import { Div } from '../types';
import { createTypewriterEffect } from './createTypewriterEffect';
import { preventClicksAfterWin } from './preventClicksAfterWin';
import { restartGame } from './restartGame';

const announceGameWinner = function (winner_: string): void {
	const main: HTMLElement | null = document.querySelector('.main');

	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper');
	infoScreenWrapper?.remove();

	const winnerWrapper = elemCreator('div')(['winner-wrapper']);
	appendElemToParent(main)(winnerWrapper);

	const winnerContainer = elemCreator('div')(['winner-container']);
	appendElemToParent(winnerWrapper)(winnerContainer);

	pipe(
		addTextToElem('Restart'),
		addEvtListener('click')(restartGame),
		appendElemToParent(winnerWrapper)
	)(elemCreator('button')(['bttn-restart']));

	if (winner_ === 'comp') {
		createTypewriterEffect({
			containerElem: winnerContainer,
			childElemClass: 'winner-announcement',
			strings: [
				'DEFEAT!',
				'With heavy heart and profound regret, we must report a defeat in battle. Our valiant crew fought with all their strength and skill, but alas, the enemy proved too strong for us.',
				'We honor the memory of those who gave their lives in defense of the Kingdom, and we pledge to continue the fight with renewed determination. We shall not rest until victory is ours!',
			],
		});

		// removes event listeners after win
		preventClicksAfterWin();
	} else {
		createTypewriterEffect({
			containerElem: winnerContainer,
			childElemClass: 'winner-announcement',
			strings: [
				'VICTORY!',
				'The cheers of the crew fill the bridge as the last enemy ship explodes in a ball of fire. You have emerged victorious from the heat of battle, your ships battered but still flying.',
				'Your skill and courage in the face of overwhelming odds have saved the lives of your crew and secured another victory for the Star Kingdom of Manticore.',
				'As you survey the wreckage of the enemy fleet, you know that your actions will go down in history as a shining example of the indomitable spirit of the Manticoran Navy.',
				`Congrats ${winner_}! You have destroyed the Haven Fleet!`,
			],
		});

		preventClicksAfterWin();
	}

	// prevents computers turn from adding evt listeners back on
	localStorage.setItem('isGameWon', JSON.stringify(true));
};
export { announceGameWinner };

/*

		pipe(
			addTextToElem(
				'With heavy heart and profound regret, we must report a defeat in battle. Our valiant crew fought with all their strength and skill, but alas, the enemy proved too strong for us. We honor the memory of those who gave their lives in defense of the Kingdom, and we pledge to continue the fight with renewed determination. We shall not rest until victory is ours!'
			),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']));


		pipe(
			addTextToElem(
				`The cheers of the crew fill the bridge as the last enemy ship explodes in a ball of fire. You have emerged victorious from the heat of battle, your ships battered but still flying. Your skill and courage in the face of overwhelming odds have saved the lives of your crew and secured another victory for the Star Kingdom of Manticore. As you survey the wreckage of the enemy fleet, you know that your actions will go down in history as a shining example of the indomitable spirit of the Manticoran Navy. 
				
				Congrats ${winner_}! You have destroyed the Haven Fleet!
				`
			),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']));

*/
