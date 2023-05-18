# Extreme Battleship
Welcome to the repository for the Extreme Battleship game. This is the current working version of the game, however this main branch is slated to later be rebased to the branch **React-Branch**. This will likely occur sometime this summer, but the code present here will be preserved for posterity. This project makes use of Node.js and the express module. As such you will need to install node. This is one of our current three working branches.

## Working Branches
We currently have three working branches, each with a designated purpose, and signifigant differences. The branch that we are currently working on is titled **React-Branch** and the other branches are relatively depricated/will not be updated.
### Main
This is your current branch. It includes singleplayer functionality, and a working game loop with three AI difficulties. Additionally this branch has the nicest graphical effects, and overall user experience. Multiplayer is currently not supported by this branch. This branch makes use of Node JS, and the Express package, which both must be installed before the code can be run.  

### React-Branch
This is the current working branch, and we are invisioning a rebase of the project to this branch in the not-too-distant future. This branch makes use of Node JS, React JS, Flask, and a MySQL database, and currently is the only branch with database functionality. This branch however does not currently have an implemented gameplay loop, athough the ability to place ships, and interact with tiles is currently supported. This Branch was created to provide the cleanest user interface possible, while enabling database support.

### Socket-Multiplayer
This branch has the working version of our socketed multiplayer, which we hope to one day use to create a web-based multiplayer battleship experience. The overall design of this branch is very rough around the edges compared to the cosmetics of the other branches, but the game functions as expected, and allows for reat-time socketed multiplayer.

### Working
This branch mainly exists for posterity, it was used as our emergency presentation branch, and was ultimately merged down into the main branch. *This branch is mainly for the sake of posterity*

## Usage Guide
This project requires Node JS to be installed to run. To install this project you will need to run the following in terminal or powershell:
'''
npm install
npm install express
npm start
'''
These commands should automatically open a new browser window for you to interact with the web app.
