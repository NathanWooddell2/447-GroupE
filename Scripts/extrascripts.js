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