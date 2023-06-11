const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('dotenv').config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION

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
    }, {
      versionKey: false,
    }
);

const Game = mongoose.model('Game', gameSchema, DB_COLLECTION);
 
// Wrap with expressJS
const app = express();

console.log("App listen at port 5000");

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("App is Working");   
});
 
app.post("/addGame", async (req, resp) => {
    try {
        const { winningPlayer } = req.body;
        const game = new Game({ winningPlayer });
        await game.save();
        
        resp.send("Game added successfully");
    } catch (error) {
        console.error('Error adding game:', error);
        resp.status(500).send("Something went wrong");
    }
});

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