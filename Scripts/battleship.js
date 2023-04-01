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
    constructor(){
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
        this.size = 8;                                  // Currently hardcoded until the getter is done.
        this.owner = null;                              // The owner of the board / who can see it.
        this.visible = true;                            // Toggle the visibility of the board to the player
    }
    // Board size generation method.
    gen_size(){
        if(this.difficulty == 1){
            this.size = 8;
        }else if(this.difficulty == 2){
            this.size = 10;
        }else{
            this.size = 12;
        }
        return;
    }
    // Method to populate board
    // Method to generate the board in userspace?
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
    constructor(name, length, streak_req){
        this.name = name;
        this.streak_req = streak_req;
        this.length = length;
    }
}

/* Player Class 
This class contains all of the information on a given player. This should have functions to track
player hits, and the number of ships/segments that the player has left. This should also track the
players accuracy and current level, and be able to save this data into a .json file.*/
class Player{
    // Standard Class Constructor
    constructor(difficulty){
        this.level = difficulty;
        this.streak = 0;
    }
}

/* Bot Class
This class contains all of the information about the bot, including it's methods to attack, and
determine the  
*/
class bot{
    // Standard Class Constructor
    constructor(difficulty, name){
        this.level = difficulty;                        // Tracks the difficulty of the bot
        this.name = name;                               // Serves as a name for the bot, for flavor
    }
    // Bot attack method
    bot_attack(difficulty){

    }
}

/* Game Class
This class contains all of the information about the game, and the functions to keep the game running
in this class there will need to be methods to run the game, and there will likely be a class that
inherits from this class to represent a player vs player game as opposed to the standard player vs CPU
game. */
class Game{
    // Standard Class Constructor
    constructor(){
        this.Player = Player();                   // Creates a new non-bot player
        this.Bot = Bot();                         // Creates a new bot
        this.Mp_Player = null;                       // Used in the case of a Multiplayer game
    }
    // Main game loop
    // Game over handling
    // 
}

// --- FUNCTION DEFINITIONS ---