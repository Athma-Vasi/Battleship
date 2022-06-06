const elemCreator = (elem_: string) => (class_: string[]) => {
	const element = document.createElement(elem_)

	return class_.reduce((elem: HTMLElement, currClass: string) => {
		elem.classList.add(currClass)
		return elem
	}, element)
}

const addAttributeToElem =
	(attrVals_: Array<Array<string>>) => (elem_: HTMLElement | null) => {
		return attrVals_.reduce(
			(element: HTMLElement | null | undefined, curr: Array<string>) => {
				if (curr.length > 2) return undefined

				element?.setAttribute(curr[0], curr[1])
				return element
			},
			elem_
		)
	}

const addStyleToElem =
	(stylePropVals_: Array<Array<string>>) => (elem_: HTMLElement | null) => {
		return stylePropVals_.reduce(
			(element: HTMLElement | null | undefined, curr: string[]) => {
				if (curr.length > 2) return undefined

				element?.style.setProperty(curr[0], curr[1])
				return element
			},
			elem_
		)
	}

const addTextToElem = (text_: string) => (elem_: HTMLElement | null) => {
	const textNode = document.createTextNode(text_)
	elem_?.appendChild(textNode)
	return elem_
}

const appendElemToParent =
	(parent_: HTMLElement | null) => (child_: HTMLElement | null) => {
		if (child_) parent_?.appendChild(child_)
	}

const createImage =
	(source_: string) => (class_: string[]) => (alt_: string) => (title_: string) => {
		const image = new Image()
		image.src = source_
		image.alt = alt_
		image.title = title_

		return class_.reduce((elem: HTMLImageElement, currClass: string) => {
			elem.classList.add(currClass)
			return elem
		}, image)
	}

const addEvtListener =
	(evt_: string) =>
	(
		handleEvt_: (
			this: any,
			ev: any,
			options?: {
				capture: boolean
				once: boolean
				passive: boolean
				signal: AbortSignal
			}
		) => unknown
	) =>
	(elem_: HTMLElement | null) => {
		elem_?.addEventListener(evt_, handleEvt_)
		return elem_
	}

const pipe =
	<V>(...funcs: Array<(_: V) => any>) =>
	(value: V) =>
		funcs.reduce((res, func) => func(res), value)

export {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
}
