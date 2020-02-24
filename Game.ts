class Game {
    private numRows: number = 8;
    private numCols: number = 8;
    private initChar: number = 0; // default safe spot

    private queenCounter: number = 0; // keep track numQueens

    private board: number[][] = [[this.numRows, this.numCols]];

    // initialize board to safe squares ("0")
    initialize() {
        for (let i=0; i<this.board.length; i++) {
            for (let k=0; k<this.board[0].length; k++) {
                this.board[i][k] = this.initChar;
            }
        }
    }

    // print board to console
    display() {
        for (let i=0; i<this.board.length; i++) {
            console.log("\t");
            for (let k=0; k<this.board[0].length; k++) {
                console.log(this.board[i][k] + " ");
            }
            console.log("\n");
        }
    }

    // check if square is unsafe
    // if unsafe, we don't use
    isUnsafe(numRow, numCol) {
        if (this.board[numRow][numCol] != this.initChar)
            return true;
        else
            return false;
    }

    // place queen on specific square
    placeQueen(numRow, numCol) {
        if(this.isUnsafe(numRow, numCol)) {
            return false;
        }
        else {
            this.addQueen(numRow, numCol);
            return true;
        }
    }


    addQueen(numRow, numCol) {
        this.board[numRow][numCol] += 1;
        this.queenCounter += 1;

        // block every sqaure the queen can attack (all row and coloumns belonging to that queen)
        for (let i=0; i<this.board[0].length; i++) {
            // block row for specific attacking queen
            this.board[numRow][i] += 1;
            // block column for specific attacking queen
            this.board[i][numCol] += 1;
        }

        // block left backwards diagonal (direction = \)
        for (let i=numRow, k=numCol; i<this.board[0].length; i++, k++) {
            this.board[i][k] += 1;
        }

        // block left forwards diagonal (direction = \)
        for (let c=numRow, j=numCol; c >= 0; c--, j--) {
            this.board[c][j] += 1;
        }

        // block right backwards diagonal (direction = /)
        for (let i=numRow, k=numCol; i<this.board[0].length; i++, k--) {
            this.board[i][k] += 1;
        }

        // block right forwards diagonal (direction = /)
        for (let c = numRow, j = numCol; c >= 0; c--, j++) {
            this.board[c][j] += 1;
        }

    }

    deleteQueen(numRow, numCol) {
        this.queenCounter -= 1;

        // unblock every sqaure the queen can attack (all row and coloumns belonging to that queen)
        for (let i=0; i<this.board[0].length; i++) {
            // unblock row for specific attacking queen
            this.board[numRow][i] -= 1;
            // unblock column for specific attacking queen
            this.board[i][numCol] -= 1;
        }

        // unblock left backwards diagonal (direction = \)
        for (let i=numRow, k=numCol; i<this.board[0].length; i++, k++) {
            this.board[i][k] -= 1;
        }

        // unblock left forwards diagonal (direction = \)
        for (let c=numRow, j=numCol; c >= 0; c--, j--) {
            this.board[c][j] -= 1;
        }

        // unblock right backwards diagonal (direction = /)
        for (let i=numRow, k=numCol; i<this.board[0].length; i++, k--) {
            this.board[i][k] -= 1;
        }

        // unblock right forwards diagonal (direction = /)
        for (let c = numRow, j = numCol; c >= 0; c--, j++) {
            this.board[c][j] -= 1;
        }

    }

}

    let queensGame = new Game();
    queensGame.initialize();
    queensGame.display();