type Form = HTMLFormElement | null
type Div = HTMLDivElement | null
type NodesDiv = NodeListOf<HTMLDivElement>

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

type Cruiser = {
	head: string
	tail: string
}[]

type Frigate = {
	body: string
}[]

export { Form, Div, NodesDiv, Superdreadnought, Carrier, Battleship, Cruiser, Frigate }
