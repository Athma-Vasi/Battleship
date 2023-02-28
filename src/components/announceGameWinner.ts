import {
	addEvtListener,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';
import { Div } from '../utilities/types';
import { preventClicksAfterWin } from './preventClicksAfterWin';
import { restartGame } from './restartGame';

const announceGameWinner = function (winner_: string) {
	const main: HTMLElement | null = document.querySelector('.main');

	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper');
	infoScreenWrapper?.remove();

	const winnerContainer = elemCreator('div')(['winner-container']);
	appendElemToParent(main)(winnerContainer);

	if (winner_ === 'comp') {
		pipe(
			addTextToElem(
				'With heavy heart and profound regret, we must report a defeat in battle. Our valiant crew fought with all their strength and skill, but alas, the enemy proved too strong for us. We honor the memory of those who gave their lives in defense of the Kingdom, and we pledge to continue the fight with renewed determination. We shall not rest until victory is ours.'
			),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']));

		//removes event listeners after win
		preventClicksAfterWin();
	} else {
		pipe(
			addTextToElem(
				`The cheers of the crew fill the bridge as the last enemy ship explodes in a ball of fire. You have emerged victorious from the heat of battle, your ship battered but still flying. Your skill and courage in the face of overwhelming odds have saved the lives of your crew and secured another victory for the Star Kingdom of Manticore. As you survey the wreckage of the enemy fleet, you know that your actions will go down in history as a shining example of the indomitable spirit of the Manticoran Navy. 
				
				Congrats ${winner_}! You have destroyed the Haven Fleet!
				`
			),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']));

		preventClicksAfterWin();
	}

	pipe(
		addTextToElem('Restart'),
		addEvtListener('click')(restartGame),
		appendElemToParent(winnerContainer)
	)(elemCreator('button')(['bttn-restart']));

	//prevents computers turn from adding evt listeners back on
	localStorage.setItem('isGameWon', JSON.stringify(true));
};
export { announceGameWinner };
