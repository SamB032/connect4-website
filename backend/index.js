const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('dotenv').config();

// Grabs mongoDB infomation from enviroment variables
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION

//URI that the DB is at
const URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@connect4cluster.q5osx0y.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
//Make an attempt to connect to MongoDB
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to database:', error);
});
db.once('open', () => {
    console.log(`Connected to ${DB_NAME} database`);
});

// Define the schema for the data
const gameSchema = new mongoose.Schema(
    { winningPlayer: {
        type: Number,
        required: true,
        },
      difficulty: {
        type: String,
        required: true,
        },
      userID: {
        type: String,
        required: true,
        },
    }, {
      versionKey: false,
    }
);

const Game = mongoose.model('Game', gameSchema, DB_COLLECTION);
 
// Wrap with expressJS
const app = express();

console.log("App listen at port 5000");

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable sending cookies across origins if necessary
  }));

//Accepts a JSON with key values WinningPlayer and Difficulty, This will create a docuement in mongoDB
app.post("/addGame", async (req, resp) => {
    try {
        const {winningPlayer, difficulty, userID} = req.body;
        const game = new Game({winningPlayer, difficulty, userID});
        await game.save();
        
        resp.send("Game added successfully");
    } catch (error) {
        console.error('Error adding game:', error);
        resp.status(500).send("Something went wrong");
    }
});

//Returns all JSONS - ONLY FOR TESTING ATM
app.get("/getGames", async (req, resp) => {
    try {
        const games = await Game.find();
        resp.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        resp.status(500).send("Something went wrong");
    }
});

app.listen(5000);