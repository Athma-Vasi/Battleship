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

type HavenShipNamesPool = {
	superdreadnoughts: string[]
	cruisers: string[]
	battleships: string[]
	destroyers: string[]
	frigates: string[]
}

type ManticoreShipNamesPool = {
	superdreadnoughts: string[]
	cruisers: string[]
	battleships: string[]
	destroyers: string[]
	frigates: string[]
}

type ShipNamesPool = {
	haven: HavenShipNamesPool
	manticore: ManticoreShipNamesPool
}

type BattleTexts = {
	hitsOnComp: string[]
	missesByPlayer: string[]
	playerShipDestroyed: string[]
	hitsOnPlayer: string[]
	missesByComp: string[]
	compShipDestroyed: string[]
}

type RandomizedHavenShipNames = {
	superdreadnought: string
	cruiser: string
	battleship: string
	destroyers: string[]
	frigates: string[]
}

type RandomizedManticoreShipNames = {
	superdreadnought: string
	cruiser: string
	battleship: string
	destroyers: string[]
	frigates: string[]
}

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
	HavenShipNamesPool,
	ManticoreShipNamesPool,
	ShipNamesPool,
	BattleTexts,
	RandomizedHavenShipNames,
	RandomizedManticoreShipNames,
}
