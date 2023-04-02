// TEAM : GROUP E
// PROJ : CMSC 447 - Sprint 2
// DESC : This will be the main code for our battleship game, here we should have
// class definitions for all game actors, and their respective methods. This file
// should also contain the scripts and code that we will use to run the game.

// --- CLASS DEFINITIONS ---

/* Tile Class
The tile class is the basic building block of the board. Most of the values of this
class are set without input from the constructor. These values will be updated through
the course of the game, using the class's methods. */
class Tile{
    // Standard Class Constructor
    constructor(sprite){
        this.sprite = sprite;                           // needs to be assigned correctly
        this.struck = false;                            // denotes whether the tile has been struck
        this.has_ship = false;                          // denotes whether there is a ship on this tile
        this.ship_p = null;                             // Pointer to the ship in the tile (if any)
    }
    // Hit Tile Method                                  // Will need to check a million things
}

/* Board Class
The size of the boad class is directly tied to the level difficulty. The board class will
consist of a 2d array of some square size. This 2d array will contain objects of type Tile
and will be called to be drawn in HTML */
class Board{
    // Standard Class Constructor
    constructor(difficulty){
        this.difficulty = difficulty;                   // The Difficulty value for the level
        this.size = size;                               // Currently hardcoded until the getter is done.
        this.owner = null;                              // The owner of the board / who can see it.
    }
    // Getter for board size -> used in constructor
    // Method to populate board
    // Method to generate the board in userspace
}

/* Ship Class
This class defines a ship, and all of the necessary components, the ship should act as a 
doubly linked list that knows the overall condition of it's components. The ship class itself
will track the head and tail of its self, aswell as it's overall length, and location on the board. */
class Ship{
    // Standard Class Constructor
    constructor(length){
        this.length = length;                           // The overall length of the ship
        this.next = null;                               // The next segment of the ship
        this.prev = null;                               // The previous segment of the ship
        this.fore = null;                               // The front of the ship
        this.aft = null;                                // The rear of the ship
        this.heading = null;                            // The direction the ship is facing
        this.hit = false;                               // whether this segment has been hit yet
        this.destroyed = false;                         // changed when all segments are hit
        this.drawn = false;                             // * MAY NOT BE NEEDED -> HERE SO I DONT FORGET
    }
    // Heading change method
    // Place ship method
    // Check for destroyed ship
}

/* Weapon Class
This class contains all information on each type of weapon. I may reimplement this class to
use inheritance for different types of weapons. For example, a Strafing run would have different
features than a standard attack. */
class Weapon{
    // Standard Class Constructor
    constructor(){

    }
}

/* Player Class 
This class contains all of the information on a given player. This should have functions to track
player hits, and the number of ships/segments that the player has left. This should also track the
players accuracy and current level, and be able to save this data into a .json file.*/
class Player{
    // Standard Class Constructor
    constructor(difficulty, p_name){
        this.level = difficulty;
        this.name = p_name;
        this.streak = 0;
        this.hits = 0;
        this.misses = 0;                                 // Hit counter (Elijah)
        this.current_player_data = '';
        
    }

    player_hits(Weapon){
        //Elijah
        //How to track  player hit?
        //references the board list
        //everytime a player takes shot
        //indexing through the board list
            //check to see if a ship exists where shot was taken 
            //if not considered a miss
            //if there is a ship, it's a hit
                //increment the hits total
        
        const tile = new Tile();
        const game = new Game();
        if (game.shot()){
            if (tile.get_ship(location)){ // checking if a ship exists where player shot
                this.hits++;
            }else{
                this.misses++;
                //considered miss
            }
        }
         
    }

    segment_left(){
        //How to see how much of battleship is left?
        //If player landed a hit on their turn
            // start at location where hit was landed 
            //while ref node isnt null 
                //increment count variable
                //move the current pointer
        const tile = new Tile();
        const ship = new Ship();
        var temp = tile.get_ship(location);          //ref ship pointer
        var count = 0;
        while (temp != null){
            count++;
            temp = ship.get_next();
        }
        return count;
    }

    save_player(){
        //ID    Name    Level   Accuracy
        //writing attributes to JSON file
        var accuracy = this.hits / this.misses //accuracy
        const fs = require("fs");
        const client = {
            "Name": this.name,
            "Level": this.level,
            "Accuracy": accuracy
        }

        const data = JSON.stringify(client);
        fs.writeFile("./playerInfo.json", data, err=>{
            //testing
            if (err){
                console.log("Error writing to file", err)
            }else{
                console.log("Written to JSON successfully")
            }
        })
        
    }

    load_player(){
        //Elijah
    }

    attack(){
        //Elijah
    }

}

// --- FUNCTION DEFINITIONS ---