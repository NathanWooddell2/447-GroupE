// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This file holds the definition for the board tile component, these board tile will
// contain the data referring to every individual tile in the overall board.

// Import statement
import React from 'react';
import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import battleshipHorzHead from "../../shipImages/Battleship/BattleshipHorizHead.png"
//const red = "#FF0000";
//const orange = "#FFD712";


// General Tile Component
function BoardTile(props){
    const [state, setState] = useState('empty');
    const [color, setColor] = useState(0);
    const [value, setValue] = useState(0);
    
    // Variable Definitions
    var ships = props.ships;
    var has_ship = false;
    var attacked = false;
    var heading = "horz"; 

    function forceUpdate(){
        setState(prev => {
            return {...prev}
        })
    }

    useEffect(() => {
        console.log("Rerender");
    })

    function onHeadingChange(e){
            heading = e.currentTarget.value;
    }

    // Render Function
    function buildTile(){
        if(props.player==="PC"){
            
            return(
                <Popup trigger= 
                    {<button className = 'tile'>{value}</button>}

                    position="right center">
                    {
                        close => (
                            <div className = "place-menu">
                                <div className='content'>
                                    Please Select a Ship:
                                </div>
                                <div>
                                    <label>Select Ship Direction:&nbsp;</label>
                                    <br></br>
                                    <label>Horizontal <input type="radio" id="horz" name="heading" value="horz" checked="true" onChange={onHeadingChange}/></label>
                                    <br></br>
                                    <label>Vertical <input type="radio" id="vert" name="heading" value="vert" onChange={onHeadingChange}/></label>
                                    <br></br>

                                    <button className = "ship-button" id="Battleship" onClick={() => {
                                        pickShip("Battleship", {heading}); 
                                        //forceUpdate();
                                        close(); }
                                    }>Battleship</button>
                                    <button className = "ship-button" id="Carrier" onClick={() => {
                                        pickShip("Carrier", {heading}); 
                                        close(); }
                                    }>Carrier</button>
                                    <button className = "ship-button" id="Cruiser" onClick={() => {
                                        pickShip("Cruiser", {heading}); 
                                        close(); }
                                    }>Cruiser</button>
                                     <button className="ship-button" id= "Submarine" onClick={() => {
                                        pickShip("Submarine", {heading});
                                        close(); }
                                    }>Submarine</button>
                                    <button className="ship-button" id= "Destroyer" onClick={() => {
                                        pickShip("Destroyer", {heading});
                                        close(); }
                                    }>Destroyer</button>
                                </div>
                                <div>
                                    <button className = "ship-button" onClick= 
                                        {() => close()}>
                                            Close
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

    function pickShip(ship, heading){
        //close();
        console.log(ship);
        console.log(heading);

        // Check if the ship exists
        if(has_ship === true){
            console.log("Cannot Place Ship Here - Ship Already There");
            return;
        }
        //console.log(document.getElementById(ship));
        //setState(value);
        console.log(value);
        //setState
        switch(ship) {

            case "Battleship":
                if(ships[0] === true){
                    console.log("Battleship already placed");
                    return;
                }else{
                    ships[0] = true;
                    has_ship = true;
                    setValue(ship);
                    // Iterative Placement based on len and orientation
                    break;
                }

            case "Carrier":
                if(ships[1] === true){
                    console.log("Carrier already placed");
                    return;
                }else{
                    ships[1] = true;
                    has_ship = true;
                    setValue(ship);
                    // Iterative Placement based on len and orientation
                    break;
                }

            case "Cruiser":
                if(ships[2] === true){
                    console.log("Cruiser already placed");
                    return;
                }else{
                    ships[2] = true;
                    has_ship = true;
                    setValue(ship);
                    // Iterative Placement based on len and orientation
                    break;
                }

            case "Submarine":
                if(ships[3] === true){
                    console.log("Submarine already placed");
                    return;
                }else{
                    ships[3] = true;
                    has_ship = true;
                    setValue(ship);
                    // Iterative Placement based on len and orientation
                    break;
                }

            case "Destroyer":
                if(ships[4] === true){
                    console.log("Destroyer already placed");
                    return;
                }else{
                    ships[4] = true;
                    has_ship = true;
                    setValue(ship);
                    // Iterative Placement based on len and orientation
                    break;
                }
        }
    }

    return (buildTile());
}

export default BoardTile;

//{(state.value === "Battleship" && heading === "horz") && <img src={battleshipHorzHead} />}