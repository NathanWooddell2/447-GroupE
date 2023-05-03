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


export default function MainMenu(){
    const [state, setState] = useState('start')

    return(
        <div className="Menu-Header">

            <header className="Menu-Title">
                EXTREME BATTLESHIP
            </header>
            <table className="Menu-Buttons">
                <tbody>
                    <tr >
                        <td className="Menu-Button">
                            {state === 'start' && (
                                <button className="Menu-Button" onClick = {() => setState('singlePlayer')}>Singleplayer</button>
                            )}
                            {state === 'singlePlayer' && <SinglePlayer />}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {state === 'start' && (
                                <button className="Menu-Button" onClick = {() => setState('loadGame')}>Load Game</button>
                            )}
                            {state ==='loadGame' && <LoadGame />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {state === 'start' && (
                                <button className="Menu-Button" onClick = {() => setState('multiPlayer')}>Multiplayer</button>
                            )}
                            {state === 'multiplayer' && <MultiPlayer />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {state === "start" && (
                                <button className="Menu-Button" onClick = {() => setState('scoreBoard')}>Scoreboard</button>
                            )}
                            {state === 'scores' && <ScoreBoard />}
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
    );
}
