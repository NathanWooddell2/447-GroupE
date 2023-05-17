
const rotateButton = document.querySelector('#rotate-button')
const selectContain = document.querySelector('.select-contain')
const boardsContain = document.querySelector('#boards-contain')


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
    const boardContain = document.createElement('div') //GRIDDDDDDDDDDDD
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

function placeBoat(boat) {
    const allTiles = document.querySelectorAll('#AI div')
    let boatTiles = []
    let randBool = Math.random() < 0.5
    let horiz = randBool
    let randOrigin = Math.floor(Math.random() * width * width)

    //Boats do not go out of bounds
    let correctBuild = horiz ? width * width - boat.length >= randOrigin ? randOrigin :
        width * width - boat.length :
        //If it's veritical
        width * width - width * boat.length >= randOrigin ? randOrigin :
            randOrigin - boat.length * width + width


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

    if (correct && freeSpace) { //If within bound and on free spaces, place the ship
        boatTiles.forEach(boatTile => {
            boatTile.classList.add(`${boat.name}-design`)
            boatTile.classList.add('taken')
        })
    } else { //if not, run function again
        placeBoat(boat)
    }

}
boats.forEach(boat => placeBoat(boat))


//User dragging and dropping boats
//const Array.from(selectContain.children)


