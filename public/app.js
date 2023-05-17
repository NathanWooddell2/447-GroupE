const rotateButton = document.querySelector('#rotate-button')
const beginButton = document.querySelector('#begin-button')
const selectContain = document.querySelector('.select-contain')
const boardsContain = document.querySelector('#boards-contain')
const informationOutput = document.querySelector('#information')
const turnOutput = document.querySelector('#whos-turn')
const boardButtons = document.getElementById('board-buttons')
const boardGame = document.querySelector('.boardGame')
let mem
let userNum = 0 //Are you player 1 or 2
let attacks = -1 //Attack number
let set = false  //Is the player ready
let enemySet = false //Is the enemy ready
let allBoatsDropped = false //Are all boats are placed
let yourTurn //Is it your turn
let multiTurn = 'user' //The user's turn is first
const hitSound = new Audio("boom.mp3");
const missSound = new Audio("miss.mp3");
//let width = 10 //The width of the boards

//127.0.0.1:3000

//Boat Creation
class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}

//Name and length allocation of all ships
const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)
const cruiser = new Ship('cruiser', 3)
const destroyer = new Ship('destroyer', 2)
const patrol = new Ship('patrol', 3)
const rescue = new Ship('rescue', 2)
const submarine = new Ship('submarine', 3)

const boats = [battleship, carrier, cruiser, destroyer, patrol, rescue, submarine]

let notPlaced //Ships not placed

document.addEventListener('DOMContentLoaded', () => { //Changes the size of the board based on difficulty
    const boardGameElement = document.querySelector('.boardGame');
    if (boardGameElement) {
        if (width === 10) {
            //boardGameElement.classList.add('easy-board')
            //boardGameElement.style.gridTemplateRows = 'repeat(10, 4.6vmin)';
            //boardGameElement.style.gridTemplateColumns = 'repeat(10, 4.6vmin)';
            //const gridTemplateRows = document.createElement('div');
            //gridTemplateRows.textContent = 'repeat(10, 4.6vmin)';
            //const gridTemplateColumns = document.createElement('div');
            //gridTemplateColumns.textContent = 'repeat(10, 4.6vmin)';
            //boardGameElement.appendChild(gridTemplateRows);
            //boardGameElement.appendChild(gridTemplateColumns);
        }
        else if (width === 12) {
            //boardGameElement.classList.add('normal-board')
            //boardGameElement.style.gridTemplateRows = 'repeat(12, 4.6vmin)';
            //boardGameElement.style.gridTemplateColumns = 'repeat(12, 4.6vmin)';
            //const gridTemplateRows = document.createElement('div');
            //gridTemplateRows.textContent = 'repeat(12, 4.6vmin)';
            //const gridTemplateColumns = document.createElement('div');
            //gridTemplateColumns.textContent = 'repeat(12, 4.6vmin)';
            //boardGameElement.appendChild(gridTemplateRows);
            //boardGameElement.appendChild(gridTemplateColumns);
        }
        else if (width === 14) {
            //boardGameElement.classList.add('hard-board')
            //boardGameElement.style.gridTemplateRows = 'repeat(14, 4.6vmin)';
            //boardGameElement.style.gridTemplateColumns = 'repeat(14, 4.6vmin)';
            //const gridTemplateRows = document.createElement('div');
            //gridTemplateRows.textContent = 'repeat(14, 4.6vmin)';
            //const gridTemplateColumns = document.createElement('div');
            //gridTemplateColumns.textContent = 'repeat(14, 4.6vmin)';
            //boardGameElement.appendChild(gridTemplateRows);
            //boardGameElement.appendChild(gridTemplateColumns);
        }
    }

});

boardCreation('dodgerblue', 'p1') //Creation of the user's board

boardCreation('dodgerblue', 'AI') //Creation of enemies board
 
//Clicking Singleplayer or Multiplayer
if (selectGame === 'singlePlayer')
{ //If they selected single player game mode
    oneUserStart()
} 
else if (selectGame === 'multiPlayer')
{ //If they pick multiplayer game mode
    twoUsersStart()
}

//Two players versus eachother
function twoUsersStart() { 
    const socket = io();

    //Figure out which player you are
    socket.on('player', number => {
        if (number === -1) { //If a third player joins
            informationOutput.innerHTML = "The server already has 2 players"
        } else {
            userNum = parseInt(number)
            if (userNum === 1) { //The other player who joined
                multiTurn = "enemy"
            }
            console.log(userNum)

            //Check if there is another player and are they set
            socket.emit('user-status')
        }
    }) 
     
    //Other user has joined or left
    socket.on('player-connection', number => {
        console.log(`Player number ${number} has connected or disconnected`)
        userConnectOrDisconnect(number)
    }) 

    //Enemy Set
    socket.on('enemy-set', number => {
        enemySet = true
        userSet(number)
        if (set) {
            beginBattleMulti(socket)
        }
    })

    //User status check
    socket.on('user-status', users => {
        users.forEach((u, i) => {
            if (u.connect) userConnectOrDisconnect(i)
            if (u.set) {
                userSet(i)
                if (i !== userNum) {
                    enemySet = true
                }
            }
        })
    })

    //On Pause
    socket.on('pause', () => {
        informationOutput.innerHTML = 'Your 10 Minutes Are Up'
    })


    //User presses the Begin button
    beginButton.addEventListener('click', () => {
        if (allBoatsDropped) {
            boardButtons.style.display = 'none'
            beginBattleMulti(socket)
        } else {
            informationOutput.innerHTML = "You must put all ships on your board before battling!"
        }
    })

    //Process for the event listeners in attacking on multiplayer
    const allTiles = document.querySelectorAll('#AI div')
    allTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (multiTurn === 'user' && set && enemySet) {
                attacks = tile.id
                socket.emit('attack', attacks)
            }
        })
    })

    //On getting an attack
    socket.on('attack', id => {
        enemyTurn(id)
        const tile = allUserTiles[id]
        socket.emit('attack-responce', tile.classList)
        beginBattleMulti(socket)
    })

    //On getting the attack responce
    socket.on('attack-responce', classList => {
        choseTile(classList)
        beginBattleMulti(socket)
    })


    //Displays what user you are on screen in bold
    function userConnectOrDisconnect(number) {
        let user = `.p${parseInt(number) + 1}`
        document.querySelector(`${user} .connected`).classList.toggle('active')
        if (parseInt(number) === userNum) {
            document.querySelector(user).style.fontWeight = 'bold'
        } 
    }
}  

//One player against the AI
function oneUserStart() {
    boats.forEach(boat => placeBoat('AI', boat))

    beginButton.addEventListener('click', () => {
        if (allBoatsDropped) {
            boardButtons.style.display = 'none'
            beginBattleSingle()
        } else {
            informationOutput.innerHTML = "You must put all ships on your board before battling!"
        }
        //boardButtons.style.display = 'none'
        //beginBattleSingle()
    })

}


//Making a Selection 
let degree = 0
function rotate() {
    const selectShips = Array.from(selectContain.children)
    //Rotates the ships not on board with button
    if (degree === 0) {
        degree = 90
        selectShips.forEach(selectShip => selectShip.style.transform = "rotate(90deg)")
    } else {
        degree = 0;
        selectShips.forEach(selectShip => selectShip.style.transform = 'rotate(0deg)')
    }
}
rotateButton.addEventListener('click', rotate)


//Creating the boards
function boardCreation(color, player) {
        const boardContain = document.createElement('div')
        boardContain.classList.add('boardGame')
        if (color === 'aliceblue') {
            boardContain.style.backgroundColor = color
        }
        //boardContain.style.backgroundColor = color

        //Sets the boards id to the player
        boardContain.id = player

        //Puts the tiles on the board grid
        for (let i = 0; i < width * width; i++) {
            const gridTile = document.createElement('div')
            gridTile.classList.add('grid-tile')
            gridTile.id = i
            boardContain.append(gridTile)
        }

        boardsContain.append(boardContain)
}

//Checks to make sure the boat can be placed at the location
function doubleCheck(allTiles, horiz, origin, boat) {
    //Boats do not go out of bounds
    let correctBuild = horiz ? width * width - boat.length >= origin ? origin :
        width * width - boat.length :
        //If it's veritical
        width * width - width * boat.length >= origin ? origin :
            origin - boat.length * width + width

    let boatTiles = []
    let direction

    for (let i = 0; i < boat.length; i++) {
        if (horiz) {
            boatTiles.push(allTiles[Number(correctBuild) + i])
        } else {
            boatTiles.push(allTiles[Number(correctBuild) + i * width])
        }
    }

    let correct

    if (horiz) { //Boats stay within the sides, top, and bottom
        boatTiles.every((_boatTile, index) =>
            correct = boatTiles[0].id % width !== width - (boatTiles.length - (index + 1)))
    } else {
        boatTiles.every((_boatTiles, index) => correct = boatTiles[0].id < 90 + (index * width + 1))
    }

    //Space doesn't have a boat
    const freeSpace = boatTiles.every(boatTile => !boatTile.classList.contains('taken'))

    //Returns the information back
    return {boatTiles, correct, freeSpace}

}


//Places boats on the boards
 function placeBoat(user, boat, beginningId) {
    const allTiles = document.querySelectorAll(`#${user} div`) //Checks which grid it's checking
    let randBool = Math.random() < 0.5
    let horiz = user === 'p1' ? degree === 0 : randBool
    let randOrigin = Math.floor(Math.random() * width * width)

    let origin = beginningId ? beginningId : randOrigin


    const { boatTiles, correct, freeSpace } = doubleCheck(allTiles, horiz, origin, boat)
     let direction

     if (correct && freeSpace) { //If within bound and on free spaces, place the ship
        let long = 0
        boatTiles.forEach(boatTile => {
            //Add the name of the boat to tile it occupies
            boatTile.classList.add(`${boat.name}-design`)

            if (horiz) { //If ship is horizontal
                boatTile.classList.add('horizontal')

                if (long === 0) { //If it's the top of the ship
                    direction = 'head'
                    boatTile.classList.add(direction)
                }
                else if (long === boat.length - 1) { //If it's the bottom of the ship
                    direction = 'tail'
                    boatTile.classList.add(direction)
                }
                else if (long === 1) { //If it's the first middle tile
                    direction = 'one'
                    boatTile.classList.add(direction)
                }
                else if (long === 2) { //If it's the second middle tile
                    direction = 'two'
                    boatTile.classList.add(direction)
                }
                else if (long === 3) { //If it's the third middle tile
                    direction = 'three'
                    boatTile.classList.add(direction)
                }
                else {
                    direction = `${long}` //If it's the middle of the ship
                    boatTile.classList.add(direction)
                }
            }
            else { //If the the ship is horizontal
                boatTile.classList.add('vertical')
                if (long === 0) { //If it's the top of the ship
                    direction = 'head'
                    boatTile.classList.add(direction)
                }
                else if (long === boat.length - 1) { //If it's the bottom of the ship
                    direction = 'tail'
                    boatTile.classList.add(direction)
                }
                else if (long === 1) { //If it's the first middle tile
                    direction = 'one'
                    boatTile.classList.add(direction)
                }
                else if (long === 2) { //If it's the second middle tile
                    direction = 'two'
                    boatTile.classList.add(direction)
                }
                else if (long === 3) { //If it's the third middle tile
                    direction = 'three'
                    boatTile.classList.add(direction)
                }
                else {
                    direction = `${long}` //If it's the middle of the ship
                    boatTile.classList.add(direction)
                }
            }
            long = long + 1

            boatTile.classList.add('taken') //Indicates the tile has a ship on it
        })
    } else { //if not, run function again
        if (user === 'AI') {
            placeBoat('AI', boat, beginningId)
        }
        if (user === 'p1') {
            notPlaced = true
        }
    }

}

//User dragging and dropping boats
let dragging
const selectBoats = Array.from(selectContain.children) //Array of all the boats
selectBoats.forEach(selectBoat => selectBoat.addEventListener('dragstart', dragStart)) //Lets all boats able to be dragged

const allUserTiles = document.querySelectorAll('#p1 div') //All the user's tiles
allUserTiles.forEach(userTile => {
    userTile.addEventListener('dragover', carryOver) //All user tiles can be dragged over and dropped
    userTile.addEventListener('drop', releaseBoat) //All user tiles can be dragged over and droped
})

function dragStart(e) { //Start to drag selected ship
    notPlaced = false
    dragging = e.target
}

function carryOver(e) { //Drag ship over the user's grid
    e.preventDefault()
    const boat = boats[dragging.id]
}

function releaseBoat(e) { //Drop the ship onto the user's tiles
    const beginningId = e.target.id
    const boat = boats[dragging.id]
    placeBoat('p1', boat, beginningId)
    if (!notPlaced) { //If all ships empty
        dragging.remove()
        if (selectContain.children.length === 0) { //If all ships placed
            allBoatsDropped = true
        }
    }
}

//Add Outlines
//function outline(origin, boat) {
//    const allTiles = document.querySelectorAll('#p1 div')
//    let horiz = degree === 0
//
//    const { boatTiles, correct, freeSpace } = doubleCheck(allTiles, horiz, origin, boat)
//
//    if (correct && freeSpace) {
//       boatTiles.forEach(boatTile => {
//            boatTile.classlist.add('float')
//            setTimeout(() => boatTile.classList.remove('float'), 500)
//        })
//    }
//}


let lose = false //Has anyone lost yet


//Begin the Battle versus another player (Multiplayer)
function beginBattleMulti(socket) {

    boardButtons.style.display = 'none' //Once game starts, get rid of the buttons

    if (lose) { //If someone has lost, exit
        return
    }
    if (!set) { //If player is ready to start
        socket.emit('user-set')
        set = true
        userSet(userNum)
    }

    if (enemySet) { //If the enemy is ready to start
        if (multiTurn === 'user') { //If it's the user's turn
            turnOutput.innerHTML = "It's Your Turn!"
        }
        if (multiTurn === 'enemy') { //If it's the enemy's turn
            turnOutput.innerHTML = "It's The Enemy's Turn!"
        }
    }
}


function userSet(number) { //Display's on top if user is ready or not
    let user = `.p${parseInt(number) + 1}`
    document.querySelector(`${user} .set`).classList.toggle('active')
}


//Begin the Battle versus an AI (Single Player)
function beginBattleSingle() {
    if (yourTurn === undefined) { //If undefined is the beginning of a new game
        if (selectContain.children.length != 0) { //If ships are not all placed
            informationOutput.textContent = 'You must put all ships on your board before battling!'
        }
        else {
            const allTiles = document.querySelectorAll('#AI div')
            allTiles.forEach(tile => tile.addEventListener('click', function (e) { //Select a tile on enemy's board
                //-----------------
                attacks = tile.id //Set tile selected to attacks
                console.log(attacks)
                //--------------------
                choseTile(tile) //Get the class list of the chosen tile
            }))
            yourTurn = true
            //added
            //multiTurn = 'user'
            //added
            turnOutput.textContent = "Player 1's turn!"
            informationOutput.textContent = "The battle has begun!"
        }
    }
}

let level = 'three' //-----------------------CHANGE THIS TO CHANGE DIFICULTY---------------------------
let p1Hits = [] //Player hit's on enemy ships
let aiHits = [] //Enemy hits on player's ships
const p1Destroyed = [] //The ships that the Player has destoroyed
const aiDestroyed = [] //The ships the enemy has destroyed

//Player select's a tile to hit
function choseTile(tile) { 
    if (lose === false) {
        
        //console.log(tile)
        //allGridTiles = document.getElementById("AI")
        //console.log(allGridTiles)
        //allGridTiles = allGridTiles.getElementsByTagName("div")
        //console.log(allGridTiles)

        const allGridTiles = document.querySelectorAll('#AI div')

        const enemyTile = allGridTiles[tile.id]
 
        if (!enemyTile.classList.contains('hit') && multiTurn === 'user') { //If the tile hasn't been selected before
            if (enemyTile.classList.contains('taken')) { //If the tile has a ship on it
                enemyTile.classList.add('hit') //Indicate that the ship has been hit
                informationOutput.textContent = "You hit a ship!"
                hitSound.play() //Boom sound effect
                //let dispClasses = Array.from(enemyTile.classList)
                let dispClasses = Array.from(enemyTile.classList)

                //Remove all unnecessary words before appending the ships name to Hits or Destroyed array
                dispClasses = dispClasses.filter(words => words !== 'grid-tile')
                dispClasses = dispClasses.filter(words => words !== 'taken')
                dispClasses = dispClasses.filter(words => words !== 'hit')
                dispClasses = dispClasses.filter(words => words !== 'horizontal')
                dispClasses = dispClasses.filter(words => words !== 'vertical')
                dispClasses = dispClasses.filter(words => words !== 'head')
                dispClasses = dispClasses.filter(words => words !== 'tail')
                dispClasses = dispClasses.filter(words => words !== 'one')
                dispClasses = dispClasses.filter(words => words !== 'two')
                dispClasses = dispClasses.filter(words => words !== 'three')
                dispClasses = dispClasses.filter(words => words !== '-design')
                p1Hits.push(...dispClasses)
                pointBoard('p1', p1Hits, p1Destroyed) //Append ship name to Hits or Destroyed array
            }
        }
        if (!enemyTile.classList.contains('taken')) { //If there is no ship on the tile selected
            informationOutput.textContent = "You didn't hit anything"
            enemyTile.classList.add('miss') //Indicate that no ship was hit
            missSound.play() //Miss sound effect
        }
        
        yourTurn = false //Change to the enemy's turn
        multiTurn = 'enemy'//Change to enemy's turn

        //const allTiles = document.querySelectorAll('#AI div')
        //allTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true)))

        if (selectGame === 'singlePlayer') { //If against an AI
            setTimeout(enemyTurn, 500) //Slight delay before AI makes it's move
        }
    }
}

function getAjacent(currTile) {
    const allGridTiles = document.querySelectorAll('#p1 div') //All of the player's tiles
    let around = [] //Surounding tiles
    //allGridTiles[currTile].classList.contains('taken')

    if (currTile > 9) { //If not on the top row
        let above = currTile - 10
        if (allGridTiles[currTile].classList.contains('vertical')) {
            if (!allGridTiles[above].classList.contains('miss')) { //If they haven't shot already
                around.push(above) //Add surrounding tile
            }
        }
    }
    if (currTile < 90) { //If not on the botom row
        let below = currTile + 10
        if (allGridTiles[currTile].classList.contains('vertical')) {
            if (!allGridTiles[below].classList.contains('miss')) { //If they haven't shot already
                around.push(below) //Add surrounding tile
            }
        }
    }
    if (!(currTile % 10 === 0)) { //If not on the left
        let left = currTile - 1
        if (allGridTiles[currTile].classList.contains('horizontal')) {
            if (!allGridTiles[left].classList.contains('miss')) { //If they haven't shot already
                around.push(left) //Add surrounding tile
            }
        }
    }
    if (!((currTile + 1) % 10 === 0)) { //If not on the right
        let right = currTile + 1
        if (allGridTiles[currTile].classList.contains('horizontal')) {
            if (!allGridTiles[right].classList.contains('miss')) { //If they haven't shot already
                around.push(right) //Add surrounding tile
            }
        }
    }
    return around
}

let lastTurnShips = 0
let tileTrack = [] //tiles hit
let potential = [] //Potential spaces the ship can be

function updatePotential() {
    const allGridTiles = document.querySelectorAll('#p1 div') //All of the player's tiles
    potential = []
    let ajacent
    for (let i = 0; i < tileTrack.length; i++) {
        let currTile = tileTrack[i] //Get the tile
        ajacent = getAjacent(currTile) //Get the tiles around the tile
        if (lastTurnShips === aiDestroyed.length) { //If the AI sunk a ship last turn
            for (let j = 0; j < ajacent.length; j++) {
                let nextPotential = ajacent[j]
                if (!tileTrack.includes(nextPotential) && !potential.includes(nextPotential) && !allGridTiles[nextPotential].classList.contains('miss')) {
                    potential.push(nextPotential) // a spot where tAI could fire next
                }
            }
        }
        else { //If the ship was sunk last turn reset to shoot random
            potential = []
            tileTrack = []
            lastTurnShips++
        }
    }
}

let repeats = 0
//The enemy's thought process
function enemyTurn(tile) {
    if (lose === false) {
        turnOutput.textContent = "It's the enemy's turn!"

        const allGridTiles = document.querySelectorAll('#p1 div') //All of the player's tiles

        setTimeout(() => {
            //let randTurn = Math.floor(Math.random() * width * width)
            if (selectGame === 'singlePlayer') {
                if (level === 'one') { //Easy mode
                    tile = Math.floor(Math.random() * width * width) //AI randomly selects a tile
                }
                else if (level === 'two' || level === 'three') { //Medium or Hard difficulty
                    if (potential.length === 0) { //If no hits
                        tile = Math.floor(Math.random() * width * width) //AI randomly selects a tile
                    } 
                    else { //If at least 1 hit
                        let probability = []
                        for (let i = 0; i < potential.length; i++) {
                            let currPotential = potential[i]
                            //Calculate the probability
                            console.log(currPotential)
                            probability.push(currPotential)
                        }
                        //Select tile with highest probibility
                        let rando = Math.floor(Math.random() * potential.length) //Pick one of the possible spaces
                        console.log(potential[rando])
                        tile = potential[rando] //Set tile to that space
                    }
                }
            }
             
            //If it selects a spot it already hit before
            if (allGridTiles[tile].classList.contains('taken') &&
                allGridTiles[tile].classList.contains('hit')) {
                if (selectGame === 'singlePlayer') {
                    enemyTurn() //Give's another chance if it's an AI
                }
                return
            }
            //If the AI get's a hit on the player
            else if (allGridTiles[tile].classList.contains('taken') &&
                !allGridTiles[tile].classList.contains('hit')) {
                allGridTiles[tile].classList.add('hit')
                hitSound.play() //Hit sound effect
                informationOutput.textContent = "The enemy got a hit on your ship!"

                //Remove all unnecessary words before appending the ships name to Hits or Destroyed array
                let dispClasses = Array.from(allGridTiles[tile].classList)
                dispClasses = dispClasses.filter(words => words !== 'grid-tile')
                dispClasses = dispClasses.filter(words => words !== 'taken')
                dispClasses = dispClasses.filter(words => words !== 'hit')
                dispClasses = dispClasses.filter(words => words !== 'horizontal')
                dispClasses = dispClasses.filter(words => words !== 'vertical')
                dispClasses = dispClasses.filter(words => words !== 'head')
                dispClasses = dispClasses.filter(words => words !== 'tail')
                dispClasses = dispClasses.filter(words => words !== 'one')
                dispClasses = dispClasses.filter(words => words !== 'two')
                dispClasses = dispClasses.filter(words => words !== 'three')
                dispClasses = dispClasses.filter(words => words !== '-design')
                aiHits.push(...dispClasses)
                pointBoard('AI', aiHits, aiDestroyed) //Append ship name to Hits or Destroyed array

                if (selectGame === 'singlePlayer') {
                    tileTrack.push(tile) //Add tile number
                    updatePotential()
                }
            }
            else
            { //If there was no ship on the tile selected
                missSound.play() //Miss sound effect
                informationOutput.textContent = "The enemy missed"
                allGridTiles[tile].classList.add('miss')
            }
            if (selectGame === 'singlePlayer') { //If Hard Difficulty
                if (level === 'three' && repeats < 1) {
                    repeats = repeats + 1
                    enemyTurn()
                } else {
                    repeats = 0
                }
                return
            }
        }, 1500) //Time delay before the computer decides

        setTimeout(() => {
            multiTurn = 'user' //set the turn back to the player
            yourTurn = true //set the turn back to the player

            turnOutput.textContent = "It's Your Turn!"
            informationOutput.textContent = "Select an enemy tile"

            if (selectGame === 'singlePlayer') {
                turnOutput.textContent = "It's Your Turn!"
                informationOutput.textContent = "Select an enemy tile"
                const allGridTiles = document.querySelectorAll('#AI div') //Set grib back to the enemy for selection
                allGridTiles.forEach(tile => tile.addEventListener('click', choseTile)) //All enemy tiles are clickable
            }
            if (selectGame === 'multiPlayer') {
                //turnOutput.textContent = "It's Your Turn xxxxxxxxxxxxxxxxxxxxx"
                //informationOutput.textContent = "Select an enemy tile"
            }
            //turnOutput.textContent = "It's Your Turn!"
            //informationOutput.textContent = "Select an enemy tile"
            //const allGridTiles = document.querySelectorAll('#AI div')
            //allGridTiles.forEach(tile => tile.addEventListener('click', choseTile))

        }, 3000) //3 second delay before user can select a tile. This is so they have time to read the output

    }
}
//Displays what ships have been suck
function pointBoard(user, totalHits, totalDestroyed) {

    function examine(boatName, boatLength) {
        if (totalHits.filter(givenName => givenName === boatName).length === boatLength) {
            if (user === 'p1') { //The given boat is on the user's side
                if (boatName === 'destroyer-design') {
                    informationOutput.textContent = `You sunk the enemy's Destroyer!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'rescue-design') {
                    informationOutput.textContent = `You sunk the enemy's Rescue ship!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'patrol-design') {
                    informationOutput.textContent = `You sunk the enemy's Patrol ship!!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else  if (boatName === 'submarine-design') {
                    informationOutput.textContent = `You sunk the enemy's Submarine!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'cruiser-design') {
                    informationOutput.textContent = `You sunk the enemy's Cruiser!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'battleship-design') {
                    informationOutput.textContent = `You sunk the enemy's Battleship!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'carrier-design') {
                    informationOutput.textContent = `You sunk the enemy's Carrier!`
                    p1Hits = totalHits.filter(givenName => givenName !== boatName)
                }
                //informationOutput.textContent = `You sunk the enemy's ${boatName}`
                //p1Hits = totalHits.filter(givenName => givenName !== boatName) //Adds boat tile to hit array
            }
            if (user === 'AI') { //The given boat is on the AI's side
                if (boatName === 'destroyer-design') {
                    informationOutput.textContent = `The enemy sunk your Destroyer!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'rescue-design') {
                    informationOutput.textContent = `The enemy sunk your Rescue ship!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'patrol-design') {
                    informationOutput.textContent = `The enemy sunk your Patrol ship!!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'submarine-design') {
                    informationOutput.textContent = `The enemy sunk your Submarine!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'cruiser-design') {
                    informationOutput.textContent = `The enemy sunk your Cruiser!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'battleship-design') {
                    informationOutput.textContent = `The enemy sunk your Battleship!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                else if (boatName === 'carrier-design') {
                    informationOutput.textContent = `The enemy sunk your Carrier!`
                    aiHits = totalHits.filter(givenName => givenName !== boatName)
                }
                //informationOutput.textContent = `The enemy sunk your ${boatName}`
                //aiHits = totalHits.filter(givenName => givenName !== boatName) //Adds boat tile to hit array
            }
            totalDestroyed.push(boatName)
        }
    }

    //Chacks all boats to see the current state of each
    examine('destroyer-design', 2)
    examine('rescue-design', 2)
    examine('patrol-design', 3)
    examine('submarine-design', 3)
    examine('cruiser-design', 3)
    examine('battleship-design', 4)
    examine('carrier-design', 5)

    console.log('p1Hits', p1Hits)
    console.log('p1Destroyed', p1Destroyed)
    console.log('aiHits', aiHits)
    console.log('aiDestroyed', aiDestroyed)

    if (p1Destroyed.length === 7) { //The the player sunk all the enemy ships
        informationOutput.textContent = "YOU SUNK ALL THE SHIPS! YOU WIN!"
        lose = true //Indicate that someone lost and end the game
    }

    if (aiDestroyed.length === 7) { //the enemy sunk all the user ships
        informationOutput.textContent = "ALL YOUR SHIPS WERE SUNK. YOU LOST!"
        lose = true //Indicate that someone lost and end the game
    }
}
