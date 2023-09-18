# Getting started with the application

Avaliable on: [https://samb032.github.io/connect4/](https://samb032.github.io/connect4/)

## Description
The connect4 CPU implements a Minimax algorithm with alpha-beta pruning to decide the next best move. This is not used in the easy difficulty, positions are chosen at random. However, for the medium difficulty, the CPU looks at 2 Moves ahead, whereas its 7 moves ahead on the Hard mode. The algorithm is sped up by alpha-beta pruning, this is where we don't visit child nodes that are unlikely to affect the output of the game. The transposition table allows for caching and quick evaluation for intermediate game states. 

The evaluation function is positive for the CPU and negative score for the player. This is calculated based on the number of successive discs for each player in the row, column, diagonal and anti-diagonal. I also went further on to implement threat detection, where positions towards the middle contribute more to the evaluation score for that specific state. When playing the medium or hard difficulties, you might find that the CPU picks moves that end up with children that have no chance of the player winning, rather than playing the winning move. If I came back to this project, I would hope to remove this behaviour.

The application uses the MERN stack: react for the frontend; nodejs, expressjs and mongodb for the backend. Mongodb is used to store the result of each game. The ExpressJS running with Nodejs exposes the API for the frontend to make POST requests for the game and GET requests for returning game history. This is an optional feature; Auth0 is used to authenticate users and attached a unique account id in the backend. The profile page is optional, however, this requires the backend to be properly configured. This profile page gives a summary of statistics with different difficulties, as well as a list of previous games.

## Installation Guide
### Fronted
Clone the Git Repository
   ```
   git clone https://github.com/SamB032/connect4.git
   ```
Move into the Directory of the Project
  ```
  cd connect4
  ```

Install the required NPM Packages
   ```
   npm install
   ```
Start the website on Local Host
  ```
  npm start
  ```
### Backend: Optionally for the /profile page
  Please install nodejs beforehand.
  Move into the server Directory
  ```
  cd connect4/server
  ```

Install the required NPM Packages
   ```
   npm install
   ```
Configure Environment Variables in the "/connect4/.env"
   ```
    REACT_APP_AUTH0_DOMAIN={Domain of Auth0}
    REACT_APP_AUTH0_CLIENT_ID={Client ID from auth0}
    DB_USERNAME={Username of DB from MongoDB}
    DB_PASSWORD={Password of DB from MongoDB}
    DB_NAME={Name of DB form Mongodb}
    DB_COLLECTION={Collection of Containing DB from Mongodb}
  ```
Start the website on Local Host
  ```
  node server.js
  ```
