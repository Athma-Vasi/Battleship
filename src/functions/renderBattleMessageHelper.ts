import { battleTexts } from '../data/battleTexts';
import { createTypewriterEffect } from './createTypewriterEffect';
import { appendElemToParent, elemCreator } from './elementCreators';
import { tossCoin } from './tossCoin';
import { Div, RandomizedHavenShipNames, RandomizedManticoreShipNames } from '../types';

type RenderBattleMessageHelperProps = {
	towardsCombatant: 'player' | 'comp';
	firedStatus: 'hit' | 'miss' | 'sunk';
	shipTypeHit?: string;
	shipNumber?: number;
};

async function renderBattleMessageHelper({
	towardsCombatant,
	firedStatus,
	shipTypeHit,
	shipNumber,
}: RenderBattleMessageHelperProps): Promise<void> {
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

	const battleMessageContainer: Div = document.querySelector('.battleMessage-container');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(battleMessageContainer)(battleMessageElem);

	const today = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});
	const formattedTime = formatter.format(today);

	let shipName = '';
	if (towardsCombatant === 'comp') {
		if (shipTypeHit) {
			switch (shipTypeHit) {
				case 'superdreadnought': {
					shipName = havenShipNames.superdreadnought;
					break;
				}
				case 'carrier': {
					shipName = havenShipNames.carrier;
					break;
				}
				case 'battleship': {
					shipName = havenShipNames.battleship;
					break;
				}
				case 'destroyer': {
					if (shipNumber !== undefined) {
						shipName = havenShipNames.destroyers[shipNumber];
					}
					break;
				}
				case 'frigate': {
					if (shipNumber !== undefined) {
						shipName = havenShipNames.frigates[shipNumber];
					}
					break;
				}
				default: {
					break;
				}
			}
		}
	} else if (towardsCombatant === 'player') {
		if (shipTypeHit) {
			switch (shipTypeHit) {
				case 'superdreadnought': {
					shipName = manticoreShipNames.superdreadnought;
					break;
				}
				case 'carrier': {
					shipName = manticoreShipNames.carrier;
					break;
				}
				case 'battleship': {
					shipName = manticoreShipNames.battleship;
					break;
				}
				case 'destroyer': {
					if (shipNumber !== undefined) {
						shipName = manticoreShipNames.destroyers[shipNumber];
					}
					break;
				}
				case 'frigate': {
					if (shipNumber !== undefined) {
						shipName = manticoreShipNames.frigates[shipNumber];
					}
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	if (towardsCombatant === 'comp') {
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

		// if ship was hit or sunk
		if (shipTypeHit) {
			const battleMessageStrings = [
				`${formattedTime}:: ${
					tossCoin() ? `Admiral ${playerName}!` : ''
				} ${hitsPrecursorString()} the PNS ${shipName}! ${statusText}`,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
		// if ship was missed
		else {
			const battleMessageStrings = [`${formattedTime}::	${statusText}`];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
	} else if (towardsCombatant === 'player') {
		// if a miss towards player dont display a message
		if (!shipTypeHit) return;

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
			const battleMessageStrings = [
				`${formattedTime}::	${
					tossCoin() ? `Admiral ${playerName}!` : ''
				} ${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! ${statusText}`,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		} else if (firedStatus === 'sunk') {
			const battleMessageStrings = [
				`${formattedTime}::	${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! Admiral ${playerName}! Core breach detected!
				...
				Sir, she's gone... Dear God, all those people... `,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
	}
}
export { renderBattleMessageHelper };
