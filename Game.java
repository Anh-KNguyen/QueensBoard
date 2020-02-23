public class Game {

    private int numRows = 8;
    private int numCols = 8;
    private final int initChar = 0; // default safe spot

    private int queenCounter = 0; // keep track numQueens

    private int[][] board = new int[numRows][numCols];

    // initialize board to safe squares ("0")
    public void initialize() {
        for (int i = 0; i < board.length; i++) {
            for (int k = 0; k < board[0].length; k++) {
                board[i][k] = initChar;
            }
        }
    }

    // print board to console
    public void display() {
        for (int i = 0; i < board.length; i++) {
            System.out.print("\t");
            for (int k = 0; k < board[0].length; k++) {
                System.out.print(board[i][k] + " ");
            }
            System.out.print("\n");
        }
    }

    // check if square is unsafe
    // if unsafe, we don't use
    public boolean isUnsafe(int numRow, int numCol) {
        if (board[numRow][numCol] != initChar)
            return true;
        else
            return false;
    }

    // place queen on specific square
    public boolean placeQueen(int numRow, int numCol) {
        if(isUnsafe(numRow, numCol)) {
            return false;
        }
        else {
            addQueen(numRow, numCol);
            return true;
        }
    }
    
    public void addQueen(int numRow, int numCol) {
        board[numRow][numCol] += 1;
        queenCounter += 1;

        // block every sqaure the queen can attack (all row and coloumns belonging to that queen)
        for (int i=0; i<board[0].length; i++) {
            // block row for specific attacking queen
            board[numRow][i] += 1;
            // block column for specific attacking queen
            board[i][numCol] += 1;
        }

        // block left backwards diagonal (direction = \)
        for (int i=numRow, k=numCol; i<board[0].length; i++, k++) {
            board[i][k] += 1;
        }

        // block left forwards diagonal (direction = \)
        for (int c=numRow, j=numCol; c >= 0; c--, j--) {
            board[c][j] += 1;
        }

        // block right backwards diagonal (direction = /)
        for (int i=numRow, k=numCol; i<board[0].length; i++, k--) {
            board[i][k] += 1;
        }

        // block right forwards diagonal (direction = /)
        for (int c = numRow, j = numCol; c >= 0; c--, j++) {
            board[c][j] += 1;
        }

    }

    public void deleteQueen(int numRow, int numCol) {
        queenCounter -= 1;

        // block every sqaure the queen can attack (all row and coloumns belonging to that queen)
        for (int i=0; i<board[0].length; i++) {
            // block row for specific attacking queen
            board[numRow][i] -= 1;
            // block column for specific attacking queen
            board[i][numCol] -= 1;
        }

        // block left backwards diagonal (direction = \)
        for (int i=numRow, k=numCol; i<board[0].length; i++, k++) {
            board[i][k] -= 1;
        }

        // block left forwards diagonal (direction = \)
        for (int c=numRow, j=numCol; c >= 0; c--, j--) {
            board[c][j] -= 1;
        }

        // block right backwards diagonal (direction = /)
        for (int i=numRow, k=numCol; i<board[0].length; i++, k--) {
            board[i][k] -= 1;
        }

        // block right forwards diagonal (direction = /)
        for (int c = numRow, j = numCol; c >= 0; c--, j++) {
            board[c][j] -= 1;
        }

    }

    public static void main(String[] args) {
        Game queensGame = new Game();
        queensGame.initialize();
        queensGame.display();
    }

}