# 447-GroupE
We are creating "Extreme Battleship" as a web based game.    

Organization Directories:  
    There are currently 4 directories, each is labled with what it should contain.  
    Feel free to add a directory, but make sure you explain it here.  
      
    Assets:  
        Store sprites, sounds, and other game assets in this folder.  
    Database:  
        Store database files, and files related to creating/managing the database  
        in this directory.  
    Pages:  
        This directory should contain mostly HTML, and related pages.  
    Scripts:  
        A folder for Javascript, and Python  script files. This will likely  
        contain other types of script files also.  
  
Assets:
  
Database:  
  
Pages:  
  
Scripts:  
    flaskapp.py  
        This is the app responsible for interacting with the mysql database  
        it needs to be able to retrieve player information from the file  
        gamescripts.js and save it to the database. The flask app also needs  
        to be able to take data from the database, and pass it to javascript  
        to load a player.  
  
        You will need to create a new .venv environment to run this app, and  
        will also need to pip install flask, and other imported packages.  
          
        - Nathan  
          
    gamescripts.js
        This is the body of the program, this javascript file is going to  
        contain the classes, and functions to run the game. This file will  
        need to be accessible by the flaskapp, and later the database.  
        This will also likely contain the code to animate and update the  
        battleship game board.  
          
        Almost all of the functions here should be accessable externally.  
        These functions and scripts should be used by the HTML portion of  
        the website.  
          
        - Nathan  