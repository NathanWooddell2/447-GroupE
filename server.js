const express = require('express')
const path = require('path')
const http = require('http')
const port = process.env.PORT || 3000
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)


//Static folder is set
app.use(express.static(path.join(__dirname, "public")))


//Server starting
server.listen(port, () => console.log(`Server running on port ${port}`))

//Handling socket connection request from client web server
const connect = [null, null]
 
io.on(`connection`, socket => {
    console.log('New Web Server Connection')

    //Search for needed players
    let userList = -1;
    for (const i in connect) {
        if (connect[i] === null) {
            userList = i
            break
        }
    }
      
    //Let the user know their player number
    socket.emit('player', userList)

    console.log(`Player ${userList} joined the server`)

    //Dont look at the 3rd user
    if (userList === -1) {
        return
    }
     
    connect[userList] = false

    //Tell the users what player has connected to the server
    socket.broadcast.emit('player-connection', userList)

    //Player leaves the server
    socket.on('disconnect', () => {
        console.log(`Player ${userList} left the server`)
        connect[userList] = null
        //Let user's know what player left the server
        socket.broadcast.emit('player-connection', userList)
    })

    //Set On
    socket.on('user-set', () => {
        socket.broadcast.emit('enemy-set', userList)
        connect[userList] = true

    })

    //Status of other users
    socket.on('user-status', () => {
        const users = []
        for (const i in connect) {
            if (connect[i] === null) {
                users.push({ connect: false, set: false })
            } else {
                users.push({connect: true, set: connect[i]})
            }
             
        }
        socket.emit('user-status', users)
    })

    //On attacking
    socket.on('attack', id => {
        console.log(`Shot fired from ${userList}`, id)

        socket.broadcast.emit('attack', id)
    })

    //On attack respond
    socket.on('attack-responce', tile => {
        console.log(tile)

        //Send responce to other user
        socket.broadcast.emit('attack-responce', tile)
    })

    //Pause the connection of the server
    setTimeout(() => {
        connect[userList] = null
        socket.emit('pause')
        socket.disconnect()
    }, 600000) //10 minutes per user so they have fair time
})


  

//'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
