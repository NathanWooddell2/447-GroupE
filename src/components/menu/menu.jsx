// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This will serve as our game's main menu. From here you will be able to launch new games,
// load old games, create multiplayer games, and view the scoreboard.

import React from "react";
import { useState } from "react";
import SinglePlayer from '../gamemodes/singlePlayer';
import MultiPlayer from '../gamemodes/multiPlayer';
import LoadGame from '../loaders/loadPlayer';
import ScoreBoard from '../loaders/scoreBoard';
import AppDifficulty from '../appDifficulty';


export default function MainMenu(){
    const [state, setState] = useState('start');
    var difficulty = AppDifficulty.difficulty;

    return(
        <div className="Menu-Header">

            <header className="Menu-Title">
                EXTREME BATTLESHIP
            </header>
            
                    {state !== 'start' && (
                        <button className="Main-Menu-BTN" onClick = {() => setState('start')}>Main Menu</button>
                    )}

            <table className="Menu-Buttons">
                   
                    {state === 'start' && (
                        <button className="Menu-Button" onClick = {() => setState('singlePlayer')}>Singleplayer</button>
                    )}
                            
                    {state === 'start' && (
                        <button className="Menu-Button" onClick = {() => setState('loadGame')}>Load Game</button>
                    )}
                            
                    {state === 'start' && (
                        <button className="Menu-Button" onClick = {() => AppDifficulty.difficulty=1}>Reset Game</button>
                    )}

                    {state === 'start' && (
                        <button className="Menu-Button" onClick = {() => setState('multiPlayer')}>Multiplayer</button>
                    )}

                    {state === "start" && (
                        <button className="Menu-Button" onClick = {() => setState('scoreBoard')}>Scoreboard</button>
                    )}    
                        <tr>
                            {state === 'singlePlayer' && <SinglePlayer difficulty = {difficulty || 1}/>}
                            {state === 'multiplayer' && <MultiPlayer />}
                            {state ==='loadGame' && <LoadGame difficulty = {difficulty}/>}
                            {state === 'scoreBoard' && <ScoreBoard />}
                        </tr>  
            </table>
        </div>
    );
}
