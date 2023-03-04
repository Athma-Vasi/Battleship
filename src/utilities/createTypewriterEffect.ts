import { greetingsText } from '../data/greetingsText';
import { appendElemToParent, elemCreator, pipe } from './elementCreators';
import { Div } from './types';

function createTypewriterEffect(
	string: string,
	elem: HTMLElement | null,
	speed = 50
): Promise<void> {
	return new Promise((resolve) => {
		let i = 0;
		const interval = setInterval(() => {
			if (i >= string.length) {
				clearInterval(interval);
				resolve();
			} else {
				if (elem) elem.innerHTML += string[i];
				i += 1;
			}
		}, speed);
	});
}

async function asyncForEach<T>(
	arr: T[],
	callback: (val: T, index: number, array: T[]) => Promise<void>
) {
	for await (const [index, val] of arr.entries()) {
		await callback(val, index, arr);
	}
}

const greetingsContainer: Div = document.querySelector('.greetings-container');

function testing(containerElem: HTMLElement | null, strings: string[], speed = 50) {
	asyncForEach(strings, async (text) => {
		const greetings = elemCreator('p')(['greetings']);
		appendElemToParent(containerElem)(greetings);

		await createTypewriterEffect(text, greetings, speed);

		pipe(appendElemToParent(greetingsContainer))(elemCreator('br')(['break']));
	});
}

export { testing };
