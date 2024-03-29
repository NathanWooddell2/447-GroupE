// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This file holds the definition for the board tile component, these board tile will
// contain the data referring to every individual tile in the overall board.

// Import statement
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';
const red = "#FF0000";
const orange = "#FFD712";


// General Tile Component
function Board_Tile(props){
    /*constructor(props){
        super(props);
        this.state = {
            color: null,
            value: null,
        };
        this.changeColor = this.changeColor.bind(this)
    }*/
    // Variable Definitions
    var has_ship = false;
    var attacked = false;
    var owner;

    function changeColor(){
        this.setState({color: red})
    }
    // Render Function
    function buildTile(){
        if(props.player==="PC"){
            return(
                <Popup trigger= 
                    {<button className = 'tile'></button>}
                    position="right center">
                    {
                        close => (
                            <div>
                                <div className='content'>
                                    Select your ship type for this tile.
                                </div>
                                <div>
                                    <button onClick= 
                                        {() => close()}>
                                            Select.
                                    </button>
                                </div>
                            </div>
                        )
                    }    
                </Popup>
            );
        }
        else{
            return(
                <button className = 'tile'>
                </button>
            )
        }
    }

    return (buildTile());
}

export default Board_Tile;

/*if (this.has_ship === true){
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
        }*/