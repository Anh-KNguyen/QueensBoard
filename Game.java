public class Game {

    private int numRows = 8;
    private int numCols = 8;
    private final int initChar = 0; // open spots

    private int[][] board = new int[numRows][numCols];

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

    public static void main(String[] args) {
        Game queensGame = new Game();
        queensGame.display();
    }

}