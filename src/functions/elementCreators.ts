/**
 * Takes a string and returns a function that takes an array of strings. The returned function creates an HTML element with the string passed to the first function as the element type, and the array of strings passed to the returned function as the classes to add to the element.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} elem - element type
 * @returns {(classes: string[]) => HTMLElement}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * // returns <div class="class1 class2"></div>
 *
 */
const elemCreator = (elem: string) => (classes: string[]) => {
	const element = document.createElement(elem);

	return classes.reduce((elem: HTMLElement, currClass: string) => {
		elem.classList.add(currClass);
		return elem;
	}, element);
};

/**
 * Takes an array of arrays of attribute name and value, and returns a function that takes an HTML element. The returned function adds the attributes to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} attrVals - array of arrays of attribute name and value
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addAttrToElem = addAttributeToElem([['id', 'id1'], ['data-test', 'test']])(divWithClasses);
 * @example using pipe
 * pipe(
 * addAttributeToElem([['id', 'id1'], ['data-test', 'test']])
 * )(elemCreator('div')(['class1', 'class2'])
 */
const addAttributeToElem = (attrVals: Array<string[]>) => (elem: HTMLElement | null) => {
	return attrVals.reduce(
		(element: HTMLElement | null | undefined, curr: Array<string>) => {
			if (curr.length > 2) return undefined;

			if (element) element.setAttribute(curr[0], curr[1]);
			return element;
		},
		elem
	);
};

/**
 *  Takes an array of arrays of style property and value, and returns a function that takes an HTML element. The returned function adds the style properties to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string[]} stylePropVals - array of arrays of style property and value
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addStyleToElem = addStyleToElem([['background-color', 'red'], ['color', 'white']])(divWithClasses);
 * @example using pipe
 * pipe(
 * addStyleToElem([['background-color', 'red'], ['color', 'white']])
 * )(elemCreator('div')(['class1', 'class2'])
 *
 */
const addStyleToElem = (stylePropVals: Array<string[]>) => (elem: HTMLElement | null) => {
	return stylePropVals.reduce(
		(element: HTMLElement | null | undefined, curr: string[]) => {
			if (curr.length > 2) return undefined;

			if (element) element.style.setProperty(curr[0], curr[1]);
			return element;
		},
		elem
	);
};

/**
 * Takes a style property and returns a function that takes an HTML element. The returned function removes the style property from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} styleProp - style property to remove
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addStyleToElem = addStyleToElem([['background-color', 'red'], ['color', 'white']])(divWithClasses);
 */
const removeStyleFromElem = (styleProp: string) => (elem: HTMLElement | null) => {
	if (elem) elem.style.removeProperty(styleProp);
	return elem;
};

/**
 * Takes a string and returns a function that takes an HTML element. The returned function adds the text to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} text - text to add to element
 * @returns {(elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 */
const addTextToElem = (text: string) => (elem: HTMLElement | null) => {
	const textNode = document.createTextNode(text);
	if (elem) elem.appendChild(textNode);
	return elem;
};

/**
 * Takes an HTML element and returns a function that takes an HTML element. The returned function appends the element passed to it to the element passed to the first function. This is a side effect function and must be the last function in a pipe.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {HTMLElement | null} parent - parent element
 * @returns {(child: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * appendElemToParent(document.body)
 * )(elemCreator('div')(['class1', 'class2'])
 */
const appendElemToParent =
	(parent: HTMLElement | null) => (child: HTMLElement | null) => {
		if (child) if (parent) parent.appendChild(child);
	};

/**
 * Takes a source as a string and returns a function that takes an array of classes as strings and returns a function that takes an alt text string and returns a function that takes a title string. The returned function creates an HTML image element with the source, alt text, and title passed to the functions.
 *
 * @function
 * @param {string} source - image source
 * @returns {(classes: string[]) => (alt: string) => (title: string) => HTMLImageElement}
 * @example
 * const imgWithClasses = createImage('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')(['class1', 'class2'])('Google Logo')('Google Logo');
 * // returns <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Logo" title="Google Logo" class="class1 class2">
 */
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

/**
 * Takes an event as a string and returns a function that takes a function that takes an event and returns a function that takes an HTML element. The returned function adds an event listener to the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} evt - event to listen for
 * @returns {(handleEvt: (this: any, ev: any, options?: { capture?: boolean; once?: boolean; passive?: boolean; signal?: AbortSignal; }) => unknown) => (elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * const addClickEvtListener = addEvtListener('click')((e) => console.log(e))(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * addEvtListener('click')((e) => console.log(e)),
 * appendElemToParent(document.body),
 * )(elemCreator('div')(['class1', 'class2'])
 */
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
		if (elem) elem.addEventListener(evt, handleEvt);
		return elem;
	};

/**
 * Takes an event as a string and returns a function that takes a function that takes an event and returns a function that takes an HTML element. The returned function removes an event listener from the element passed to it.
 * Structured as a curried function to be used with the pipe function.
 *
 * @function
 * @param {string} evt - event to remove listener for
 * @returns {(handleEvt: (this: any, ev: any, options?: { capture?: boolean; once?: boolean; passive?: boolean; signal?: AbortSignal; }) => unknown) => (elem: HTMLElement | null) => HTMLElement | null}
 * @example
 * const divWithClasses = elemCreator('div')(['class1', 'class2']);
 * const addTextToElem = addTextToElem('Hello World')(divWithClasses);
 * const appendElemToParent = appendElemToParent(document.body)(divWithClasses);
 * const addClickEvtListener = addEvtListener('click')((e) => console.log(e))(divWithClasses);
 * const removeClickEvtListener = removeEvtListener('click')((e) => console.log(e))(divWithClasses);
 * @example using pipe
 * pipe(
 * addTextToElem('Hello World'),
 * addEvtListener('click')((e) => console.log(e)),
 * removeEvtListener('click')((e) => console.log(e)),
 * appendElemToParent(document.body),
 * )(elemCreator('div')(['class1', 'class2'])
 */
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
		if (elem) elem.removeEventListener(evt, handleEvt);
		return elem;
	};

/**
 * Pipe function that takes variable number of functions and returns a function that takes a value. The returned function passes the value to the first function in the array of functions and passes the result of that function to the next function in the array and so on until the last function in the array is called. The result of the last function in the array is returned, or <void> if its a side effect function (append to DOM, add event listener, etc.) * 
 * 
 * @function
 * @param {...Array<(_: V) => any>} funcs - array of functions
 * @returns {(value: V) => any}
 * @example
 * pipe(
		addTextToElem('Restart'),
		addEvtListener('click')(restartGame),
		appendElemToParent(winnerWrapper)
	)(elemCreator('button')(['bttn-restart']));
 */

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
