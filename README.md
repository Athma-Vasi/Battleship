# Battleship

Battleship project as part of The Odin Project curriculum

[Click here to view project live](https://athma-vasi.github.io/Battleship/)

## Things I learned

### TL;DR

- Test Driven Development
- Game Loop

### TDD

The main goal of this final JS project is to solidify and utilize all the skills and techniques learned. The new concept introduced here was TDD.

Using TDD helped me write better, loosely coupled code and I found myself trying to use more pure functions. Although this was few and far between as much of the code I wrote dealt with DOM manipulation or writing to localStorage. Using ts-jest was surprisingly straight-forward and the main jest documentation was incredible!

### Game Loop

The hardest part was figuring out how to write a game loop. In the end I settled on using the event loop itself and manipulating event listeners with setTimeout to simulate a game loop without using a while(boolean) statement.

The game flow is as follows:

- After the comp board cells are generated and the randomly selected(from a pool) ship formation is placed and hidden, 'click' event listeners are added on with their corresponding callbacks.

- The player always goes first. When the player clicks on a comp cell, the event callback function is called depending on whether the cell contains a ship or is empty. This differentiation is mainly for the purpose of visually indicating an explosion (if a hit) and updating the hit counter, or an 'x' (if a miss).

- As 'click' handler callbacks are synchronous functions, they are
  executed first. The 'click' handlers contain a `setTimeout(computersTurn, 2000)` callback that is passed immediately to the browser API. The thread of execution continues running the remaining synchronous code, which after relevant work is done removes the event listeners placed on the comp board cells. This prevents the player's clicks from having any effect for two seconds, giving the illusion of computer taking time to ""think"" 🤖.

- When the timer ends, the browser API pushes the `computersTurn` callback onto the macrotask queue and is pushed by the event loop onto the callstack once all the synchronous functions have been popped off (save the global()). The computer attacks a random cell (previously hit player cells are prevented from being attacked again), and a hit is visually indicated along with a hit counter update, and a miss is also visually indicated. Finally, the 'click' event listeners are put back on the corresponding cells and the `computersTurn` function is popped off the callstack.

- The player's clicks now register and the cycle continues until the hit counter for either the player or the computer reaches 18 (the total length of the ships).

State management was done entirely using `localStorage` API.

#### Setting

The setting of the game was inspired by my love of science-fiction. The game is set in the 'Honorverse', a fictional universe from a series of books written by David Weber and published by Baen, featuring a strong female character where the good folks are liberal, democratic and serve the 'Queen 👑 and Kingdom', and the bad folks are war-mongering authoritarians. The conflict between the Star Kingdom and People's Republic of Haven does take place and is a central story arc in the books, but the battle in this game does not.

The names used for the ships are from the books, although I took some liberties in mixing up several ship type names as some were scarce. The battle messages were also from the books. Yes, it really is naval water based ships set in space 🚀, complete with broadside salvos and sails ⛵!

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
