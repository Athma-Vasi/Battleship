type Form = HTMLFormElement | null
type Div = HTMLDivElement | null
type NodesDiv = NodeListOf<HTMLDivElement>
type Button = HTMLButtonElement | null

type Superdreadnought = {
	head: string
	body1: string
	body2: string
	body3: string
	tail: string
}

type Carrier = {
	head: string
	body1: string
	body2: string
	tail: string
}

type Battleship = {
	head: string
	body: string
	tail: string
}

type Destroyer = {
	head: string
	tail: string
}

type Frigate = {
	body: string
}

type CompShipsPlacementChoice = {
	superdreadnought: Superdreadnought
	carrier: Carrier
	battleship: Battleship
	destroyers: Destroyer[]
	frigates: Frigate[]
}

type CompShipsPlacementChoiceArr = CompShipsPlacementChoice[]

export {
	Form,
	Div,
	NodesDiv,
	Superdreadnought,
	Carrier,
	Button,
	Battleship,
	Destroyer,
	Frigate,
	CompShipsPlacementChoice,
	CompShipsPlacementChoiceArr,
}
