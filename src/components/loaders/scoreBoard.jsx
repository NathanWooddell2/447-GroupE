// TEAM : Group E
// PROJ : CMSC 447
// DESC : This class will handle displaying a scoreboard.

import React, {useState, useEffect} from 'react'
import APIService from '../APIService'


function ScoreBoard(){
    const [data, setData] = useState([{}])

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
                    {data.map(player => {
                        return (
                            <tr key = {player.id}>
                                <td>
                                    {player.name}
                                </td>
                                <td>
                                    {player.level}
                                </td>
                                <td>
                                    {player.accuracy * 100}
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