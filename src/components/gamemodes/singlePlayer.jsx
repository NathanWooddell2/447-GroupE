// TEAM : Group E
// PROJ : CMSC 447
// DESC : This will be the main singleplayer component for our game. This can either be created
// by loading from the database, or by creating a new game starting at level 0.

// Import Statements
import React from "react";
import GameBoard from "../board/board";
import AppDifficulty from "../appDifficulty";

function SingleplayerGame(props) {
    //AppDifficulty.difficulty = props.difficulty;
    var difficulty = AppDifficulty.difficulty;

    return(
        <body>
            <h1>THERE IS SUPPOSED TO BE A GAME HERE {props.difficulty}</h1>
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td className="playerBoard"><GameBoard difficulty = {props.difficulty}/></td>
                            </tr>
                        </table>
                    </td>
                    <td >
                        <table>
                            <tr>
                                <td className="AIBoard"><GameBoard difficulty = {props.difficulty}/></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    );
}

export default SingleplayerGame

