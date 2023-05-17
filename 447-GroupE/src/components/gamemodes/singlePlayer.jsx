// TEAM : Group E
// PROJ : CMSC 447
// DESC : This will be the main singleplayer component for our game. This can either be created
// by loading from the database, or by creating a new game starting at level 0.

// Import Statements
import React from "react";
import GameBoard from "../board/board";
import AppDifficulty from "../appDifficulty";
//import GameLoop from "GameLoop";

function SingleplayerGame(props) {
    //AppDifficulty.difficulty = props.difficulty;
    var difficulty = AppDifficulty.difficulty;
    


    function gameLoop(){

    }
    



    return(
        <body>
            <h1>THERE IS SUPPOSED TO BE A GAME HERE {props.difficulty}</h1>
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td className="playerBoard"><GameBoard difficulty = {props.difficulty} player = "PC"/></td>
                            </tr>
                        </table>
                    </td>
                    <td >
                        <table>
                            <tr>
                                <td className="AIBoard"><GameBoard difficulty = {props.difficulty} player = "AI"/></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div id="boards-contain">
                <div class="select-contain">
                    <div id="0" className="battleship battleship-design" draggable="true"></div>
                    <div id="1" className="carrier carrier-design" draggable="true"></div>
                    <div id="2" className="cruiser cruiser-design" draggable="true"></div>
                    <div id="3" className="destroyer destroyer-design" draggable="true"></div>
                    <div id="4" className="patrol patrol-design" draggable="true"></div>
                    <div id="5" className="rescue rescue-design" draggable="true"></div>
                    <div id="6" className="submarine submarine-design" draggable="true"></div>
                </div>
            </div>

        </body>
    );
}

export default SingleplayerGame

