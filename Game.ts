var p: any
if (typeof window === 'undefined') 
// we are running under node.js
    p = require("process"); 
else 
// we are running in chrome
    p = {
        "stdout": {
            "write" : function(nop) {
                // do nothing
            }
        }
    }

// shuffle imported from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

class Game {
    private numRows: number = 8;
    private numCols: number = 8;
    private initChar: number = 0; // default safe spot

    private queenCounter: number = 0; // keep track number of Queens

    private blankBoard: number[][] = [ // constant
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];;
    
    private board: number[][]; // current state of board

    private prettyBoard: number[][]; // final solution board


    // initialize board to safe squares ("0")
    initialize() {
        // create a deep clone
        this.board = JSON.parse(JSON.stringify(this.blankBoard));
        this.prettyBoard = JSON.parse(JSON.stringify(this.blankBoard));
    }

    // print final board to console
    display() {
        for (let i = 0; i < this.prettyBoard.length; i++) {
            process.stdout.write("\t")
            for (let k = 0; k < this.prettyBoard[0].length; k++) {
                process.stdout.write(this.prettyBoard[i][k] + " ");
            }
            process.stdout.write("\n");
        }
    }

    // for debug
    displayDebug() {
        for (let i = 0; i < this.board.length; i++) {
            process.stdout.write("\t")
            for (let k = 0; k < this.board[0].length; k++) {
                process.stdout.write(this.board[i][k] + " ");
            }
            process.stdout.write("\n");
        }
    }

    // check if square is safe to place queen
    isSafeSquare(numRow, numCol): boolean {
        // not safe, don't add
        if (this.board[numRow][numCol] != this.initChar) {
            return false;
        }
        // safe, add queen
        else {
            this.addQueen(numRow, numCol);
            return true;
        }
    }

    addQueen(numRow, numCol) {
        this.board[numRow][numCol] += 1;
        this.prettyBoard[numRow][numCol] = 1;
        this.queenCounter += 1;

        // block row and column
        for (let i = 0; i < this.board[0].length; i++) {
            // block row for specific attacking queen
            if (i != numCol) {
                this.board[numRow][i] += 1;
            }
            // block column for specific attacking queen
            if (i != numRow) {
                this.board[i][numCol] += 1;
            }
        }

        // block left backwards diagonal (direction = \)
        for (let i = numRow, k = numCol; i < this.board[0].length && k < this.board[0].length; i++ , k++) {
            if(i != numRow && k != numCol) {
                this.board[i][k] += 1;
            }
        }

        // block left forwards diagonal (direction = \)
        for (let c = numRow, j = numCol; c >= 0 && j >= 0; c-- , j--) {
            if(c != numRow && j != numCol)
              this.board[c][j] += 1;
        }

        // block right backwards diagonal (direction = /)
        for (let i = numRow, k = numCol; i < this.board[0].length && k >= 0; i++ , k--) {
            if( i != numRow && k != numCol)
                this.board[i][k] += 1;
        }

        // block right forwards diagonal (direction = /)
        for (let c = numRow, j = numCol; c >= 0 && j < this.board[0].length; c-- , j++) {
            if( c != numRow && j != numCol)
                this.board[c][j] += 1;
        }

    }

    deleteQueen(numRow, numCol) {
        this.queenCounter -= 1;
        this.board[numRow][numCol] -= 1
        this.prettyBoard[numRow][numCol] = 0;

        // unblock row and column
        for (let i = 0; i < this.board[0].length; i++) {
            // unblock row for specific attacking queen
            if (i != numCol)
                this.board[numRow][i] -= 1;
            // unblock column for specific attacking queen
            if(i != numRow)
                this.board[i][numCol] -= 1;
        }

        // unblock left backwards diagonal (direction = \)
        for (let i = numRow, k = numCol; i < this.board[0].length && k < this.board[0].length; i++ , k++) {
            if (i != numRow && k != numCol)
                this.board[i][k] -= 1;
        }

        // unblock left forwards diagonal (direction = \)
        for (let c = numRow,  j= numCol; c >= 0 && j >= 0; c-- , j--) {
            if (c != numRow && j != numCol)
                this.board[c][j] -= 1;
        }

        // unblock right backwards diagonal (direction = /)
        for (let i = numRow, k = numCol; i < this.board[0].length && k >= 0; i++ , k--) {
            if (i != numRow && k != numCol)
               this.board[i][k] -= 1;
        }

        // unblock right forwards diagonal (direction = /)
        for (let c = numRow, j = numCol; c >= 0 && j < this.board[0].length; c-- , j++) {
            if (c != numRow && j != numCol)
                this.board[c][j] -= 1;
        }

    }

    // generate random solution to puzzle
    solveRand(colList: number[]): boolean {
        // start with base case 
        if (colList.length == 0 || this.queenCounter == 8) {
            this.display();
            return true;
        }

        let ans = false;
        // generate a random permutation of rows
        let rows = [0, 1, 2, 3, 4, 5, 6, 7]
        rows = shuffle(rows);

        for (let r of rows) {
            let col = colList[0]
            if (this.isSafeSquare(r, col) == true) {
                // we placed a queen
                // do depth first search
                ans = this.solveRand(colList.slice(1)) || ans;
                if (ans == true) {
                    return true;
                }
                // backtrack
                this.deleteQueen(r, col);
            }
        }
    }

    solve(col: number): boolean {
        // start with base case 
        if (this.queenCounter == 8 || col == this.board[0].length) {
            this.display();
            return true;
        }

        let ans = false
        for (let r = 0; r < this.board.length; r++) {
            if (this.isSafeSquare(r, col) == true) {
                // we placed a queen
                // do depth first search
                ans = this.solve(col + 1) || ans;
                if (ans == true) {
                    return true;
                }
                // backtrack
                this.deleteQueen(r, col);
            }
        }
        return ans;
    }
}

let queensGame = new Game();
queensGame.initialize();
// console.log(queensGame.solve(0));
console.log(queensGame.solveRand(shuffle([0,1,2,3,4,5,6,7])))