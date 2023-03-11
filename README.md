# Battleship

Battleship project as part of The Odin Project curriculum

[Click here to view project live](https://athma-vasi.github.io/Battleship/)

## Recent new update

- **Tactical overview**: The player and computer ships are displayed next to the board and are updated accordingly.
- **Improved firing solution**: Previous implementation generated a random firing coordinate, the newer algorithm intelligently hunts and hones in on the ship axis when a ship is hit. There are improvements to be made as the algorithm currently still hunts around the ship after it is destroyed.
- **Typewriter effect**: using `setInterval` and promises to asynchronously iterate through an array of strings to thematically bring the presentation closer to the 80's sci-fi movies - à la _War Games_.
- **ChatGPT AI**: The original quotes and ship names were laboriously hand extracted from the novels and consequently their small pool resulted in some repeated quotes. ChatGPT was able to provide a much increased pool of quotes while being thematically aligned. It also improved upon the main page and ship selection page speeches.

## What I Learned

### Game loop

- I used the event loop and manipulated event listeners using `setTimeout` with a `computersTurn` callback function to simulate a rudimentary game loop. As the synchronous functions run to completion, the last statement of the click handler of the player's click removes event listeners placed on the comp board, giving the illusion of 'AI thinking'.
- When the timer ends, the browser API pushes the `computersTurn` callback onto the macrotask queue and is pushed by the event loop onto the callstack once all the synchronous functions have been popped off (save the global()). The computer attacks and associated functions are run and click event handlers are added back on.
- The player's clicks now register and the cycle continues until the hit counter for either the player or the computer reaches 18 (the total length of the ships).

### DOM manipulation

- As the game logic required different elements to be updated based on disparate object states on each turn, it became necessary to use data attributes with multiple interpolated values to update game state.

### Typewriter effect and promises

- The typewriter effect uses `setInterval` and promises to iterate through an array of strings, executing a callback function for each string. The callback function is awaited before the next string is iterated. For each string, a promise is created as the chars are added to the DOM element, resolving once the end of string is reached.
- I tried other online solutions, the CSS method using keyframes animations, but was not able to make it work. The synchronous solution only worked for a single string, not an array of strings.

#### State

State management was done entirely using the synchronous `localStorage` API.

#### Setting

The setting of the game was inspired by my love of sci-fi novels and 80's sci-fi movies. The theme and colours are designed to mimic an _Apple III_ monitor and the displays used in classic 80's movies such as _War Games_.

The game is set in the 'Honorverse', a fictional universe from a series of books written by David Weber and published by Baen, featuring a strong female character where the good folks are liberal, democratic and serve the 'Queen and Kingdom', and the bad folks are war-mongering authoritarians. The conflict between the Star Kingdom and People's Republic of Haven does take place and is a central story arc in the books, but the battle in this game does not.

The names used for the ships are from the books, although I took some liberties in mixing up several ship type names and the fleet names. The battle messages were also from the books. Yes, it really is naval warships set in space, complete with broadside salvos and sails!

The pre-battle quote in the ship selection page is actually paraphrased from two different real historical sources: one given by General Napoleon Bonaparte to his troops before the Battle of Marengo in Italy, June 14, 1800, the second spoken by General Dwight D. Eisenhower ordering the Normandy Invasion, June 6, 1944. ChatGPT was used to expand upon the quotes.

#### Disclaimers

Copyright disclaimer Under Section 107 of the Copyright Act in 1976. Allowance is made for "Fair Use" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research.

Fair use is an use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use.

All rights and credit go directly to its rightful owners. No copyright infringement intended.

This is for educational and personal purposes only.

Copyright by David M. Weber

Baen Publishing Enterprises
P.O. Box 1403
Riverdale, NY 10471

Distributed by Simon & Schuster
1230 Avenue of the Americas
New York, NY 10020
