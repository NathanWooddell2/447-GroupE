# TEAM : GROUP E
# PROJ : CMSC 447 - Sprint 2
# DESC : This is the flask app which will interact with the database,
# it will include functionality to place all player data into its 
# respective field in the database.

# Make sure you install Flask, and create a python virtual environment.
# If you have VScode, you can use "ctrl+shift+p" to open the menu and search
# for python virtual environment. Create a .venv environment, and then open the
# python terminal and type "pip install flask" (this will only work in the python
# terminal).

# --- IMPORT/GLOBAL SPACE ---
from flask import Flask                         # Flask will read from JSON to our SQL database
import json                                     # JSON Will be used to fetch data from battleship.js

app = Flask(__name__)

# --- FUNCTION SPACE ---

# Test function - This can act as an example, or be deleted.
@app.route('/')
def test():
    return "this is an example testing function"

# --- MAIN APP SPACE ---
if __name__ == "__main__":
    app.run()