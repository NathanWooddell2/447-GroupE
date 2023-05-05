// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This file holds the definition for the board tile component, these board tile will
// contain the data referring to every individual tile in the overall board.

// Import statement
import React from 'react';
import ReactDOM from 'react-dom';
const red = "#FF0000";
const orange = "#FFD712";


// General Tile Component
class board_Tile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: null,
            value: null,
        };
        this.changeColor = this.changeColor.bind(this)
    }
    // Variable Definitions
    has_ship;
    attacked;
    owner;

    changeColor(){
        this.setState({color: red})
    }
    // Render Function
    render() {
        if (this.has_ship === true){
            return(
                <button className = 'tile' 

                onClick={() => this.setState({value: 'Y'})}>
                    {this.state.value}
                </button>
            )
        }else{
            return(
                <button className = 'tile' 
                onClick={() => this.setState({value: 'X'})}>
                    {this.state.value}
                </button>
            )
        }
    }
}

export default board_Tile;