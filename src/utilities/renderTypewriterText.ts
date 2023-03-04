import { addTextToElem, appendElemToParent, elemCreator, pipe } from './elementCreators';

function renderTypewriterText(
	text: string[],
	element: HTMLElement | null,
	speed: number
): void {
	const textArray = text.join('\n\n').split('');
	let i = 0;

	const timer = setInterval(() => {
		if (element) {
			element.textContent += textArray[i];
		}

		i += 1;
		if (i >= textArray.length) {
			clearInterval(timer);
		}
	}, speed);
}

export { renderTypewriterText };
