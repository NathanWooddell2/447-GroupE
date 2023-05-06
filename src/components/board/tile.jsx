// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This file holds the definition for the board tile component, these board tile will
// contain the data referring to every individual tile in the overall board.

// Import statement
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import Popup from 'reactjs-popup';
import battleshipHorzHead from "../../shipImages/Battleship/BattleshipHorizHead.png"
const red = "#FF0000";
const orange = "#FFD712";


// General Tile Component
function Board_Tile(props){
    const [state, setState] = useState('empty');
    const [color, setColor] = useState(0);
    const [value, setValue] = useState(0); 
    
    // Variable Definitions
    var ships = props.ships;
    var has_ship = false;
    var attacked = false;
    var owner;
    var heading = "horz";


    function changeColor(){
        setState({color: red})
    }

    function onHeadingChange(e){
            heading = e.currentTarget.value;
    }

    // Render Function
    function buildTile(){
        if(props.player==="PC"){
            
            return(
                <Popup trigger= 
                    {<button className = 'tile'>
                        {(state.value === "Battleship" && heading === "horz") && <img src={battleshipHorzHead} />}
                    
                    </button>}
                    position="right center">
                    {
                        close => (
                            <div>
                                <div className='content'>
                                    Select your ship type for this tile.
                                </div>
                                <div>
                                    <label>Select Orientation&nbsp;</label>
                                    <label>Horizontal:</label>
                                    <input type="radio" id="horz" name="heading" value="horz" checked="true" onChange={onHeadingChange}/>
                                    <label>Vertical</label>
                                    <input type="radio" id="vert" name="heading" value="vert" onChange={onHeadingChange}/>
                                    <li>
                                        <button id="Battleship" onClick={() => {
                                            pickShip("Battleship", {heading}); 
                                            close(); }
                                        }>Battleship</button>
                                    </li>
                                    <li>
                                        <button id="Carrier" onClick={() => {
                                            pickShip("Carrier", {heading}); 
                                            close(); }
                                        }>Carrier</button>
                                    </li>
                                    <li>
                                        <button id="Cruiser" onClick={() => {
                                            pickShip("Cruiser", {heading}); 
                                            close(); }
                                        }>Cruiser</button>
                                    </li>
                                </div>
                                <div>
                                    <button onClick= 
                                        {() => close()}>
                                            Close.
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
                    {state.value}
                </button>
            )
        }
    }

    function pickShip(ship, heading){
        //close();
        console.log(ship);
        console.log(heading);
        //console.log(document.getElementById(ship));
        setState({value: ship});
        //setState
        if(ship === "Battleship" && ships[0] == true){
            console.log("Battleship already placed");
        }
        else if(ship === "Carrier" && ships[1] == true){
            console.log("Carrier already placed.");
        }
        //else if
        if(ship === "Carrier"){
            ships[0] = true;
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