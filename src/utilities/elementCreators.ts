const elemCreator = (elem: string) => (classes: string[]) => {
	const element = document.createElement(elem);

	return classes.reduce((elem: HTMLElement, currClass: string) => {
		elem.classList.add(currClass);
		return elem;
	}, element);
};

const addAttributeToElem =
	(attrVals: Array<Array<string>>) => (elem: HTMLElement | null) => {
		return attrVals.reduce(
			(element: HTMLElement | null | undefined, curr: Array<string>) => {
				if (curr.length > 2) return undefined;

				element?.setAttribute(curr[0], curr[1]);
				return element;
			},
			elem
		);
	};

const addStyleToElem =
	(stylePropVals: Array<Array<string>>) => (elem: HTMLElement | null) => {
		return stylePropVals.reduce(
			(element: HTMLElement | null | undefined, curr: string[]) => {
				if (curr.length > 2) return undefined;

				element?.style.setProperty(curr[0], curr[1]);
				return element;
			},
			elem
		);
	};

const removeStyleFromElem = (styleProp: string) => (elem: HTMLElement | null) => {
	elem?.style.removeProperty(styleProp);
	return elem;
};

const addTextToElem = (text: string) => (elem: HTMLElement | null) => {
	const textNode = document.createTextNode(text);
	elem?.appendChild(textNode);
	return elem;
};

const appendElemToParent =
	(parent: HTMLElement | null) => (child: HTMLElement | null) => {
		if (child) parent?.appendChild(child);
	};

const createImage =
	(source: string) => (classes: string[]) => (alt: string) => (title: string) => {
		const image = new Image();
		image.src = source;
		image.alt = alt;
		image.title = title;

		return classes.reduce((elem: HTMLImageElement, currClass: string) => {
			elem.classList.add(currClass);
			return elem;
		}, image);
	};

const addEvtListener =
	(evt: string) =>
	(
		handleEvt: (
			this: any,
			ev: any,
			options?: {
				capture: boolean;
				once: boolean;
				passive: boolean;
				signal: AbortSignal;
			}
		) => unknown
	) =>
	(elem: HTMLElement | null) => {
		elem?.addEventListener(evt, handleEvt);
		return elem;
	};

const removeEvtListener =
	(evt: string) =>
	(
		handleEvt: (
			this: any,
			ev: any,
			options?: {
				capture: boolean;
				once: boolean;
				passive: boolean;
				signal: AbortSignal;
			}
		) => unknown
	) =>
	(elem: HTMLElement | null) => {
		elem?.removeEventListener(evt, handleEvt);
		return elem;
	};

const pipe =
	<V>(...funcs: Array<(_: V) => any>) =>
	(value: V) =>
		funcs.reduce((res, func) => func(res), value);

export {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	removeEvtListener,
	addStyleToElem,
	removeStyleFromElem,
	pipe,
};
