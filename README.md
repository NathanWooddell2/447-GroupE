# js-battleship

This is a draft of the multiplayer that still has some bugs that need fixing

Make sure Node.js is installed on your computer.

First in your terminal write command "npm i express socket.io" so you have socket.io installed on your system

Also "npm i --save-dev nodemon" in the terminal. This will monitor the node server so that any changes that are made, this will automaticlly restart it for you.
This will only be in the development

After this, type "npm run dev" into the terminal and the game should be ready to go. So now go to your browser and plug "127.0.0.1:3000" into your search bar and the game should show up.
For the multiplayer you'll want to open 2 tabs of the game board, one for each player.

To start the game press the multiplayer button and the green light should appear telling you that you're connected. Once all the ships are placed on your board,
you can click the "Begin" button to show you're ready to start the game and so the Set light should turn green. Once this is done go and do the same for the 
second player in the other open tab. You should see that that the first player lights are on now. Once both player's indicate that they are Ready the game begins.

The first player always goes first and choses a spot and if you go over to the other player's tab you can see that the tile chosen shows up on his board and same\
goes for the next turn.
