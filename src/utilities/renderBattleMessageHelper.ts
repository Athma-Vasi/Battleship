import { battleTexts } from '../data/battleTexts';
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	pipe,
	addStyleToElem,
} from './elementCreators';
import { tossCoin } from './tossCoin';
import { Div, RandomizedHavenShipNames, RandomizedManticoreShipNames } from './types';

type RenderBattleMessageHelperProps = {
	towardsCombatant: 'player' | 'comp';
	firedStatus: 'hit' | 'miss' | 'sunk';
	shipTypeHit?: string;
	shipNumber?: number;
};

function renderBattleMessageHelper({
	towardsCombatant,
	firedStatus,
	shipTypeHit,
	shipNumber,
}: RenderBattleMessageHelperProps): void {
	const randHitsStrings = [
		'A hit on',
		'Direct hit on',
		'Shields weak on',
		'Hull integrity is weakening on',
		'Impellers damaged on',
		'Engines are out on',
		'Weapons systems offline on',
		'Life support failing on',
		'Structural damage on',
		'Reactor breach on',
		'Target immobilized on',
		'Power systems fluctuating on',
		'Navigational systems down on',
		'Communication systems disabled on',
		'Gravity generators failing on',
		'Primary sensor array damaged on',
		'Secondary defenses compromised on',
		'Point defense systems offline on',
		'Missile tubes destroyed on',
	];
	const hitsPrecursorString = () =>
		randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)];

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? ''
	);
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? ''
	);

	const playerName = JSON.parse(localStorage.getItem('playerName') ?? '');

	const battleMessageWrapper: Div = document.querySelector('.battleMessage-wrapper');

	const battleMessageContainer: Div = document.querySelector('.battleMessage-container');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(battleMessageContainer)(battleMessageElem);

	{
		const today = new Date();
		const formatter = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		});
		const formattedDate = formatter.format(today);

		const dividerElem = elemCreator('p')(['dividerElem']);
		pipe(
			addTextToElem('_______________________'),
			addStyleToElem([['color', '#00f000']]),
			appendElemToParent(battleMessageContainer)
		)(dividerElem);

		pipe(addTextToElem(`T-year 1913 ${formattedDate}`))(battleMessageElem);

		Array.from({ length: 2 }).forEach(() => {
			pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));
		});
	}

	if (towardsCombatant === 'comp') {
		const shipName =
			shipTypeHit &&
			(shipTypeHit === 'superdreadnought'
				? havenShipNames.superdreadnought
				: shipTypeHit === 'carrier'
				? havenShipNames.carrier
				: shipTypeHit === 'battleship'
				? havenShipNames.battleship
				: shipTypeHit === 'destroyer' && shipNumber
				? havenShipNames.destroyers[shipNumber]
				: shipTypeHit === 'frigate' && shipNumber
				? havenShipNames.frigates[shipNumber]
				: '');

		const statusText =
			firedStatus === 'hit'
				? battleTexts.hitsOnShip[
						Math.floor(Math.random() * battleTexts.hitsOnShip.length)
				  ]
				: firedStatus === 'miss'
				? battleTexts.missesOnShip[
						Math.floor(Math.random() * battleTexts.missesOnShip.length)
				  ]
				: firedStatus === 'sunk'
				? battleTexts.compShipDestroyed[
						Math.floor(Math.random() * battleTexts.compShipDestroyed.length)
				  ]
				: '';

		if (shipTypeHit) {
			pipe(
				addTextToElem(
					`${
						tossCoin() ? `Admiral ${playerName}!` : ''
					} ${hitsPrecursorString()} the PNS ${shipName}! ${statusText}`
				)
			)(battleMessageElem);
		} else {
			pipe(addTextToElem(`${tossCoin() ? `Admiral ${playerName}!` : ''} ${statusText}`))(
				battleMessageElem
			);
		}
	} else if (towardsCombatant === 'player') {
		// if a miss towards player dont display a message
		if (!shipTypeHit) return;

		const shipName =
			shipTypeHit &&
			(shipTypeHit === 'superdreadnought'
				? manticoreShipNames.superdreadnought
				: shipTypeHit === 'carrier'
				? manticoreShipNames.carrier
				: shipTypeHit === 'battleship'
				? manticoreShipNames.battleship
				: shipTypeHit === 'destroyer' && shipNumber
				? manticoreShipNames.destroyers[shipNumber]
				: shipNumber && manticoreShipNames.frigates[shipNumber]);

		// only add text if ship was hit or sunk
		const statusText =
			firedStatus === 'hit'
				? battleTexts.damageOnShip[
						Math.floor(Math.random() * battleTexts.damageOnShip.length)
				  ]
				: firedStatus === 'sunk'
				? battleTexts.playerShipDestroyed[
						Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
				  ]
				: '';

		if (firedStatus === 'hit') {
			pipe(
				addTextToElem(
					`${
						tossCoin() ? `Admiral ${playerName}!` : ''
					} ${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! ${statusText}`
				)
			)(battleMessageElem);
		} else if (firedStatus === 'sunk') {
			pipe(
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem(
					`${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! Admiral ${playerName}! Core breach detected!
          ...
          Sir, she's gone... Dear God, all those people... `
				)
			)(battleMessageElem);
		}
	}
}
export { renderBattleMessageHelper };
