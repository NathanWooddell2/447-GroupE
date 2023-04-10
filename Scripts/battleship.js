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
        this.sprite = sprite;                                           // needs to be assigned correctly
        this.struck = false;                                            // denotes whether the tile has been struck
        this.has_ship = false;                                          // denotes whether there is a ship on this tile

        this.ship_p = null;                                             // Pointer to the ship in the tile (if any)
        this.arr_part = null;                                           // Index of tile in ship array (if any) -- MUST BE INT
    }

    // Hit Tile Method                               
    Do_Hit(){
        // Check whether this tile has been hit before;
        if (this.struck == true){
            return;
        }

        // Check to see if there is a ship on the tile
        if(this.has_ship){
            this.struck = false;
            this.ship_p.inflict_wounds(this.arr_part);
        }else{
            this.struck = true;
            // Change the sprite -- May be a HTML Thing idk
        }
    }

    // Associate a ship with the tile -- Will be included in the ship placement function
    Associate_Ship(){
        // Currently not sure how to implement... will make an adendum.
    }
}

/* Board Class
The size of the boad class is directly tied to the level difficulty. The board class will
consist of a 2d array of some square size. This 2d array will contain objects of type Tile
and will be called to be drawn in HTML */
class Board{
    // Standard Class Constructor
    constructor(difficulty){
        this.difficulty = difficulty;                                   // The Difficulty value for the level
        this.size = gen_size(difficulty);                               // Refer to the function below
        this.owner = null;                                              // The owner of the board / who can see it.
        this.Body[size][size];                                          // The main body of the board
    }

    // Setter for the board's owner
    set owner(player){
        this.owner = player;
    }

    // Board Size Determination Method
    gen_size(){
        if(this.difficulty == 1){
            return 8;
        }else if(this.difficulty == 2){
            return 10;
        }else{
            return 12;
        }
    }

    // Fill the board with tile objects.
    fill_board(){
        for(let i = 0; i<this.size; i++){
            for(let j = 0; j<this.size; j++){
                this.Body[i][j] = new Tile();
            }
        }
    }
}

/* Ship Class
This class is meant to represent the data for a ship. The ship consists of an array of bool values for each tile.
The ship also tracks it's visibility, the max and current health of the ship, the length of the ship and the ship's
owner. */
class Ship{
    // Standard Class Constructor
    constructor(owner, length){
        this.P_Owner = owner;                                           // The player class which owns the ship object
        this.s_len = length;                                            // The length of the ship array.
        this.ship_arr[length];                                          // An array to store the ship tile data.
        this.heading = false;                                           // True for horizontal false for vertical.
        this.visible = false;                                           // Determine whether the ship is being drawn
        this.Max_health = length;                                       // The Maximum health of the ship
        this.Cur_health = length;                                       // decremented as the ship is hit
    }

    // Add data to the ship array, should all start as bool false
    initialize_ship(){
        for(let i = 0; i < length; i++){
            this.ship_arr[i] = false;
        }
    }

    // Actually inflict the damage to the ship -- called by the 
    inflict_wounds(position){
        this.ship_arr[position] = true;
        this.Cur_health--;
        if(this.Cur_health == 0){
            this.visible = true;
        }
    }
}

/* Weapon Class
This class contains all information on each type of weapon. I may reimplement this class to
use inheritance for different types of weapons. For example, a Strafing run would have different
features than a standard attack. */
class Weapon{
    // Standard Class Constructor
    constructor(name, streak, extend){
        this.streak_req = streak;                                       // The Streak required to use the weapon
        this.extends_streak = extend;                                   // Does the weapon extend the streak?
        this.wep_name = name;                                           // The name of the weapon
    }

    // Attack With the weapon
}

/* Player Class 
This class contains all of the information on a given player. This should have functions to track
player hits, and the number of ships/segments that the player has left. This should also track the
players accuracy and current level, and be able to save this data into a .json file.*/
class Player{
    // Standard Class Constructor
    constructor(difficulty, p_name){
        this.level = difficulty;                                        // The current level the player is on
        this.name = p_name;                                             // The player's name
        this.streak = 0;                                                // The player's current scorestreak
        this.shots = 0;                                                 // Total attacks made by the player
        this.hits = 0;                                                  // Total hits made by the player
        this.current_player_data = '';
        
    }

    // Make a player Attack - passed a tile object
    attack(TILE){
        if(TILE.has_ship == true){
            // Player Stat Tracking
            this.shots++;
            this.hits++;
            // Apply the damage to TILE.p_ship;
        }else{
            this.shots++;
        }
    }

    // I THINK THIS MAY BE MISPLACED I WILL REFACTOR THIS AND EDIT IT -- Nathan
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
        const game = new SPGame();
        if (game.shot()){
            if (tile.get_ship(location)){ // checking if a ship exists where player shot
                this.hits++;
            }else{
                this.misses++;
                //considered miss
            }
        }
         
    }

    // Saves a Player to a JSON file.
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

    // Load a Player from JSON
    load_player(){
        //Elijah
    }
}

/* class SPGame
This class contains all information about the game. It will include methods to generate the number of ships,
to generate the difficulty, and to create players attached to the game. Most importantly the game includes a
main_loop() function which handles turns.
*/
class SPGame{
    // Standard Class Constructor
    constructor(name){
        this.player = Player(1, name);                                  // The player class
        this.bot = Bot();                                               // A game bot
        this.Pships1[5];                                                // Player Ships
        this.Bships[5];                                                 // Bot Ships
    }

    // Main game loop method
    main_loop(){
        // Run the main game loop
    }

    // generate a singleplayer game from a player object
    Create_From_Player(LPlayer){
        // generate a player from a player ID
        this.player = LPlayer;                                          // A player loaded through the player load method.
        this.bot = Bot();                                               // My bot class disapeared...
    }
    
}
// --- FUNCTION DEFINITIONS ---