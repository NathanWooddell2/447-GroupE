// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This file holds the definition for the board tile component, these board tile will
// contain the data referring to every individual tile in the overall board.

// Import statement
import React from 'react';


// General Tile Component
class board_Tile extends React.Component {
    // Variable Definitions
    has_ship;
    attacked;
    owner;

    // Render Function
    render() {
        return(
            <button className = 'tile'>
                {this.props.value}
            </button>
        )
    }
}

export default board_Tile;