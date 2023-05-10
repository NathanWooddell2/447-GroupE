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

# PIP install list
# pip install flask
# pip install flask_sqlalchemy
# pip install flask_marshmallow
# pip install flask_cors
# pip install SQLAlchemy
# pip install MySQL-python


# --- IMPORT/GLOBAL SPACE ---
from flask import Flask, jsonify                # Flask will read from JSON to our SQL database
from flask_sqlalchemy import SQLAlchemy         # SQL Alchemy will be used to directly interact with the database.
from flask_marshmallow import Marshmallow
from dataclasses import dataclass
from flask_cors import CORS
import json                                     # JSON Will be used to fetch data from battleship.js

app = Flask(__name__)
CORS(app)

# --- Database setup ---

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://ship@localhost:3306/battleship'
db = SQLAlchemy(app)
ma = Marshmallow(app)

@dataclass
class Player(db.Model):
    id: int
    name: str
    level: int
    accuracy: float

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    level = db.Column(db.Integer)
    accuracy = db.Column(db.Float)

    def __init__(self, id, name, level, accuracy):
        self.id = id
        self.name = name
        self.level = level
        self.accuracy = accuracy

class NewPlayer():
    accuracy: float
    level: int
    name: str

    
    def __init__(self, accuracy, level, name):
        self.accuracy = accuracy
        self.level = level
        self.name = name

class PlayerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'level', 'accuracy')

class NewPlayerSchema(ma.Schema):
    class Meta:
        fields = ('accuracy', 'level', 'name')

playerSchema = PlayerSchema()


# --- FUNCTION SPACE ---

# Test function - This can act as an example, or be deleted.
@app.route('/')
def test():
    return "this is an example testing function"

@app.route('/getAll', methods = ['GET'])
def getAllPlayers():
    results = Player.query.all()
    return jsonify(results)

@app.route('/getPlayer/<id>', methods = ['GET'])
def getPlayer(id):
    player = Player.query.get(id)

    return playerSchema.jsonify(player)

@app.route('/newPlayer', methods = ['POST'])
def createNewPlayer():
    accuracy = request.json['accuracy']
    level = request.json['level']
    name = request.json['name']

    player = NewPlayer(accuracy, level, name)
    db.session.add(player)
    db.session.commit()

    return newPlayerSchema.jsonify(player)

@app.route('/updatePlayer/<id>', methods = ['PUT'])
def updatePlayer(id):
    player = Player.query.get(id)

    accuracy = request.json['accuracy']
    level = request.json['level']

    player.accuracy = accuracy
    player.level = level

    db.session.commit()
    return playerSchema.jsonify(player)


# --- MAIN APP SPACE ---
if __name__ == "__main__":
    app.run(debug=True)


