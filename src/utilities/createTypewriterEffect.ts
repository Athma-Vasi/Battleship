import { addTextToElem, appendElemToParent, elemCreator, pipe } from './elementCreators';

type TypewriterEffectProps = {
	string: string;
	childElem: HTMLElement | null;
	parentElem: HTMLElement | null;
	speed?: number;
};

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
	strings: string[];
	speed?: number;
};

async function createTypewriterEffect({
	containerElem,
	strings,
	speed = 50,
}: CreateTypewriterEffectProps) {
	asyncForEach(strings, async (string: string, index) => {
		const typewriterElem = elemCreator('p')(['typewriter-text']);
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
