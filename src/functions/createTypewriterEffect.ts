import { addTextToElem, appendElemToParent, elemCreator, pipe } from './elementCreators';

type TypewriterEffectProps = {
	string: string;
	childElem: HTMLElement | null;
	parentElem: HTMLElement | null;
	speed?: number;
};

// returns a promise that resolves when the typewriter effect created by iterating
// through each char in the string, and adds it to child element
// after each char is added, the parent element is scrolled to the bottom
async function typewriterEffect({
	string,
	childElem,
	parentElem,
	speed = 50,
}: TypewriterEffectProps): Promise<void> {
	return new Promise((resolve) => {
		let i = 0;
		const interval = setInterval(() => {
			if (i >= string.length) {
				clearInterval(interval);
				resolve();
			} else {
				if (childElem) addTextToElem(string[i])(childElem);
				i += 1;
			}

			const scrollHeight = parentElem?.scrollHeight ?? 0;
			parentElem?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' });
		}, speed);
	});
}

// iterates through an array and executes a callback function for each element
// the callback function is awaited before the next element is iterated
// ensures that the callback function is executed in order
async function asyncForEach<T>(
	arr: T[],
	callback: (val: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
	for (const [index, val] of arr.entries()) {
		await callback(val, index, arr);
	}
}

type CreateTypewriterEffectProps = {
	containerElem: HTMLElement | null;
	childElemClass?: string;
	strings: string[];
	speed?: number;
};

// creates a typewriter effect for each string in the strings array
// for each string, a new paragraph element is created and appended to the container element
async function createTypewriterEffect({
	containerElem,
	childElemClass = 'typewriter-text',
	strings,
	speed = 50,
}: CreateTypewriterEffectProps) {
	asyncForEach(strings, async (string: string, index) => {
		const typewriterElem = elemCreator('p')([childElemClass]);
		appendElemToParent(containerElem)(typewriterElem);

		await typewriterEffect({
			string,
			childElem: typewriterElem,
			parentElem: containerElem,
			speed,
		});

		const length = strings.length;
		if (index < length - 1)
			pipe(appendElemToParent(containerElem))(elemCreator('br')(['break']));

		const scrollHeight = containerElem?.scrollHeight ?? 0;
		containerElem?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' });
	});
}

export { createTypewriterEffect };
