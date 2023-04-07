const rotateButton = document.querySelector('#rotate-button')
const beginButton = document.querySelector('#begin-button')
const selectContain = document.querySelector('.select-contain')
const boardsContain = document.querySelector('#boards-contain')
const informationOutput = document.querySelector('#information')
const turnOutput = document.querySelector('#whos-turn')

//Making a Selection 
let degree = 0
function rotate() {
    const selectShips = Array.from(selectContain.children)

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
const width = 10

function boardCreation(color, player) {
    const boardContain = document.createElement('div')
    boardContain.classList.add('boardGame')
    boardContain.style.backgroundColor = color
    boardContain.id = player

    for (let i = 0; i < width * width; i++) {
        const gridTile = document.createElement('div')
        gridTile.classList.add('grid-tile')
        gridTile.id = i
        boardContain.append(gridTile)
    }

    boardsContain.append(boardContain)
}
boardCreation('dodgerblue', 'p1')
boardCreation('dodgerblue', 'AI')

//Boat Creation
class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}

const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)
const cruiser = new Ship('cruiser', 3)
const destroyer = new Ship('destroyer', 2)
const patrol = new Ship('patrol', 3)
const rescue = new Ship('rescue', 2)
const submarine = new Ship('submarine', 3)

const boats = [battleship, carrier, cruiser, destroyer, patrol, rescue, submarine]
let notPlaced

function doubleCheck(allTiles, horiz, origin, boat) {
    //Boats do not go out of bounds
    let correctBuild = horiz ? width * width - boat.length >= origin ? origin :
        width * width - boat.length :
        //If it's veritical
        width * width - width * boat.length >= origin ? origin :
            origin - boat.length * width + width

    let boatTiles = []

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

    return {boatTiles, correct, freeSpace}

}


function placeBoat(user, boat, beginningId) {
    const allTiles = document.querySelectorAll(`#${user} div`)
    let randBool = Math.random() < 0.5
    let horiz = user === 'p1' ? degree === 0 : randBool
    let randOrigin = Math.floor(Math.random() * width * width)

    let origin = beginningId ? beginningId : randOrigin


    const { boatTiles, correct, freeSpace } = doubleCheck(allTiles, horiz, origin, boat)

    if (correct && freeSpace) { //If within bound and on free spaces, place the ship
        boatTiles.forEach(boatTile => {
            boatTile.classList.add(`${boat.name}-design`)
            boatTile.classList.add('taken')
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
boats.forEach(boat => placeBoat('AI', boat))


//User dragging and dropping boats
let dragging
const selectBoats = Array.from(selectContain.children)
selectBoats.forEach(selectBoat => selectBoat.addEventListener('dragstart', dragStart))

const allUserTiles = document.querySelectorAll('#p1 div')
allUserTiles.forEach(userTile => {
    userTile.addEventListener('dragover', carryOver)
    userTile.addEventListener('drop', releaseBoat)
})

function dragStart(e) {
    //console.log(e.target)
    notPlaced = false
    dragging = e.target
}

function carryOver(e) {
    e.preventDefault()
    const boat = boats[dragging.id]
    //outline(e.target.id, boat)
}

function releaseBoat(e) {
    const beginningId = e.target.id
    const boat = boats[dragging.id]
    placeBoat('p1', boat, beginningId)
    if (!notPlaced) {
        dragging.remove()
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


let lose = false
let yourTurn


//Begin the Battle!!!!
function beginBattle() {
    if (yourTurn === undefined) {
        if (selectContain.children.length != 0) {
            informationOutput.textContent = 'You must put all ships on your board before battling!'
        }
        else {
            const allTiles = document.querySelectorAll('#AI div')
            allTiles.forEach(tile => tile.addEventListener('click', choseTile))
            yourTurn = true
            turnOutput.textContent = "Player 1's turn!"
            informationOutput.textContent = "The battle has begun!"
        }
    }
}

let p1Hits = []
let aiHits = []
const p1Destroyed = []
const aiDestroyed = []


//Player select's a tile to hit
function choseTile(e) {
    if (lose === false) {
        if (e.target.classList.contains('taken')) {
            e.target.classList.add('hit')
            informationOutput.textContent = "You hit a ship!"
            let dispClasses = Array.from(e.target.classList)
            dispClasses = dispClasses.filter(words => words !== 'grid-tile')
            dispClasses = dispClasses.filter(words => words !== 'taken')
            dispClasses = dispClasses.filter(words => words !== 'hit')
            dispClasses = dispClasses.filter(words => words !== '-design')
            p1Hits.push(...dispClasses)
            pointBoard('p1', p1Hits, p1Destroyed)
        }
        if (!e.target.classList.contains('taken')) {
            informationOutput.textContent = "You didn't hit anything"
            e.target.classList.add('miss')
        }
        yourTurn = false
        const allGridTiles = document.querySelectorAll('#AI div')
        allGridTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true)))
        setTimeout(aiTurn, 2000)

    }
}

//The AI's thought process
function aiTurn() {
    if (lose === false) {
        turnOutput.textContent = "It's the AI's turn!"
        turnOutput.textContent = "The AI is planning it's next move"

        setTimeout(() => {
            let randTurn = Math.floor(Math.random() * width * width)
            const allGridTiles = document.querySelectorAll('#p1 div')

            //If it selects a spot it already hit before
            if (allGridTiles[randTurn].classList.contains('taken') &&
                allGridTiles[randTurn].classList.contains('hit')) {
                aiTurn()
                return
            }
            //If the AI get's a hit on the player
            else if (allGridTiles[randTurn].classList.contains('taken') &&
                !allGridTiles[randTurn].classList.contains('hit')) {
                allGridTiles[randTurn].classList.add('hit')
                informationOutput.textContent = "The AI got a hit on your ship!"

                let dispClasses = Array.from(allGridTiles[randTurn].classList)
                dispClasses = dispClasses.filter(words => words !== 'grid-tile')
                dispClasses = dispClasses.filter(words => words !== 'taken')
                dispClasses = dispClasses.filter(words => words !== 'hit')
                dispClasses = dispClasses.filter(words => words !== '-design')
                aiHits.push(...dispClasses)
                pointBoard('AI', aiHits, aiDestroyed)
            }
            else
            {
                informationOutput.textContent = "The AI missed"
                allGridTiles[randTurn].classList.add('miss')
            }
        }, 2000)

        setTimeout(() => {
            yourTurn = true
            turnOutput.textContent = "Player 1's turn!"
            informationOutput.textContent = "Select an enemy tile"
            const allGridTiles = document.querySelectorAll('#AI div')
            allGridTiles.forEach(tile => tile.addEventListener('click', choseTile))
        }, 4000)

    }
}

function pointBoard(user, totalHits, totalDestroyed) {

    function examine(boatName, boatLength) {
        if (totalHits.filter(givenName => givenName === boatName).length === boatLength) {
            if (user === 'p1') {
                informationOutput.textContent = `You sunk the AI's ${boatName}`
                p1Hits = totalHits.filter(givenName => givenName !== boatName)
            }
            if (user === 'AI') {
                informationOutput.textContent = `The AI sunk Player 1's ${boatName}`
                aiHits = totalHits.filter(givenName => givenName !== boatName)
            }
            totalDestroyed.push(boatName)
        }
    }


    examine('destroyer-design', 2)
    examine('rescue-design', 2)
    examine('patrol-design', 3)
    examine('submarine-design', 3)
    examine('cruiser-design', 3)
    examine('battleship-design', 4)
    examine('carrier-design', 5)

    console.log('p1Hits', p1Hits)
    console.log('p1Destroyed', p1Destroyed)

    if (p1Destroyed.length === 7) {
        informationOutput.textContent = "YOU SUCK ALL THE SHIPS! YOU WIN!"
        lose = true
    }

    if (aiDestroyed.length === 7) {
        informationOutput.textContent = "ALL YOUR SHIPS WERE SUNK. YOU LOST!"
        lose = true
    }
}


beginButton.addEventListener('click', beginBattle)

