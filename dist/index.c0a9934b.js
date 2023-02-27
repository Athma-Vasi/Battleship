const e = (e) => (t) => {
		const o = document.createElement(e);
		return t.reduce((e, t) => (e.classList.add(t), e), o);
	},
	t = (e) => (t) =>
		e.reduce((e, t) => {
			if (!(t.length > 2)) return null == e || e.setAttribute(t[0], t[1]), e;
		}, t),
	o = (e) => (t) =>
		e.reduce((e, t) => {
			if (!(t.length > 2)) return null == e || e.style.setProperty(t[0], t[1]), e;
		}, t),
	r = (e) => (t) => {
		const o = document.createTextNode(e);
		return null == t || t.appendChild(o), t;
	},
	a = (e) => (t) => {
		t && (null == e || e.appendChild(t));
	},
	l = (e) => (t) => (o) => (null == o || o.addEventListener(e, t), o),
	n = (e) => (t) => (o) => (null == o || o.removeEventListener(e, t), o),
	i =
		(...e) =>
		(t) =>
			e.reduce((e, t) => t(e), t),
	s = function () {
		const o = document.querySelector('.main'),
			r = e('div')(['bothBoards-container']);
		a(o)(r);
		const l = e('div')(['playerBoard-wrapper']);
		a(r)(l);
		const n = e('div')(['playerBoard-container']);
		a(l)(n);
		for (let o = 0; o < 10; o += 1)
			for (let r = 0; r < 10; r += 1)
				i(t([['data-cellplayer', `${r},${o}`]]), a(n))(e('div')(['player-gameCell']));
	},
	c = function (t) {
		const o = document.querySelector('.main'),
			l = e('div')(['preBattle-infoScreen']);
		a(o)(l);
		const n = e('div')(['infoScreen-container']);
		a(l)(n),
			i(
				r(
					'Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not!'
				),
				a(n)
			)(e('p')(['infoScreen-preBattleMssg'])),
			i(
				r(
					'You are about to embark upon the Great Battle, toward which we have striven these many months. The eyes of the galaxy are upon you. The hopes and prayers of liberty-loving people everywhere march with you. In company with our brave Allies and brothers-in-arms on other Sectors, you will bring about the destruction of the Haven war machine, the eliminations of their tyranny over oppressed people, and the security for ourselves in a free galaxy!'
				),
				a(n)
			)(e('p')(['infoScreen-preBattleMssg'])),
			i(
				r(`Ready fleet formation, Admiral ${t}.`),
				a(n)
			)(e('p')(['infoScreen-preBattleMssg']));
	},
	d = function (e) {
		const t = this.textContent;
		'Axis-X' === t
			? ((this.textContent = ''), (this.textContent = 'Axis-Y'))
			: 'Axis-Y' === t && ((this.textContent = ''), (this.textContent = 'Axis-X'));
	},
	u = function (e) {
		var t;
		const o = JSON.parse(
			null !== (t = localStorage.getItem('playerShipsCoords')) && void 0 !== t ? t : ''
		);
		e.forEach((e) => o.push(e)),
			localStorage.setItem('playerShipsCoords', JSON.stringify(o));
	},
	h = function () {
		const e = document.querySelectorAll('.compShipPresent'),
			t = document.querySelectorAll('.compShipNotPresent');
		e.forEach((e) => {
			i(n('click')(g))(e);
		}),
			t.forEach((e) => {
				i(n('click')(C))(e);
			});
	},
	p = function () {
		localStorage.clear(), self.location.reload();
	},
	y = function (t) {
		const o = document.querySelector('.main'),
			n = e('div')(['winner-container']);
		a(o)(n),
			i(r('Restart'), l('click')(p), a(n))(e('button')(['bttn-restart'])),
			'comp' === t
				? (i(
						r('Fall back and regroup! We will not surrender!'),
						a(n)
				  )(e('p')(['winner-announcement'])),
				  h())
				: (i(
						r(`Congrats ${t}! You have destroyed the Haven Fleet!`),
						a(n)
				  )(e('p')(['winner-announcement'])),
				  h()),
			localStorage.setItem('isGameWon', JSON.stringify(!0));
	},
	m = {
		hitsOnComp: [
			'A hit, Sir!',
			'Direct hit, Sir!',
			'We must have taken out her forward impellers!',
			'Direct hit on their com section!',
			'We just took out most of her missile tracking capability!',
			'One hit, port side aft!',
			'A hit, Sir! At least one, and—',
			'Her forward impellers are down!',
			'Roll port! All batteries, engage!',
			'Engage with forward batteries!',
			"They're taking the bait, Sir!",
			'Formation Reno, Com—get those cruisers in tighter!',
			'Recompute firing pattern.',
		],
		missesByPlayer: [
			'The enemy has returned fire!',
			'Tracking reports sixteen incoming, Sir!',
			'Enemy jamming primary tracking systems!',
			'Enemy countermeasures active!',
			'Crossing minefield attack perimeter—now!',
		],
		playerShipDestroyed: ["Sir, it's gone... Dear God, all those people..."],
		hitsOnPlayer: [
			"Forward hold open to space! Mooring Tractor One's gone! Heavy casualties in Fusion One!",
			"We've lost Damage Control Three, Sir!",
			"Missile One is down, Sir! We're down to one tube.",
			'Spinal Four gone, Sir!',
			"We've lost the secondary fire control sensors!. Primaries unaffected.",
			'Damage control to the bridge! Corpsman to the bridge!',
			"Fusion One, Sir! The mag bottle's fluctuating and can't be shut down from here—something's cut the circuits!",
			"Sir, we're down to twelve birds for Missile Two, and out of laser heads.",
			'Heavy damage aft! No contact at all with Two-Four or Two-Six.',
			"Sir, we've lost a beta node; our acceleration is dropping.",
			"We've lost another beta node, Sir",
			"Point defense is hurt bad, Sir! We've lost four laser clusters and half our phased radar array.",
			"We've lost an energy torpedo and Number Two Laser out of the starboard broadside, but at least the starboard sidewall is still up.",
			'Tractor Seven is gone!',
			'Compartments Eight-Niner-Two and Niner-Three open to space. No casualties!',
			'Two hits forward! Laser Three and Five destroyed. Radar Five is gone, Sir! Heavy casualties in Laser Three!',
			'Missile Two-One and Graser One gone! Heavy damage in the boat bay and Berthing Compartment Seven-five!',
		],
		missesByComp: [
			'They missed! Counter missiles now!',
			'Ha! Go to rapid fire on all tubes!',
			"We won't get another chance! Get those impellers back for me, Lieutenant!",
			'A miss! Increase acceleration to max!',
			"This is our chance! Close the range. We'll finish her with energy fire!",
			'Missiles at three-five-two! Lucky this time..',
			'Hard a starboard!',
			'Pursuit vector, maximum acceleration!',
			'General signal to all heavy cruisers. Return to formation at once. Repeat, return to formation at once!',
		],
		compShipDestroyed: ["Yes! She's streaming air, Sir!"],
	},
	b = function (t, o, l, n) {
		const s = [
				'A hit on',
				'Direct hit on',
				'Shields weak on',
				'Hull integrity is weakening on',
				'Impellers damaged on',
			],
			c = s[Math.floor(Math.random() * s.length)];
		var d;
		const u = JSON.parse(
			null !== (d = localStorage.getItem('havenShipNames')) && void 0 !== d ? d : ''
		);
		var h;
		const p = JSON.parse(
			null !== (h = localStorage.getItem('manticoreShipNames')) && void 0 !== h ? h : ''
		);
		var y;
		const b = JSON.parse(
				null !== (y = localStorage.getItem('playerName')) && void 0 !== y ? y : ''
			),
			g = document.querySelector('.infoScreen-wrapper'),
			S = e('p')(['battleMessageElem']);
		if ((a(g)(S), 'comp' === l)) {
			var f;
			const e = Object.values(
				JSON.parse(
					null !== (f = localStorage.getItem('compSuperdreadnought')) && void 0 !== f
						? f
						: ''
				)
			);
			var v;
			const o = Object.values(
				JSON.parse(
					null !== (v = localStorage.getItem('compCarrier')) && void 0 !== v ? v : ''
				)
			);
			var C;
			const a = Object.values(
				JSON.parse(
					null !== (C = localStorage.getItem('compBattleship')) && void 0 !== C ? C : ''
				)
			);
			let l = [];
			var x;
			JSON.parse(
				null !== (x = localStorage.getItem('compDestroyers')) && void 0 !== x ? x : ''
			).forEach((e) => {
				l.push(Object.values(e));
			}),
				(l = l.flat());
			let s = [];
			var N;
			if (
				(JSON.parse(
					null !== (N = localStorage.getItem('compFrigates')) && void 0 !== N ? N : ''
				).forEach((e) => {
					s.push(Object.values(e));
				}),
				(s = s.flat()),
				'hit' === n)
			) {
				if (e.includes(t))
					i(
						r(
							`${b}'s turn: ${c} the superdreadnought PNS ${u.superdreadnought}! ${
								m.hitsOnComp[Math.floor(Math.random() * m.hitsOnComp.length)]
							}`
						)
					)(S);
				else if (o.includes(t))
					i(
						r(
							`${b}'s turn: ${c} the carrier PNS ${u.cruiser}! ${
								m.hitsOnComp[Math.floor(Math.random() * m.hitsOnComp.length)]
							}`
						)
					)(S);
				else if (a.includes(t))
					i(
						r(
							`${b}'s turn: ${c} the battleship PNS ${u.battleship}! ${
								m.hitsOnComp[Math.floor(Math.random() * m.hitsOnComp.length)]
							}`
						)
					)(S);
				else if (l.includes(t)) {
					var O;
					const [e, o] = JSON.parse(
						null !== (O = localStorage.getItem('compDestroyers')) && void 0 !== O ? O : ''
					);
					console.log(e);
					const a = [];
					Object.values(e).forEach((e) => {
						a.push(e);
					}),
						i(
							r(
								`${b}'s turn: ${c} the destroyer PNS ${
									a.includes(t) ? u.destroyers[0] : u.destroyers[1]
								}! ${m.hitsOnComp[Math.floor(Math.random() * m.hitsOnComp.length)]}`
							)
						)(S);
				} else if (s.includes(t)) {
					var $;
					const [e, o] = JSON.parse(
							null !== ($ = localStorage.getItem('compFrigates')) && void 0 !== $ ? $ : ''
						),
						a = [];
					Object.values(e).forEach((e) => {
						a.push(e);
					}),
						i(
							r(
								`${b}'s turn: ${c} the frigate PNS ${
									a.includes(t) ? u.frigates[0] : u.frigates[1]
								}! ${m.hitsOnComp[Math.floor(Math.random() * m.hitsOnComp.length)]}`
							)
						)(S);
				}
			} else
				'miss' === n &&
					i(
						r(
							`${b}'s turn: ${
								m.missesByPlayer[Math.floor(Math.random() * m.missesByPlayer.length)]
							}`
						)
					)(S);
		} else if ('player' === l)
			if ('hit' === n) {
				if ('S' === o)
					i(
						r(
							`Haven's turn: ${c} the superdreadnought RMNS ${p.superdreadnought}! ${
								m.hitsOnPlayer[Math.floor(Math.random() * m.hitsOnPlayer.length)]
							}`
						)
					)(S);
				else if ('C' === o)
					i(
						r(
							`Haven's turn: ${c} the carrier RMNS ${p.cruiser}! ${
								m.hitsOnPlayer[Math.floor(Math.random() * m.hitsOnPlayer.length)]
							}`
						)
					)(S);
				else if ('B' === o)
					i(
						r(
							`Haven's turn: ${c} the battleship RMNS ${p.battleship}! ${
								m.hitsOnPlayer[Math.floor(Math.random() * m.hitsOnPlayer.length)]
							}`
						)
					)(S);
				else if ('D' === o) {
					var q;
					const [e, o] = JSON.parse(
							null !== (q = localStorage.getItem('destroyer')) && void 0 !== q ? q : ''
						),
						a = [];
					Object.values(e).forEach((e) => {
						a.push(e);
					}),
						i(
							r(
								`Haven's turn: ${c} the destroyer RMNS ${
									a.includes(t) ? p.destroyers[0] : p.destroyers[1]
								}! ${m.hitsOnPlayer[Math.floor(Math.random() * m.hitsOnPlayer.length)]}`
							)
						)(S);
				} else if ('F' === o) {
					var I;
					const [e, o] = JSON.parse(
							null !== (I = localStorage.getItem('frigate')) && void 0 !== I ? I : ''
						),
						a = [];
					Object.values(e).forEach((e) => {
						a.push(e);
					}),
						i(
							r(
								`Haven's turn: ${c} the frigate RMNS ${
									a.includes(t) ? p.frigates[0] : p.frigates[1]
								}! ${m.hitsOnPlayer[Math.floor(Math.random() * m.hitsOnPlayer.length)]}`
							)
						)(S);
				}
			} else
				'miss' === n &&
					i(
						r(
							`Haven's turn: ${
								m.missesByComp[Math.floor(Math.random() * m.missesByComp.length)]
							}`
						)
					)(S);
	},
	g = function (e) {
		var t;
		localStorage.getItem('totalHitsOnCompShips') ||
			localStorage.setItem('totalHitsOnCompShips', JSON.stringify(0));
		const o = JSON.parse(
			null !== (t = localStorage.getItem('compShipsCoords')) && void 0 !== t ? t : ''
		);
		var r;
		let a = JSON.parse(
			null !== (r = localStorage.getItem('totalHitsOnCompShips')) && void 0 !== r ? r : ''
		);
		var l;
		const s = null !== (l = this.dataset.cellcomp) && void 0 !== l ? l : '';
		if (o.includes(s) && 17 === a) {
			var c;
			const e = JSON.parse(
				null !== (c = localStorage.getItem('playerName')) && void 0 !== c ? c : ''
			);
			y(e);
		}
		var d;
		const u = null !== (d = this.textContent) && void 0 !== d ? d : '';
		b(s, u, 'comp', 'hit');
		const h = document.querySelector('.infoScreen-wrapper');
		var p;
		const m = null !== (p = null == h ? void 0 : h.scrollHeight) && void 0 !== p ? p : 0;
		var S;
		null == h || h.scroll({ top: m, left: 0, behavior: 'smooth' }),
			(this.textContent = ''),
			(this.textContent = '💥'),
			(this.style.color = '#f0a400'),
			localStorage.getItem('compShipsHitCoords') ||
				localStorage.setItem('compShipsHitCoords', JSON.stringify([]));
		const f = JSON.parse(
			null !== (S = localStorage.getItem('compShipsHitCoords')) && void 0 !== S ? S : ''
		);
		f.includes(s) ||
			(f.push(s),
			localStorage.setItem('compShipsHitCoords', JSON.stringify(f)),
			(a += 1),
			localStorage.setItem('totalHitsOnCompShips', JSON.stringify(a)));
		const x = document.querySelectorAll('.compShipPresent'),
			N = document.querySelectorAll('.compShipNotPresent');
		x.forEach((e) => {
			i(n('click')(g))(e);
		}),
			N.forEach((e) => {
				i(n('click')(C))(e);
			}),
			setTimeout(v, 2e3);
	},
	S = function (e) {
		var t;
		const r = JSON.parse(
			null !== (t = localStorage.getItem('playerShipsCoords')) && void 0 !== t ? t : ''
		);
		var a;
		let l = JSON.parse(
			null !== (a = localStorage.getItem('totalHitsOnPlayerShips')) && void 0 !== a
				? a
				: ''
		);
		if (r.includes(e)) {
			const t = document.querySelector(`[data-cellplayer="${e}"]`),
				o = e;
			var n;
			const r =
				null !== (n = null == t ? void 0 : t.textContent) && void 0 !== n ? n : '';
			b(o, r, 'player', 'hit'),
				t && ((t.textContent = ''), (t.textContent = '💥')),
				(l += 1),
				localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(l));
		} else {
			const t = document.querySelector(`[data-cellplayer="${e}"]`),
				r = e;
			var s;
			const a =
				null !== (s = null == t ? void 0 : t.textContent) && void 0 !== s ? s : '';
			b(r, a, 'player', 'miss');
			const l = document.querySelector('.infoScreen-wrapper');
			var c;
			const n =
				null !== (c = null == l ? void 0 : l.scrollHeight) && void 0 !== c ? c : 0;
			var d;
			null == l || l.scroll({ top: n, left: 0, behavior: 'smooth' }),
				t &&
					((t.textContent = ''), (t.textContent = '✖'), i(o([['color', '#f0a400']]))(t)),
				localStorage.getItem('prevCompMissOnPlayerCoord') ||
					localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(''));
			const u = JSON.parse(
					null !== (d = localStorage.getItem('prevCompMissOnPlayerCoord')) && void 0 !== d
						? d
						: ''
				),
				h = document.querySelector(`[data-cellplayer="${u}"]`);
			i(o([['color', 'gainsboro']]))(h),
				localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(r));
		}
	},
	f = function () {
		let e = `${Math.floor(10 * Math.random())},${Math.floor(10 * Math.random())}`;
		var t;
		localStorage.getItem('compAttackGuesses') ||
			localStorage.setItem('compAttackGuesses', JSON.stringify([]));
		const o = JSON.parse(
			null !== (t = localStorage.getItem('compAttackGuesses')) && void 0 !== t ? t : ''
		);
		let r = !1;
		for (; !r; )
			o.includes(e)
				? ((r = !1),
				  (e = `${Math.floor(10 * Math.random())},${Math.floor(10 * Math.random())}`))
				: ((r = !0),
				  o.push(e),
				  localStorage.setItem('compAttackGuesses', JSON.stringify(o)));
		return e;
	},
	v = function () {
		var e;
		localStorage.getItem('isGameWon') ||
			localStorage.setItem('isGameWon', JSON.stringify(''));
		if (
			!JSON.parse(
				null !== (e = localStorage.getItem('isGameWon')) && void 0 !== e ? e : ''
			)
		) {
			var t;
			localStorage.getItem('totalHitsOnPlayerShips') ||
				localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(0));
			const e = JSON.parse(
					null !== (t = localStorage.getItem('playerShipsCoords')) && void 0 !== t
						? t
						: ''
				),
				r = f();
			if (e.includes(r)) {
				var o;
				17 ===
					JSON.parse(
						null !== (o = localStorage.getItem('totalHitsOnPlayerShips')) && void 0 !== o
							? o
							: ''
					) && y('comp');
			}
			S(r);
			document.querySelectorAll('.compShipPresent').forEach((e) => {
				i(l('click')(g))(e);
			});
			document.querySelectorAll('.compShipNotPresent').forEach((e) => {
				i(l('click')(C))(e);
			});
		}
	},
	C = function (e) {
		var t;
		const r = null !== (t = this.dataset.cellcomp) && void 0 !== t ? t : '';
		var a;
		const l = null !== (a = this.textContent) && void 0 !== a ? a : '';
		b(r, l, 'comp', 'miss');
		const s = document.querySelector('.infoScreen-wrapper');
		var c;
		const d = null !== (c = null == s ? void 0 : s.scrollHeight) && void 0 !== c ? c : 0;
		var u;
		null == s || s.scroll({ top: d, left: 0, behavior: 'smooth' }),
			this.textContent,
			(this.textContent = '✖'),
			i(o([['color', '#f0a400']]))(this),
			localStorage.getItem('prevPlayerMissOnCompCoord') ||
				localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(''));
		const h = JSON.parse(
				null !== (u = localStorage.getItem('prevPlayerMissOnCompCoord')) && void 0 !== u
					? u
					: ''
			),
			p = document.querySelector(`[data-cellcomp="${h}"]`);
		i(o([['color', 'gainsboro']]))(p),
			localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(r));
		const y = document.querySelectorAll('.compShipNotPresent'),
			m = document.querySelectorAll('.compShipPresent');
		y.forEach((e) => {
			i(n('click')(C))(e);
		}),
			m.forEach((e) => {
				i(n('click')(g))(e);
			}),
			setTimeout(v, 2e3);
	},
	x = {
		haven: {
			superdreadnoughts: [
				'Nouveau Paris',
				'Danville',
				'Havensport',
				'Juneau',
				'Kaplin',
				"Macrea's Tor",
				'La Martin',
				'LaFayette',
				'Lutetia',
				'Merston',
				'New Boston',
				'Toulon',
				'Tregizva',
				'Waldensville',
				'Kaplan',
				'Merston',
				'Shaldon',
				"René d'Aiguillon",
				'Du Quesne',
				"D'Allonville",
				'Alphand',
				'Baudin',
				'Charette',
				'Forbin',
				'Guichen',
				"D'Iberville",
				'Lepanto',
				'Mouchez',
				'Tilden',
				'Rouseau',
				'Salamis',
				'Sovereign of Space',
				'Bayard',
				'Cannonade',
				'Conquete',
				'Guerriere',
				'Hero',
				'Lancelot',
				'New Republic',
				'Victorieux',
				'Temeraire',
			],
			cruisers: [
				'Sword',
				'Claymore',
				'Cutlass',
				'Dirk',
				'Drusus',
				'Durandal',
				'Epee',
				'Estoc',
				'Excalibur',
				'Falchion',
				'Flamberge',
				'Foil',
				'Gladius',
				'Jian',
				'Katana',
				'Khopesh',
				'Poignard',
				'Raiden',
				'Rapier',
				'Sabre',
				'Scimitar',
				'Shamshir',
				'Wakasashi',
				'Mars',
				'Loki',
				'Marduk',
				'Nurghal',
				'Odin',
				'Thor',
				'Tyr',
				'Anhur',
				'Ares',
				'De Conde',
				'Hachiman',
				'Huan-Ti',
				'Ishtar',
				'Rienzi',
				'Tanit',
				'Krashnark',
				'Morrigan',
				'Yama',
			],
			battleships: [
				'Tiger',
				'Bengal',
				'Bobcat',
				'Burmese',
				'Cheetah',
				'Cougar',
				'Jaguar',
				'Leopard',
				'Lion',
				'Lioness',
				'Lynx',
				'Manx',
				'Mountain Lion',
				'Ocelot',
				'Panther',
				'Puma',
				'Sabretooth',
				'Wildcat',
				'Sultan',
				'Abdali',
				'Achmed',
				'Alp Arslan',
				'Bayezid',
				'Fatih',
				'Isa',
				'Kerebin',
				'Malik',
				'Mehmed',
				'Murad',
				'Musa',
				'Rash al-Din',
				'Saladin',
				'Selim',
				'Sinjar',
				'Sulieman',
				'Tinaly',
				'Tolek',
				'Walid',
				'Yavuz',
				'Yildirim',
				'Attila',
				'Barbarosa',
				'Boyar',
				'Cassander',
				'Count Maresuke Nogi',
				'Count Tilly',
				'Cyrus',
				'Farnese',
				'Ivan IV',
				'Kutuzov',
				'MacArthur',
				'Modred',
				'Pappenheim',
				'Roxana',
				'Subutai',
				'Tammerlane',
				'Tepes',
				'Wallenstein',
				'William T. Sherman',
				'Triumphant',
				'Admiral Quinterra',
				'Conquerant',
				'Conquistador',
				'Schaumberg',
				'Theban Warrior',
				'Vindicator',
				'Citizen Admiral Tacosa',
				'Mohawk',
				'Saracen',
				'Veracity',
			],
			destroyers: [
				'Bastogne',
				'Arlon',
				'Breslau ',
				'Bruges',
				'Busko',
				'Charleroi',
				'Gorzow',
				'Jaroslaw',
				'Kessler',
				'Krakow',
				'Leuven',
				'Liege',
				'Lubin',
				'Malbork',
				'Poznan',
				'Suwalki',
				'Torun',
				'Toulon',
				'Tournai',
				'Desforge',
				'Alcazar ',
				'Auphan',
				'Baudin',
				'Bouvet',
				'Bruat',
				'Courbet',
				'Decres',
				'Duperre',
				'Hamelin',
				'Kersaint',
				'Linois',
				'Morillot',
				'Muselier',
				'Dainville',
				'Picquet',
				'Requin',
				'Roussin',
				'Toulouse',
				'Hecate',
				'Hector',
				'Racer',
			],
			frigates: [
				'Brilliance',
				'Glimmer',
				'Radiance',
				'Solar Flare',
				'Sunspot',
				'Conqueror',
				'Alexander',
				'Alvarado',
				'Babar',
				'Caesar',
				'Cortez',
				'Diaz',
				'Khan',
				'Hannibal',
				'Hideyoshi',
				'Huangdi',
				'Montezuma',
				'Napoleon',
				'Rameses',
				'Valdivia',
				'Vaubon',
				'Wari',
				'William',
				'Charles Wade Pope',
				'Marcus',
				'Beaudway',
				'Thomas Fisher',
				'Wiliam Harting',
				'Isaiah Kenter',
				'Joseph T. Marrone',
				'Kenneth Nastansky',
				'Esperanza de Souza',
				'Jonathan Talbott',
				'Bacchante',
				'Sabine',
				'Seahorse',
			],
		},
		manticore: {
			superdreadnoughts: [
				'Invictus',
				'Imperator',
				'Incomparable',
				'Intolerant',
				'Intransigent',
				'Second Yeltsin',
				'Medusa',
				'Barnett',
				'Belisarius',
				'Bellona',
				'Elizabeth I',
				"Ellen D'Orville",
				'Hancock',
				'King Roger III',
				'Marduk',
				'Regulus',
				'Revenge',
				'Troubadour',
				'Thunderer',
				"Trevor's Star",
				'Victorious',
				'Warrior',
				"Yeltsin's Star",
				'King William',
				'King David',
				'King Edward',
				'King George',
				'King Michael',
				'King Roger',
				'Prince Charles',
				'Prince Malachai',
				'Prince Royal',
				'Queen Adrianne',
				'Queen Caitrin',
				'Manticore',
				'Gryphon',
				'Sphinx',
				'Samothrace',
				'Hercules',
				'Majestic',
				'Magnificent',
				'Monarch',
				'Scepter',
				'Sovereign',
				'Bellerophon',
			],
			cruisers: [
				'Redoubtable',
				'Champion',
				'Defiant',
				'Formidable',
				'Intolerant',
				'Invincible',
				'Irresistible',
				'Onslaught',
				'Renown',
				'Resolution',
				'Revenge',
				'Homer',
				'Achilles',
				'Agamemnon',
				'Cassandra',
				'Hecate',
				'Hector',
				'Menelaus',
				'Penthesilea',
				'Priam',
				'Reliant',
				'Alcibiades',
				'Amphitrite',
				'Achilles',
				'Dauntless',
				'Hasley',
				'Indomitable',
				'Ishtar',
				'Lysander',
				'Nike',
				'Nelson',
				'Retaliation',
				'Royalist',
				'Truculent',
				'Venom',
				'Victory',
				'Viper',
				'Warspite',
				'Xerxes',
				'Agamemnon',
				'Ajax',
				'Hector',
				'Patrocles',
				'Priam',
				'Nike',
			],
			battleships: [
				'Prince Consort',
				'Prince Adrian',
				'Prince Justin',
				'Prince Michael',
				'Prince Roger',
				'Prince Stephen',
				'Prince Harold',
				'Princess Adrienne',
				'Princess Angelique',
				'Princess Aorianna',
				'Princess Caitrin',
				'Princess Joanna',
				'Princess Michelle',
				'Princess Samantha',
				'Princess Solange',
				'Crusader',
				'Alexius',
				'Eleanor',
				'Frederick',
				'Iberiana',
				'Lafroye',
				'Philip',
				'Richard',
				'Tancred',
				'Broadsword',
				'Claymore',
				'Cutlass',
				'Glaive',
				'Guisarm',
				'Halberd',
				'Pike',
				'Schiavone',
				'Alchemist',
				'Cantrip',
				'Circe',
				'Conjurer',
				'Druidess',
				'Enchanter',
				'Fearless ',
				'Magician',
				'Magus',
				'Merlin',
				'Necromancer',
				'Oracle',
				'Runebearer',
				'Santander',
				'Seeress',
				'Shaman',
				'Sorceror',
				'Star Knight',
				'Star Ranger',
				'Thaumaturge',
				'Valiant',
				'Warlock ',
				'Edward Saganami',
				'Jessica Epps',
				'Quentin Saint-James',
				'Hexapuma',
				'Gauntlet',
			],
			destroyers: [
				'Culverin',
				'Cannonball',
				'Carronade',
				'Chainshot',
				'Chanson',
				'Aria',
				'Balladeer',
				'Bard',
				'Canticle',
				'Choralist',
				'Glorioso',
				'Madrigal',
				'Minstrel',
				'Nightingale',
				'Plain Song',
				'Rondeau',
				'Serenade',
				'Troubadur',
				'Oracle',
				'Vixen',
				'Windsong',
				'Havoc',
				'Chaos',
				'Devastation',
				'Harrow',
				'Hutspur',
				'Turbulent',
				'Vengeance',
				'Wrack',
				'Falcon',
				'Condor',
				'Goshawk',
				'Harrier',
				'Hawk',
				'Hawkwing3',
				'Kestrel',
				'Kingfisher',
				'Kite',
				'Linnet',
				'Merlin',
				'Nighthawk',
				'Peregrine',
				'Shrike',
				'Arrowhead',
				'Roland',
			],
			frigates: [
				'Courageous',
				'Audacious',
				'Fearless',
				'Intransigent',
				'Intrepid',
				'Resolute',
				'Valiant',
				'Defiant',
				'Gallant',
				'Apollo',
				'Adonai',
				'Agni',
				'Amaterasu',
				'Anubis',
				'Aphrodite',
				'Arethusa',
				'Artemis',
				'Athena',
				'Chiron',
				'Hera',
				'Hermes',
				'Iris',
				'Leto',
				'Perseus',
				'Poseidon',
				'Thetis',
				'Xanthus',
				'Ares',
				'Illustrious',
				'Furious',
				'Magnificent',
				'Regal',
				'Avalon',
				'Aegis',
			],
		},
	},
	N = function () {
		const o = document.querySelector('.bothBoards-container'),
			r = e('div')(['compBoard-wrapper']);
		a(o)(r);
		const l = e('div')(['compBoard-container']);
		a(r)(l);
		for (let o = 0; o < 10; o += 1)
			for (let r = 0; r < 10; r += 1)
				i(t([['data-cellcomp', `${r},${o}`]]), a(l))(e('div')(['comp-gameCell']));
	},
	O = function (e) {
		var a;
		localStorage.getItem('compShipsCoords') ||
			localStorage.setItem('compShipsCoords', JSON.stringify([]));
		const l = JSON.parse(
			null !== (a = localStorage.getItem('compShipsCoords')) && void 0 !== a ? a : ''
		);
		Object.entries(e).forEach(([e, a]) => {
			localStorage.getItem(`comp${e[0].toUpperCase() + e.slice(1)}`) ||
				localStorage.setItem(`comp${e[0].toUpperCase() + e.slice(1)}`, JSON.stringify(a)),
				Array.isArray(a)
					? a.forEach((e) => {
							Object.entries(e).forEach(([e, a]) => {
								const n = document.querySelector(`[data-cellcomp="${a}"]`);
								i(
									t([['class', 'compShipPresent comp-gameCell']]),
									r('✴'),
									o([['border', '1px solid #00f000']])
								)(n),
									l.push(a);
							});
					  })
					: Object.entries(a).forEach(([e, a]) => {
							const n = document.querySelector(`[data-cellcomp="${a}"]`);
							i(
								t([['class', 'compShipPresent comp-gameCell']]),
								r('✴'),
								o([['border', '1px solid #00f000']])
							)(n),
								l.push(a);
					  });
		});
		document.querySelectorAll('.comp-gameCell').forEach((e) => {
			e.classList.contains('compShipPresent') ||
				i(t([['class', 'compShipNotPresent comp-gameCell']]), r('✴'))(e);
		}),
			localStorage.setItem('compShipsCoords', JSON.stringify(l));
	},
	$ = function (e) {
		const t = e,
			o = t[Math.floor(Math.random() * t.length)];
		O(o);
	},
	q = [
		{
			superdreadnought: {
				head: '1,0',
				body1: '2,0',
				body2: '3,0',
				body3: '4,0',
				tail: '5,0',
			},
			carrier: { head: '1,2', body1: '2,2', body2: '3,2', tail: '4,2' },
			battleship: { head: '1,4', body: '2,4', tail: '3,4' },
			destroyers: [
				{ head: '1,6', tail: '2,6' },
				{ head: '1,8', tail: '2,8' },
			],
			frigates: [{ body: '4,6' }, { body: '4,8' }],
		},
		{
			superdreadnought: {
				head: '1,2',
				body1: '1,3',
				body2: '1,4',
				body3: '1,5',
				tail: '1,6',
			},
			carrier: { head: '4,2', body1: '4,3', body2: '4,4', tail: '4,5' },
			battleship: { head: '6,1', body: '7,1', tail: '8,1' },
			destroyers: [
				{ head: '7,4', tail: '8,4' },
				{ head: '3,7', tail: '3,8' },
			],
			frigates: [{ body: '7,7' }, { body: '5,8' }],
		},
		{
			superdreadnought: {
				head: '1,1',
				body1: '1,2',
				body2: '1,3',
				body3: '1,4',
				tail: '1,5',
			},
			carrier: { head: '3,2', body1: '3,3', body2: '3,4', tail: '3,5' },
			battleship: { head: '1,7', body: '2,7', tail: '3,7' },
			destroyers: [
				{ head: '4,0', tail: '5,0' },
				{ head: '5,2', tail: '5,3' },
			],
			frigates: [{ body: '5,5' }, { body: '5,7' }],
		},
		{
			superdreadnought: {
				head: '1,8',
				body1: '2,8',
				body2: '3,8',
				body3: '4,8',
				tail: '5,8',
			},
			carrier: { head: '6,6', body1: '7,6', body2: '8,6', tail: '9,6' },
			battleship: { head: '6,4', body: '7,4', tail: '8,4' },
			destroyers: [
				{ head: '2,6', tail: '3,6' },
				{ head: '2,4', tail: '3,4' },
			],
			frigates: [{ body: '3,2' }, { body: '7,2' }],
		},
		{
			superdreadnought: {
				head: '1,1',
				body1: '1,2',
				body2: '1,3',
				body3: '1,4',
				tail: '1,5',
			},
			carrier: { head: '8,6', body1: '8,7', body2: '8,8', tail: '8,9' },
			battleship: { head: '6,1', body: '7,1', tail: '8,1' },
			destroyers: [
				{ head: '6,3', tail: '7,3' },
				{ head: '1,8', tail: '2,8' },
			],
			frigates: [{ body: '4,6' }, { body: '3,3' }],
		},
		{
			superdreadnought: {
				head: '0,0',
				body1: '1,0',
				body2: '2,0',
				body3: '3,0',
				tail: '4,0',
			},
			carrier: { head: '2,9', body1: '3,9', body2: '4,9', tail: '5,9' },
			battleship: { head: '0,5', body: '0,6', tail: '0,7' },
			destroyers: [
				{ head: '8,3', tail: '8,4' },
				{ head: '5,6', tail: '5,7' },
			],
			frigates: [{ body: '3,2' }, { body: '8,9' }],
		},
		{
			superdreadnought: {
				head: '0,7',
				body1: '1,7',
				body2: '2,7',
				body3: '3,7',
				tail: '4,7',
			},
			carrier: { head: '6,9', body1: '7,9', body2: '8,9', tail: '9,9' },
			battleship: { head: '7,2', body: '7,3', tail: '7,4' },
			destroyers: [
				{ head: '0,2', tail: '0,3' },
				{ head: '3,1', tail: '3,2' },
			],
			frigates: [{ body: '3,4' }, { body: '9,6' }],
		},
		{
			superdreadnought: {
				head: '8,1',
				body1: '8,2',
				body2: '8,3',
				body3: '8,4',
				tail: '8,5',
			},
			carrier: { head: '0,5', body1: '0,6', body2: '0,7', tail: '0,8' },
			battleship: { head: '6,6', body: '6,7', tail: '6,8' },
			destroyers: [
				{ head: '1,1', tail: '1,2' },
				{ head: '3,1', tail: '3,2' },
			],
			frigates: [{ body: '5,2' }, { body: '3,5' }],
		},
		{
			superdreadnought: {
				head: '0,8',
				body1: '1,8',
				body2: '2,8',
				body3: '3,8',
				tail: '4,8',
			},
			carrier: { head: '6,1', body1: '7,1', body2: '8,1', tail: '9,1' },
			battleship: { head: '0,3', body: '1,3', tail: '2,3' },
			destroyers: [
				{ head: '8,8', tail: '9,8' },
				{ head: '1,5', tail: '2,5' },
			],
			frigates: [{ body: '8,3' }, { body: '8,5' }],
		},
		{
			superdreadnought: {
				head: '1,1',
				body1: '2,1',
				body2: '3,1',
				body3: '4,1',
				tail: '5,1',
			},
			carrier: { head: '0,3', body1: '0,4', body2: '0,5', tail: '0,6' },
			battleship: { head: '8,3', body: '8,4', tail: '8,5' },
			destroyers: [
				{ head: '3,3', tail: '3,4' },
				{ head: '3,7', tail: '3,8' },
			],
			frigates: [{ body: '8,0' }, { body: '6,9' }],
		},
		{
			superdreadnought: {
				head: '0,8',
				body1: '1,8',
				body2: '2,8',
				body3: '3,8',
				tail: '4,8',
			},
			carrier: { head: '6,1', body1: '7,1', body2: '8,1', tail: '9,1' },
			battleship: { head: '0,0', body: '0,1', tail: '0,2' },
			destroyers: [
				{ head: '9,8', tail: '9,9' },
				{ head: '7,6', tail: '7,7' },
			],
			frigates: [{ body: '9,4' }, { body: '5,4' }],
		},
		{
			superdreadnought: {
				head: '9,0',
				body1: '9,1',
				body2: '9,2',
				body3: '9,3',
				tail: '9,4',
			},
			carrier: { head: '3,3', body1: '3,4', body2: '3,5', tail: '3,6' },
			battleship: { head: '0,7', body: '0,8', tail: '0,9' },
			destroyers: [
				{ head: '0,0', tail: '0,1' },
				{ head: '9,8', tail: '9,9' },
			],
			frigates: [{ body: '5,4' }, { body: '3,9' }],
		},
		{
			superdreadnought: {
				head: '2,3',
				body1: '3,3',
				body2: '4,3',
				body3: '5,3',
				tail: '6,3',
			},
			carrier: { head: '0,3', body1: '0,4', body2: '0,5', tail: '0,6' },
			battleship: { head: '8,0', body: '8,1', tail: '8,2' },
			destroyers: [
				{ head: '2,0', tail: '2,1' },
				{ head: '2,6', tail: '2,7' },
			],
			frigates: [{ body: '7,6' }, { body: '7,8' }],
		},
		{
			superdreadnought: {
				head: '2,9',
				body1: '3,9',
				body2: '4,9',
				body3: '5,9',
				tail: '6,9',
			},
			carrier: { head: '1,2', body1: '1,3', body2: '1,4', tail: '1,5' },
			battleship: { head: '8,2', body: '8,3', tail: '8,4' },
			destroyers: [
				{ head: '9,8', tail: '9,9' },
				{ head: '0,7', tail: '0,8' },
			],
			frigates: [{ body: '5,3' }, { body: '3,5' }],
		},
		{
			superdreadnought: {
				head: '2,5',
				body1: '2,6',
				body2: '2,7',
				body3: '2,8',
				tail: '2,9',
			},
			carrier: { head: '1,2', body1: '2,2', body2: '3,2', tail: '4,2' },
			battleship: { head: '7,2', body: '7,3', tail: '7,4' },
			destroyers: [
				{ head: '5,6', tail: '6,6' },
				{ head: '5,8', tail: '6,8' },
			],
			frigates: [{ body: '0,0' }, { body: '9,9' }],
		},
		{
			superdreadnought: {
				head: '4,3',
				body1: '4,4',
				body2: '4,5',
				body3: '4,6',
				tail: '4,7',
			},
			carrier: { head: '3,9', body1: '4,9', body2: '5,9', tail: '6,9' },
			battleship: { head: '3,0', body: '4,0', tail: '5,0' },
			destroyers: [
				{ head: '0,1', tail: '0,2' },
				{ head: '0,8', tail: '0,9' },
			],
			frigates: [{ body: '7,3' }, { body: '7,6' }],
		},
		{
			superdreadnought: {
				head: '9,0',
				body1: '9,1',
				body2: '9,2',
				body3: '9,3',
				tail: '9,4',
			},
			carrier: { head: '5,2', body1: '5,3', body2: '5,4', tail: '5,5' },
			battleship: { head: '7,1', body: '7,2', tail: '7,3' },
			destroyers: [
				{ head: '9,8', tail: '9,9' },
				{ head: '7,7', tail: '7,8' },
			],
			frigates: [{ body: '1,1' }, { body: '1,3' }],
		},
		{
			superdreadnought: {
				head: '2,6',
				body1: '3,6',
				body2: '4,6',
				body3: '5,6',
				tail: '6,6',
			},
			carrier: { head: '2,1', body1: '2,2', body2: '2,3', tail: '2,4' },
			battleship: { head: '8,6', body: '8,7', tail: '8,8' },
			destroyers: [
				{ head: '5,2', tail: '5,3' },
				{ head: '7,1', tail: '7,2' },
			],
			frigates: [{ body: '0,9' }, { body: '5,8' }],
		},
		{
			superdreadnought: {
				head: '6,3',
				body1: '6,4',
				body2: '6,5',
				body3: '6,6',
				tail: '6,7',
			},
			carrier: { head: '1,5', body1: '2,5', body2: '3,5', tail: '4,5' },
			battleship: { head: '4,1', body: '4,2', tail: '4,3' },
			destroyers: [
				{ head: '1,1', tail: '1,2' },
				{ head: '8,1', tail: '8,2' },
			],
			frigates: [{ body: '1,8' }, { body: '5,8' }],
		},
		{
			superdreadnought: {
				head: '2,3',
				body1: '3,3',
				body2: '4,3',
				body3: '5,3',
				tail: '6,3',
			},
			carrier: { head: '0,3', body1: '0,4', body2: '0,5', tail: '0,6' },
			battleship: { head: '8,3', body: '8,4', tail: '8,5' },
			destroyers: [
				{ head: '9,7', tail: '9,8' },
				{ head: '8,8', tail: '7,8' },
			],
			frigates: [{ body: '1,1' }, { body: '1,3' }],
		},
		{
			superdreadnought: {
				head: '2,9',
				body1: '3,9',
				body2: '4,9',
				body3: '5,9',
				tail: '6,9',
			},
			carrier: { head: '0,0', body1: '0,1', body2: '0,2', tail: '0,3' },
			battleship: { head: '8,9', body: '8,8', tail: '8,7' },
			destroyers: [
				{ head: '4,4', tail: '4,5' },
				{ head: '7,4', tail: '7,5' },
			],
			frigates: [{ body: '1,8' }, { body: '5,8' }],
		},
		{
			superdreadnought: {
				head: '2,0',
				body1: '3,0',
				body2: '4,0',
				body3: '5,0',
				tail: '6,0',
			},
			carrier: { head: '0,9', body1: '0,8', body2: '0,7', tail: '0,6' },
			battleship: { head: '8,0', body: '8,1', tail: '8,2' },
			destroyers: [
				{ head: '9,2', tail: '9,3' },
				{ head: '8,3', tail: '7,3' },
			],
			frigates: [{ body: '1,1' }, { body: '1,3' }],
		},
		{
			superdreadnought: {
				head: '2,6',
				body1: '3,6',
				body2: '4,6',
				body3: '5,6',
				tail: '6,6',
			},
			carrier: { head: '0,3', body1: '0,4', body2: '0,5', tail: '0,6' },
			battleship: { head: '8,6', body: '8,7', tail: '8,8' },
			destroyers: [
				{ head: '9,7', tail: '9,8' },
				{ head: '8,8', tail: '7,8' },
			],
			frigates: [{ body: '1,1' }, { body: '1,3' }],
		},
	],
	I = function (t) {
		const o = document.querySelector('.infoScreen-wrapper');
		null == o || o.remove();
		const r = document.querySelector('.shipBttns-wrapper');
		var n;
		null == r || r.remove(),
			this.remove(),
			N(),
			$(q),
			(n = x),
			localStorage.getItem('playerShipNames') ||
				localStorage.setItem('playerShipNames', JSON.stringify([])),
			Object.entries(n).forEach(([e, t]) => {
				if ('haven' === e) {
					const e = new Map();
					Object.entries(t).forEach(([t, o]) => {
						if ('destroyers' === t || 'frigates' === t) {
							const r = [
								o[Math.floor(Math.random() * o.length)],
								o[Math.floor(Math.random() * o.length)],
							];
							e.set(t, r);
						} else e.set(t.slice(0, -1), o[Math.floor(Math.random() * o.length)]);
					}),
						localStorage.setItem('havenShipNames', JSON.stringify(Object.fromEntries(e)));
				} else if ('manticore' === e) {
					const e = new Map();
					Object.entries(t).forEach(([t, o]) => {
						if ('destroyers' === t || 'frigates' === t) {
							const r = [
								o[Math.floor(Math.random() * o.length)],
								o[Math.floor(Math.random() * o.length)],
							];
							e.set(t, r);
						} else e.set(t.slice(0, -1), o[Math.floor(Math.random() * o.length)]);
					}),
						localStorage.setItem(
							'manticoreShipNames',
							JSON.stringify(Object.fromEntries(e))
						);
				}
			}),
			localStorage.getItem('isGameRunning') ||
				localStorage.setItem('isGameRunning', JSON.stringify(!0));
		document.querySelectorAll('.compShipPresent').forEach((e) => l('click')(g)(e));
		document.querySelectorAll('.compShipNotPresent').forEach((e) => l('click')(C)(e));
		const s = document.querySelector('.main');
		i(a(s))(e('div')(['infoScreen-wrapper']));
	},
	P = function () {
		const o = document.querySelector('.shipsBttn-container');
		null == o || o.remove();
		const n = document.querySelector('.bttn-axisSelector');
		null == n || n.remove();
		const s = document.querySelector('.shipBttns-wrapper');
		i(
			r('Engage!'),
			t([
				['type', 'button'],
				['value', 'start'],
			]),
			l('click')(I),
			a(s)
		)(e('button')(['bttn', 'bttn-startGame']));
	},
	A = function () {
		if (localStorage.getItem('playerShipsCoords')) {
			var e;
			18 ===
				JSON.parse(
					null !== (e = localStorage.getItem('playerShipsCoords')) && void 0 !== e
						? e
						: ''
				).length &&
				(document.querySelectorAll('.player-gameCell').forEach((e) => {
					e.classList.contains('playerShipPresent') ||
						i(r('✴'), t([['class', 'player-gameCell playerShipNotPresent']]))(e);
				}),
				P());
		}
	},
	M = function (e, t, o, r) {
		var a;
		localStorage.getItem('playerShipsCoords') ||
			localStorage.setItem('playerShipsCoords', JSON.stringify([]));
		const l = JSON.parse(
			null !== (a = localStorage.getItem('playerShipsCoords')) && void 0 !== a ? a : ''
		);
		if ('Axis-X' === t) {
			for (let t = 0; t < e; t += 1)
				if (l.includes(`${Number(o) + t},${r}`))
					return (
						alert(
							'A ship is already present at these coordinates. Please choose another area.'
						),
						!0
					);
		} else if ('Axis-Y' === t)
			for (let t = 0; t < e; t += 1)
				if (l.includes(`${o},${Number(r) + t}`))
					return (
						alert(
							'A ship is already present at these coordinates. Please choose another area.'
						),
						!0
					);
	},
	w = function (e, t) {
		const o = e[0].toUpperCase() + e.slice(1),
			r = t[0].toUpperCase() + t.slice(1);
		if ('single' === t)
			return (
				localStorage.getItem(`is${r}${o}`) ||
					localStorage.setItem(`is${r}${o}`, JSON.stringify(!0)),
				!0
			);
		if ('double' === t) {
			var a;
			const t = JSON.parse(
				null !== (a = localStorage.getItem(`${e}`)) && void 0 !== a ? a : ''
			);
			if (t.length < 2)
				return (
					localStorage.getItem(`is${r}${o}`) ||
						localStorage.setItem(`is${r}${o}`, JSON.stringify(!0)),
					!0
				);
			if (2 === t.length)
				return localStorage.setItem(`is${r}${o}`, JSON.stringify(!1)), !1;
		}
	},
	k = function (e) {
		var t;
		const a = document.querySelector('.bttn-axisSelector'),
			l = null == a ? void 0 : a.textContent,
			n = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var s;
		const c = null !== (s = null == n ? void 0 : n[0]) && void 0 !== s ? s : '';
		var d;
		const u = null !== (d = null == n ? void 0 : n[1]) && void 0 !== d ? d : '';
		if ('Axis-X' === l)
			for (let e = 0; e < 3; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(c) + e},${u}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('B'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
		else if ('Axis-Y' === l)
			for (let e = 0; e < 3; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${c},${Number(u) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('B'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
	},
	J = function (e) {
		var t;
		const r = document.querySelector('.bttn-axisSelector'),
			a = null == r ? void 0 : r.textContent,
			l = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var n;
		const s = null !== (n = null == l ? void 0 : l[0]) && void 0 !== n ? n : '';
		var c;
		const d = null !== (c = null == l ? void 0 : l[1]) && void 0 !== c ? c : '';
		if ('Axis-X' === a)
			for (let e = 0; e < 3; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(s) + e},${d}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
		else if ('Axis-Y' === a)
			for (let e = 0; e < 3; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${s},${Number(d) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
	},
	H = function (e) {
		var t;
		const a = document.querySelector('.bttn-axisSelector'),
			l = null == a ? void 0 : a.textContent,
			n = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var s;
		const c = null !== (s = null == n ? void 0 : n[0]) && void 0 !== s ? s : '';
		var d;
		const u = null !== (d = null == n ? void 0 : n[1]) && void 0 !== d ? d : '';
		if ('Axis-X' === l)
			for (let e = 0; e < 4; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(c) + e},${u}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('C'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
		else if ('Axis-Y' === l)
			for (let e = 0; e < 4; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${c},${Number(u) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('C'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
	},
	E = function (e) {
		var t;
		const r = document.querySelector('.bttn-axisSelector'),
			a = null == r ? void 0 : r.textContent,
			l = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var n;
		const s = null !== (n = null == l ? void 0 : l[0]) && void 0 !== n ? n : '';
		var c;
		const d = null !== (c = null == l ? void 0 : l[1]) && void 0 !== c ? c : '';
		if ('Axis-X' === a)
			for (let e = 0; e < 4; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(s) + e},${d}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
		else if ('Axis-Y' === a)
			for (let e = 0; e < 4; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${s},${Number(d) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
	},
	B = function (e) {
		var t;
		const a = document.querySelector('.bttn-axisSelector'),
			l = null == a ? void 0 : a.textContent,
			n = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var s;
		const c = null !== (s = null == n ? void 0 : n[0]) && void 0 !== s ? s : '';
		var d;
		const u = null !== (d = null == n ? void 0 : n[1]) && void 0 !== d ? d : '';
		if ('Axis-X' === l)
			for (let e = 0; e < 2; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(c) + e},${u}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('D'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
		else if ('Axis-Y' === l)
			for (let e = 0; e < 2; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${c},${Number(u) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('D'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
	},
	T = function (e) {
		var t;
		const r = document.querySelector('.bttn-axisSelector'),
			a = null == r ? void 0 : r.textContent,
			l = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var n;
		const s = null !== (n = null == l ? void 0 : l[0]) && void 0 !== n ? n : '';
		var c;
		const d = null !== (c = null == l ? void 0 : l[1]) && void 0 !== c ? c : '';
		if ('Axis-X' === a)
			for (let e = 0; e < 2; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(s) + e},${d}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
		else if ('Axis-Y' === a)
			for (let e = 0; e < 2; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${s},${Number(d) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
	},
	L = function (e) {
		var t;
		const a =
			null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var l;
		const n = null !== (l = null == a ? void 0 : a[0]) && void 0 !== l ? l : '';
		var s;
		const c = null !== (s = null == a ? void 0 : a[1]) && void 0 !== s ? s : '',
			d = document.querySelector(`[data-cellplayer="${n},${c}"]`);
		(null == d ? void 0 : d.classList.contains('playerShipPresent')) ||
			i(
				r('F'),
				o([
					['color', '#f0a400'],
					['cursor', 'crosshair'],
				])
			)(d);
	},
	R = function (e) {
		var t;
		const r =
			null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var a;
		const l = null !== (a = null == r ? void 0 : r[0]) && void 0 !== a ? a : '';
		var n;
		const s = null !== (n = null == r ? void 0 : r[1]) && void 0 !== n ? n : '',
			c = document.querySelector(`[data-cellplayer="${l},${s}"]`);
		(null == c ? void 0 : c.classList.contains('playerShipPresent')) ||
			(c && (c.textContent = ''),
			i(
				o([
					['color', 'gainsboro'],
					['cursor', 'default'],
				])
			)(c));
	},
	D = function (e) {
		var t;
		const a = document.querySelector('.bttn-axisSelector'),
			l = null == a ? void 0 : a.textContent,
			n = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var s;
		const c = null !== (s = null == n ? void 0 : n[0]) && void 0 !== s ? s : '';
		var d;
		const u = null !== (d = null == n ? void 0 : n[1]) && void 0 !== d ? d : '';
		if ('Axis-X' === l)
			for (let e = 0; e < 5; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(c) + e},${u}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('S'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
		else if ('Axis-Y' === l)
			for (let e = 0; e < 5; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${c},${Number(u) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					i(
						r('S'),
						o([
							['color', '#f0a400'],
							['cursor', 'crosshair'],
						])
					)(t);
			}
	},
	W = function (e) {
		var t;
		const r = document.querySelector('.bttn-axisSelector'),
			a = null == r ? void 0 : r.textContent,
			l = null === (t = this.dataset.cellplayer) || void 0 === t ? void 0 : t.split(',');
		var n;
		const s = null !== (n = null == l ? void 0 : l[0]) && void 0 !== n ? n : '';
		var c;
		const d = null !== (c = null == l ? void 0 : l[1]) && void 0 !== c ? c : '';
		if ('Axis-X' === a)
			for (let e = 0; e < 5; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${Number(s) + e},${d}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
		else if ('Axis-Y' === a)
			for (let e = 0; e < 5; e += 1) {
				const t = document.querySelector(`[data-cellplayer="${s},${Number(d) + e}"]`);
				(null == t ? void 0 : t.classList.contains('playerShipPresent')) ||
					(t && (t.textContent = ''),
					i(
						o([
							['color', 'gainsboro'],
							['cursor', 'default'],
						])
					)(t));
			}
	},
	F = function (e) {
		var a;
		const s = document.querySelectorAll('.player-gameCell'),
			c = document.querySelector('.bttn-axisSelector'),
			d = null == c ? void 0 : c.textContent,
			h = null === (a = this.dataset.cellplayer) || void 0 === a ? void 0 : a.split(',');
		var p;
		const y = null !== (p = null == h ? void 0 : h[0]) && void 0 !== p ? p : '';
		var m;
		const b = null !== (m = null == h ? void 0 : h[1]) && void 0 !== m ? m : '';
		var g;
		localStorage.getItem('superdreadnought') ||
			localStorage.setItem('superdreadnought', JSON.stringify(''));
		let S = JSON.parse(
			null !== (g = localStorage.getItem('superdreadnought')) && void 0 !== g ? g : ''
		);
		const f = [],
			v = 'superdreadnought',
			C = 'single';
		if ('Axis-X' === d && w(v, C)) {
			if (Number(y) > 5)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(5, d, y, b)) return null;
			for (let e = 0; e < 5; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${Number(y) + e},${b}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('S')
					)(a),
					f.push(`${Number(y) + e},${b}`);
			}
			w(v, C) && (S = { head: f[0], body1: f[1], body2: f[2], body3: f[3], tail: f[4] }),
				localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(!1));
		} else if ('Axis-Y' === d && w(v, 'single')) {
			if (Number(b) > 5)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(5, d, y, b)) return null;
			for (let e = 0; e < 5; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${y},${Number(b) + e}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('S')
					)(a),
					f.push(`${y},${Number(b) + e}`);
			}
			w(v, C) && (S = { head: f[0], body1: f[1], body2: f[2], body3: f[3], tail: f[4] }),
				localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(!1));
		}
		if (
			(localStorage.setItem('superdreadnought', JSON.stringify(S)), u(f), !0 === w(v, C))
		) {
			const e = document.querySelector('.bttn-superdreadnought');
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				])
			)(e);
			const t = document.querySelector('.bttn-carrier');
			t &&
				!0 !== t.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(V)
				)(t);
			const r = document.querySelector('.bttn-battleship');
			r &&
				!0 !== r.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(U)
				)(r);
			const a = document.querySelector('.bttn-destroyer');
			a &&
				!0 !== a.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(X)
				)(a);
			const c = document.querySelector('.bttn-frigate');
			c &&
				!0 !== c.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(Y)
				)(c),
				s.forEach((e) => {
					i(n('click')(F), n('mouseenter')(D), n('mouseleave')(W))(e);
				});
		}
		A();
	},
	G = function (e) {
		const t = document.querySelectorAll('.player-gameCell');
		(this.disabled = !0),
			i(
				o([
					['border', '1px solid #f0a400'],
					['color', '#f0a400'],
				])
			)(this);
		const r = document.querySelector('.bttn-carrier');
		r &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(V)
			)(r);
		const a = document.querySelector('.bttn-battleship');
		a &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(U)
			)(a);
		const s = document.querySelector('.bttn-destroyer');
		s &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(X)
			)(s);
		const c = document.querySelector('.bttn-frigate');
		c &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(Y)
			)(c),
			t.forEach((e) => i(l('click')(F), l('mouseenter')(D), l('mouseleave')(W))(e));
	},
	K = function (e) {
		var a;
		const s = document.querySelectorAll('.player-gameCell'),
			c = document.querySelector('.bttn-axisSelector');
		var d;
		const h = null !== (d = null == c ? void 0 : c.textContent) && void 0 !== d ? d : '',
			p = null === (a = this.dataset.cellplayer) || void 0 === a ? void 0 : a.split(',');
		var y;
		const m = null !== (y = null == p ? void 0 : p[0]) && void 0 !== y ? y : '';
		var b;
		const g = null !== (b = null == p ? void 0 : p[1]) && void 0 !== b ? b : '';
		var S;
		localStorage.getItem('frigate') ||
			localStorage.setItem('frigate', JSON.stringify([]));
		const f = JSON.parse(
				null !== (S = localStorage.getItem('frigate')) && void 0 !== S ? S : ''
			),
			v = [],
			C = 'frigate',
			x = 'double';
		if (w(C, x)) {
			if (M(1, h, m, g)) return null;
			const e = document.querySelector(`[data-cellplayer="${m},${g}"]`);
			e && (e.textContent = ''),
				i(
					t([['class', 'playerShipPresent player-gameCell']]),
					o([
						['color', '#f0a400'],
						['cursor', 'default'],
					]),
					r('F')
				)(e),
				v.push(`${m},${g}`),
				w(C, x) && f.push({ body: v[0] });
		} else if (!1 === w(C, x)) return null;
		if ((localStorage.setItem('frigate', JSON.stringify(f)), u(v), !1 === w(C, x))) {
			const e = document.querySelector('.bttn-frigate');
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
				])
			)(e);
			const t = document.querySelector('.bttn-superdreadnought');
			t &&
				!0 !== t.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(G)
				)(t);
			const r = document.querySelector('.bttn-carrier');
			r &&
				!0 !== r.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(V)
				)(r);
			const a = document.querySelector('.bttn-battleship');
			a &&
				!0 !== a.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(U)
				)(a);
			const c = document.querySelector('.bttn-destroyer');
			c &&
				!0 !== c.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(X)
				)(c),
				s.forEach((e) => {
					i(n('click')(K), n('mouseenter')(L), n('mouseleave')(R))(e);
				});
		}
		A();
	},
	Y = function (e) {
		const t = document.querySelectorAll('.player-gameCell');
		(this.disabled = !0),
			i(
				o([
					['border', '1px solid #f0a400'],
					['color', '#f0a400'],
				])
			)(this);
		const r = document.querySelector('.bttn-superdreadnought');
		r &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(G)
			)(r);
		const a = document.querySelector('.bttn-carrier');
		a &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(V)
			)(a);
		const s = document.querySelector('.bttn-battleship');
		s &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(U)
			)(s);
		const c = document.querySelector('.bttn-destroyer');
		c &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(X)
			)(c),
			t.forEach((e) => i(l('click')(K), l('mouseenter')(L), l('mouseleave')(R))(e));
	},
	j = function (e) {
		var a;
		const s = document.querySelectorAll('.player-gameCell'),
			c = document.querySelector('.bttn-axisSelector'),
			d = null == c ? void 0 : c.textContent,
			h = null === (a = this.dataset.cellplayer) || void 0 === a ? void 0 : a.split(',');
		var p;
		const y = null !== (p = null == h ? void 0 : h[0]) && void 0 !== p ? p : '';
		var m;
		const b = null !== (m = null == h ? void 0 : h[1]) && void 0 !== m ? m : '';
		var g;
		localStorage.getItem('destroyer') ||
			localStorage.setItem('destroyer', JSON.stringify([]));
		const S = JSON.parse(
				null !== (g = localStorage.getItem('destroyer')) && void 0 !== g ? g : ''
			),
			f = [],
			v = 'destroyer',
			C = 'double';
		if ('Axis-X' === d && w(v, C)) {
			if (Number(y) > 8)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(2, d, y, b)) return null;
			for (let e = 0; e < 2; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${Number(y) + e},${b}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('D')
					)(a),
					f.push(`${Number(y) + e},${b}`);
			}
			w(v, C) && S.push({ head: f[0], tail: f[1] });
		} else if ('Axis-Y' === d && w(v, C)) {
			if (Number(b) > 8)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(2, d, y, b)) return null;
			for (let e = 0; e < 2; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${y},${Number(b) + e}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('D')
					)(a),
					f.push(`${y},${Number(b) + e}`);
			}
			w(v, C) && S.push({ head: f[0], tail: f[1] });
		} else if (!1 === w(v, C)) return null;
		if ((localStorage.setItem('destroyer', JSON.stringify(S)), u(f), !1 === w(v, C))) {
			const e = document.querySelector('.bttn-destroyer');
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				])
			)(e);
			const t = document.querySelector('.bttn-superdreadnought');
			t &&
				!0 !== t.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(G)
				)(t);
			const r = document.querySelector('.bttn-carrier');
			r &&
				!0 !== r.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(V)
				)(r);
			const a = document.querySelector('.bttn-battleship');
			a &&
				!0 !== a.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(U)
				)(a);
			const c = document.querySelector('.bttn-frigate');
			c &&
				!0 !== c.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(Y)
				)(c),
				s.forEach((e) => {
					i(n('click')(j), n('mouseenter')(B), n('mouseleave')(T))(e);
				});
		}
		A();
	},
	X = function (e) {
		document
			.querySelectorAll('.player-gameCell')
			.forEach((e) => i(l('click')(j), l('mouseenter')(B), l('mouseleave')(T))(e)),
			(this.disabled = !0),
			i(
				o([
					['border', '1px solid #f0a400'],
					['color', '#f0a400'],
				])
			)(this);
		const t = document.querySelector('.bttn-superdreadnought');
		t &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(G)
			)(t);
		const r = document.querySelector('.bttn-carrier');
		r &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(V)
			)(r);
		const a = document.querySelector('.bttn-battleship');
		a &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(U)
			)(a);
		const s = document.querySelector('.bttn-frigate');
		s &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(Y)
			)(s);
	},
	z = function (e) {
		var a;
		const s = document.querySelectorAll('.player-gameCell'),
			c = document.querySelector('.bttn-axisSelector'),
			d = null == c ? void 0 : c.textContent,
			h = null === (a = this.dataset.cellplayer) || void 0 === a ? void 0 : a.split(',');
		var p;
		const y = null !== (p = null == h ? void 0 : h[0]) && void 0 !== p ? p : '';
		var m;
		const b = null !== (m = null == h ? void 0 : h[1]) && void 0 !== m ? m : '';
		var g;
		localStorage.getItem('carrier') ||
			localStorage.setItem('carrier', JSON.stringify([]));
		let S = JSON.parse(
			null !== (g = localStorage.getItem('carrier')) && void 0 !== g ? g : ''
		);
		const f = [],
			v = 'carrier',
			C = 'single';
		if ('Axis-X' === d && w(v, C)) {
			if (Number(y) > 6)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(4, d, y, b)) return null;
			for (let e = 0; e < 4; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${Number(y) + e},${b}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('C')
					)(a),
					f.push(`${Number(y) + e},${b}`);
			}
			w(v, C) && (S = { head: f[0], body1: f[1], body2: f[2], tail: f[3] }),
				localStorage.setItem('isSingleCarrier', JSON.stringify(!1));
		} else if ('Axis-Y' === d && w(v, C)) {
			if (Number(b) > 6)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(4, d, y, b)) return null;
			for (let e = 0; e < 4; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${y},${Number(b) + e}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('C')
					)(a),
					f.push(`${y},${Number(b) + e}`);
			}
			w(v, C) && (S = { head: f[0], body1: f[1], body2: f[2], tail: f[3] }),
				localStorage.setItem('isSingleCarrier', JSON.stringify(!1));
		}
		if ((localStorage.setItem('carrier', JSON.stringify(S)), u(f), !0 === w(v, C))) {
			const e = document.querySelector('.bttn-carrier');
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				])
			)(e);
			const t = document.querySelector('.bttn-superdreadnought');
			t &&
				!0 !== t.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(G)
				)(t);
			const r = document.querySelector('.bttn-battleship');
			r &&
				!0 !== r.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(U)
				)(r);
			const a = document.querySelector('.bttn-destroyer');
			a &&
				!0 !== a.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(X)
				)(a);
			const c = document.querySelector('.bttn-frigate');
			c &&
				!0 !== c.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(Y)
				)(c),
				s.forEach((e) => {
					i(n('click')(z), n('mouseenter')(H), n('mouseleave')(E))(e);
				});
		}
		A();
	},
	V = function (e) {
		const t = document.querySelectorAll('.player-gameCell');
		(this.disabled = !0),
			i(
				o([
					['border', '1px solid #f0a400'],
					['color', '#f0a400'],
				])
			)(this);
		const r = document.querySelector('.bttn-superdreadnought');
		r &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(G)
			)(r);
		const a = document.querySelector('.bttn-battleship');
		a &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(U)
			)(a);
		const s = document.querySelector('.bttn-destroyer');
		s &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(X)
			)(s);
		const c = document.querySelector('.bttn-frigate');
		c &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(Y)
			)(c),
			t.forEach((e) => i(l('click')(z), l('mouseenter')(H), l('mouseleave')(E))(e));
	},
	Q = function (e) {
		var a;
		const s = document.querySelectorAll('.player-gameCell'),
			c = document.querySelector('.bttn-axisSelector'),
			d = null == c ? void 0 : c.textContent,
			h = null === (a = this.dataset.cellplayer) || void 0 === a ? void 0 : a.split(',');
		var p;
		const y = null !== (p = null == h ? void 0 : h[0]) && void 0 !== p ? p : '';
		var m;
		const b = null !== (m = null == h ? void 0 : h[1]) && void 0 !== m ? m : '';
		var g;
		localStorage.getItem('battleship') ||
			localStorage.setItem('battleship', JSON.stringify(''));
		let S = JSON.parse(
			null !== (g = localStorage.getItem('battleship')) && void 0 !== g ? g : ''
		);
		const f = [],
			v = 'battleship',
			C = 'single';
		if ('Axis-X' === d && w(v, C)) {
			if (Number(y) > 7)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(3, d, y, b)) return null;
			for (let e = 0; e < 3; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${Number(y) + e},${b}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('B')
					)(a),
					f.push(`${Number(y) + e},${b}`);
			}
			w(v, 'single') && (S = { head: f[0], body: f[1], tail: f[2] }),
				localStorage.setItem('isSingleBattleship', JSON.stringify(!1));
		} else if ('Axis-Y' === d && w(v, C)) {
			if (Number(b) > 7)
				return alert('Please stay within boundaries of the sector (｡•́︿•̀｡)'), null;
			if (M(3, d, y, b)) return null;
			for (let e = 0; e < 3; e += 1) {
				const a = document.querySelector(`[data-cellplayer="${y},${Number(b) + e}"]`);
				a && (a.textContent = ''),
					i(
						t([['class', 'playerShipPresent player-gameCell']]),
						o([
							['color', '#f0a400'],
							['cursor', 'default'],
						]),
						r('B')
					)(a),
					f.push(`${y},${Number(b) + e}`);
			}
			w(v, 'single') && (S = { head: f[0], body: f[1], tail: f[2] }),
				localStorage.setItem('isSingleBattleship', JSON.stringify(!1));
		}
		if ((localStorage.setItem('battleship', JSON.stringify(S)), u(f), !0 === w(v, C))) {
			const e = document.querySelector('.bttn-battleship');
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				])
			)(e);
			const t = document.querySelector('.bttn-superdreadnought');
			t &&
				!0 !== t.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(G)
				)(t);
			const r = document.querySelector('.bttn-carrier');
			r &&
				!0 !== r.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(V)
				)(r);
			const a = document.querySelector('.bttn-destroyer');
			a &&
				!0 !== a.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(X)
				)(a);
			const c = document.querySelector('.bttn-frigate');
			c &&
				!0 !== c.disabled &&
				i(
					o([
						['border', '1px solid #00f000'],
						['color', '#00f000'],
						['cursor', 'pointer'],
					]),
					l('click')(Y)
				)(c),
				s.forEach((e) => {
					i(n('click')(Q), n('mouseenter')(k), n('mouseleave')(J))(e);
				});
		}
		A();
	},
	U = function (e) {
		const t = document.querySelectorAll('.player-gameCell');
		(this.disabled = !0),
			i(
				o([
					['border', '1px solid #f0a400'],
					['color', '#f0a400'],
				])
			)(this);
		const r = document.querySelector('.bttn-superdreadnought');
		r &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(G)
			)(r);
		const a = document.querySelector('.bttn-carrier');
		a &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(V)
			)(a);
		const s = document.querySelector('.bttn-destroyer');
		s &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(X)
			)(s);
		const c = document.querySelector('.bttn-frigate');
		c &&
			i(
				o([
					['border', '1px solid gainsboro'],
					['color', 'gainsboro'],
					['cursor', 'not-allowed'],
				]),
				n('click')(Y)
			)(c),
			t.forEach((e) => i(l('click')(Q), l('mouseenter')(k), l('mouseleave')(J))(e));
	},
	Z = function () {
		const o = document.querySelector('.main'),
			n = e('div')(['shipBttns-wrapper']);
		a(o)(n);
		const s = e('div')(['shipsBttn-container']);
		a(n)(s),
			i(
				r('Superdreadnought'),
				l('click')(G),
				t([
					['type', 'button'],
					['value', 'superdreadnought'],
				]),
				a(s)
			)(e('button')(['bttn-superdreadnought'])),
			i(
				r('Carrier'),
				l('click')(V),
				t([
					['type', 'button'],
					['value', 'carrier'],
				]),
				a(s)
			)(e('button')(['bttn-carrier'])),
			i(
				r('Battleship'),
				l('click')(U),
				t([
					['type', 'button'],
					['value', 'battleship'],
				]),
				a(s)
			)(e('button')(['bttn-battleship'])),
			i(
				r('Destroyer'),
				l('click')(X),
				t([
					['type', 'button'],
					['value', 'destroyer'],
				]),
				a(s)
			)(e('button')(['bttn-destroyer'])),
			i(
				r('Frigate'),
				l('click')(Y),
				t([
					['type', 'button'],
					['value', 'frigate'],
				]),
				a(s)
			)(e('button')(['bttn-frigate'])),
			i(
				l('click')(d),
				r('Axis-X'),
				t([
					['type', 'button'],
					['value', 'axis-x'],
				]),
				a(n)
			)(e('button')(['bttn', 'bttn-axisSelector']));
	},
	_ = function (e) {
		const t = e,
			o = document.querySelector('.greetings-container');
		null == o || o.remove();
		const r = document.querySelector('.form-container');
		null == r || r.remove(), c(t), Z(), s();
	},
	ee = function (e) {
		var t;
		e.preventDefault();
		var o;
		const r =
			null !==
				(o =
					null === (t = new FormData(this).get('form-name-input')) || void 0 === t
						? void 0
						: t.toString()) && void 0 !== o
				? o
				: '';
		localStorage.getItem('playerName') ||
			localStorage.setItem('playerName', JSON.stringify(r)),
			_(r);
	},
	te = function () {
		const e = document.querySelector('#form-name');
		null == e || e.addEventListener('submit', ee);
	};
document.addEventListener('DOMContentLoaded', function () {
	te(), localStorage.clear();
});
//# sourceMappingURL=index.c0a9934b.js.map
