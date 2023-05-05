// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This will be the board component for our extreme battleship game. This board component
// will be made up of a two-dimensional array of boardtile components. These tile components will
// track data about their state and the state of the items within them.

// --- IMPORT STATEMENT BLOCK --- 
import React from 'react';
import Board_Tile from './tile';
//var difficulty = 1;

class gameBoard extends React.Component {
    // Some Variables applicable to the board
    difficulty = this.props.difficulty;                             // Board Difficulty
    owner;                                  // Board Owner
    xValue;                                 // Board Size


    // A function to determine some statistics about the board
    getBoardSize(diff){
        if(diff === 1){
            this.xValue = 8;
            return;
        }else if(diff === 2){
            this.xValue = 10;
            return;
        }else{
            this.xValue = 12;
            return;
        }
    }
    

    // Function to place the ships on the board - will require the ship class
    placeShip(x,y){
        return
    }


    // A function to determine what a tile will display
    renderTile () {
        if(this.owner === "PLAYER"){
            // RENDER VIEW FOR PLAYER BOARD
        }else{
            // RENDER VIEW FOR COMPUTER BOARD
        }
    }


    // Render the board based on a variety of factors - size will need to be determined by player
    render () {
        // Determine board size using helpers
        this.getBoardSize(this.difficulty);
        
    // Create a board of size x
        let gameGrid = [];
        var gameRow = [];
        let tileID = 0;

        for (let row = 0; row < this.xValue; row++){
            for (let col = 0; col < this.xValue; col++){
                // This will need to be updated to reflect the tile class.
                gameRow.push(
                    {
                        tile: <Board_Tile key={tileID}/>,
                        row: row,
                        column: col,
                        id: tileID
                    });
                tileID++;
            }
            gameRow.push('\n');
            gameGrid.push(gameRow);
            gameRow = [];
            
        }
        const gameStuff = gameGrid;
        let board = Array(this.xValue+1).fill("0\n");

    // The board to be rendered
        return(
            <div className='Board'>
                {gameStuff.map((row) =>
                    <div>
                        {
                            row.map
                            (
                                (col) => 
                                    <td key={col.id}>
                                        {col.tile}
                                    </td>
                            )
                        }
                    </div>
                )}
            </div>
        );
    };    
}

export default gameBoard;