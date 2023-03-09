import { addTextToElem, appendElemToParent, elemCreator, pipe } from './elementCreators';

type TypewriterEffectProps = {
	string: string;
	childElem: HTMLElement | null;
	parentElem: HTMLElement | null;
	speed?: number;
};

/**
 * Returns a promise that resolves when the typewriter effect created by iterating through each char in the string, and adds it to child element after each char is added, the parent element is scrolled to the bottom
 *
 * @function
 * @param {object} props - props object
 * @param {string} props.string - string to create typewriter effect for
 * @param {HTMLElement} props.childElem - child element to add text to
 * @param {HTMLElement} props.parentElem - parent element to scroll to bottom
 * @param {number} props.speed - speed of typewriter effect
 * @returns {Promise<void>}
 */
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

/**
 * Iterates through an array and executes a callback function for each element. The callback function is awaited before the next element is iterated. This ensures that the callback function is executed in order.
 *
 * @function
 * @param {T[]} arr - array to iterate through
 * @param {(val: T, index: number, array: T[]) => Promise<void>} callback - callback function to execute for each element
 * @returns {Promise<void>}
 */
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

/**
 * Creates a typewriter effect for each string in the strings array. For each string, a new paragraph element is created and appended to the container element. The typewriter effect is created by iterating through each char in the string, and adds it to child element after each char is added, the parent element is scrolled to the bottom
 *
 * @function
 * @props {object} props - props object
 * @props {HTMLElement} props.containerElem - container element to append typewriter elements to
 * @props {string} props.childElemClass - class of child element to add text to
 * @props {string[]} props.strings - strings to create typewriter effect for
 * @props {number} props.speed - speed of typewriter effect
 * @returns {Promise<void>}
 */
async function createTypewriterEffect({
	containerElem,
	childElemClass = 'typewriter-text',
	strings,
	speed = 50,
}: CreateTypewriterEffectProps): Promise<void> {
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
