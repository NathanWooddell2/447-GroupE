// TEAM : Group E
// PROJ : CMSC 447
// DESC : This class will handle displaying a scoreboard.

import React, {useState, useEffect} from 'react'
import APIService from '../APIService'


function ScoreBoard(){
    const [data, setData] = useState([{
        name: "",
        level: "",
        accuracy: "",
        id: "",
    }])

    const scores = 
    {
        "data": 
            [
                {
                    "Group":"E",
                    "Title":"Top Five Scores",
                    "KikiDuverre":"100",
                    "ChiaPoppybottom":"97",
                    "ValUndal":"92",
                    "LucyWeissdottir":"83",
                    "AstraUndal":"65"
                }
            ]
        }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/getAll', {
          'method':'GET',
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => resp.json())
        .then(resp => setData(resp))
        
        .catch(error => console.log(error))
      }, [])

    const submitData = (data) => {
        APIService.scoresAPIFunction(scores)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

    /*<tr>
        <button onClick = {() => submitData(data)}> Submit Data</button>
    </tr>
    console.log(data);*/
    return(
        <body>
            
            <table>
                <thead>
                    
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            Highest Level Reached
                        </td>
                        <td>
                            Accuracy Achieved
                        </td>
                        <td>
                            ID
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {true && data.map( (player) => {
                        return (
                            <tr key = {player.id}>
                                <td>
                                    {player.name}
                                </td>
                                <td>
                                    {player.level}
                                </td>
                                <td>
                                    {player.accuracy}
                                </td>
                                <td>
                                    {player.id}
                                </td>
                            </tr>
                        )
                    })}    
                </tbody>
            </table>
        </body>
    )
}

export default ScoreBoard