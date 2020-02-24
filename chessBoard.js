var chessBoard = document.getElementById("chessboard");

sol = queensGame.prettyBoard.flat();

for (let i = 0; i < sol.length; i++) {
    if (sol[i] == 1)
        chessBoard.children[i].innerHTML = "&#9819;"
}