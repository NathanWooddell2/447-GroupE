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
    constructor(bot){
        this.bot = bot;                                 // Whether this player is a bot
        
    }
}

// --- FUNCTION DEFINITIONS ---