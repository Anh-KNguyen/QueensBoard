class Game {
    private numRows: number = 8;
    private numCols: number = 8;
    private initChar: number = 0; // default safe spot

    private queenCounter: number = 0; // keep track numQueens

    private board: number[][] = [[this.numRows, this.numCols]];

    initialize() {
        for (let i=0; i<this.board.length; i++) {
            for (let k=0; k<this.board[0].length; k++) {
                this.board[i][k] = this.initChar;
            }
        }
    }





}