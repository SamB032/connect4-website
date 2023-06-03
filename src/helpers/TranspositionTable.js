//Generates a unique 32bit interger for a 6 by 7 board
function hash(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < key[i].length; j++) {
            hash = (hash << 5) - hash + key[i][j];
            hash |= 0; // Convert to 32-bit integer
        }
    }
    return hash;
}

export class TranspositionTable {

    //initialses the Map
    constructor() {
        this.table = new Map();
    }

    //Adds has(key) and value pair to the map
    put(key, value) {
        this.table.set(hash(key), value);
    }

    // Returns the value for hash key if its exists, otherwise, it return false
    get(key) {
        return this.table.get(hash(key)) || false;
    }
}