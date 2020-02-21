var chessBoard = document.getElementById("chessBoard");

for (var i = 0; i < 8; i++) {
    var row = chessBoard.appendChild(document.createElement("div")); // row
    for (var j = 0; j < 8; j++) {
        var span = chessBoard.appendChild(document.createElement("span")); // column
        if (i & 1) { // odd
            if (j & 1) { // white
            } else { //black
                span.style.backgroundColor = "black";
            }
        } else { // even
            if (j & 1) { // black
                span.style.backgroundColor = "black";
            }
        }
        row.appendChild(span)
    }
}