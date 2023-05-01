// TEAM : Group E
// PROJ : CMSC 447 - Extreme BattleShip
// DESC : This will serve as our game's main menu. From here you will be able to launch new games,
// load old games, create multiplayer games, and view the scoreboard.

import React from "react";
import { useState } from "react";

export default function MainMenu(){
    const [state, setState] = useState('start')

    return(
        <div className="Menu-Header">

            <header className="Menu-Title">
                EXTREME BATTLESHIP
            </header>
            <table className="Menu-Buttons">

                {state === 'start' && (
                    <button className="Menu-Button" playGame={() => setState('singlePlayer')}>Singleplayer</button>
                )}
                {state === 'singlePlayer' && <singlePlayer />}

    
                {state === 'start' && (
                    <button className="Menu-Button" loadGame = {() => setState('loadGame')}>Load Game</button>
                )}
                {state ==='loadGame' && <loadGame />}


                {state === 'start' && (
                    <button className="Menu-Button" multiPlayer = {() => setState('multiPlayer')}>Multiplayer</button>
                )}
                {state === 'multiplayer' && <multiPlayer />}


                {state === "start" && (
                    <button className="Menu-Button" scoreBoard = {() => setState('scoreBoard')}>Scoreboard</button>
                )}
                {state === 'scores' && <scoreBoard />}

                     
            </table>
        </div>
    );
}
