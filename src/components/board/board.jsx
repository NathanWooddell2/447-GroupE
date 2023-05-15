// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This will be the board component for our extreme battleship game. This board component
// will be made up of a two-dimensional array of boardtile components. These tile components will
// track data about their state and the state of the items within them.

// --- IMPORT STATEMENT BLOCK --- 
import React from 'react';
import BoardTile from './tile';

function GameBoard(props) {
    // Some Variables applicable to the board
    var difficulty = props.difficulty;                             // Board Difficulty
    var owner;                                  // Board Owner
    var xValue;                                 // Board Size
    var ships = [false, false, false, false, false];
    var gameGrid = [];

    // A function to determine some statistics about the board
    function getBoardSize(diff){
        if(diff === 1){
            xValue = 8;
            return;
        }else if(diff === 2){
            xValue = 10;
            return;
        }else{
            xValue = 12;
            return;
        }
    }
    

    // Function to place the ships on the board - will require the ship class
    function placeShip(x,y,ship,heading){
        console.log(x);
        console.log(y);
        console.log(ship);
        console.log(heading);
        console.log(gameGrid[x][y]);
        return;
    }


    // Render the board based on a variety of factors - size will need to be determined by player
    function buildBoard () {
        // Determine board size using helpers
        getBoardSize(difficulty);
        
    // Create a board of size x
        
        var gameRow = [];
        let tileID = 0;

        for (let row = 0; row < xValue; row++){
            for (let col = 0; col < xValue; col++){
                // This will need to be updated to reflect the tile class.
                gameRow.push(
                    {
                        tile: <BoardTile player={props.player} ships={ships} key={tileID} row={row} col={col} placeShip={placeShip}/>,
                        rowNum: row,
                        colNum: col,
                        id: tileID,
                        ship: null
                    });
                tileID++;
            }
            //gameRow.push('\n');
            gameGrid.push(gameRow);
            gameRow = [];
        }

    // The board to be rendered
        return(
            <div className='Board'>
                {gameGrid.map((row) =>
                    <div>
                        {
                            row.map
                            (
                                (col) => 
                                    <td id={col.id} key={col.id} x={row.column} y={row.rowNum}>
                                        {col.tile}
                                    </td>
                            )
                        }
                    </div>
                )}
                <button onClick = {() => console.log({gameGrid}) }>Grid dump</button>
            </div>
        );
    };    
    return(buildBoard());
}

export default GameBoard;