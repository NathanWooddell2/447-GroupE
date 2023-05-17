// TEAM : Group E
// PROJ : CMSC 447
// DESC : This class will handle loading the player from the database.

import React, {useState, useEffect} from "react";
import APIService from '../APIService'
import AppDifficulty from "../appDifficulty";

function LoadPlayer() {
    var difficulty = AppDifficulty.difficulty;
    var id, [state, setState] = useState('loadGame')
    
    const updateID = (e) => {
        id = e.target.value
    }

    const retrievePlayerInfo = async (e) => {
        var diff = await APIService.retrievePlayer(id);
        ///.then(res => res.json())
        //.then(res => diff = res)
        console.log(diff.level);
        AppDifficulty.difficulty = diff.level;
        setState('success');
    }   

    return(
        <div>
            <p>Please enter your ID Number in order to load your highest achieved difficulty.</p>
            <form>
                <label>ID Number:</label>
                <input type="text" placeholder="ID Number" id="IDNumber" name="IDNumber" value={id} onChange={updateID}/>
                <input type="button" value="Load" onClick={(e) => retrievePlayerInfo()}></input>
            </form>
            {state === 'success' && 
                <div>Loading was a success, please return to the menu and select Single Player to begin your game.</div>
            }
        </div>
    )
}

export default LoadPlayer