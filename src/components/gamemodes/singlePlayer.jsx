// TEAM : Group E
// PROJ : CMSC 447
// DESC : This will be the main singleplayer component for our game. This can either be created
// by loading from the database, or by creating a new game starting at level 0.

// Import Statements
import React from "react";
import GameBoard from "../board/board";

class SingleplayerGame extends React.Component {
    
    // Load a player from the Database -> uses a PID
    loadFromPlayer(PID){
        //GameBoard.difficulty = PID.difficulty;    
    }

    // Makes a new player -> Prompts the names
    MakeNewPlayer(){

    }
    
    // A render function for the 
    render() {
        return(
            <body>
                <h1>THERE IS SUPPOSED TO BE A GAME HERE</h1>
                <table>
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td><GameBoard difficulty = {1}/></td>
                                </tr>
                            </table>
                        </td>
                        <td >
                            <table>
                                <tr>
                                    <td>AI</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        );
    }
}

export default SingleplayerGame


