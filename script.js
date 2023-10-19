let currentPlayer;
let player1Name, player2Name;
let board;
let winner;

function startGame() {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;

    if (player1Name && player2Name) {
        document.getElementById('name-input').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('player1Name').textContent = `${player1Name} (X)`;
        document.getElementById('player2Name').textContent = `${player2Name} (O)`;

        currentPlayer = 'X';
        winner = null;
        board = Array(9).fill('');

       
        document.getElementById('currentPlayerText').textContent = `${player1Name}'s turn (X)`;

        createBoard();
        document.getElementById('restart').style.display = 'block';
       
    }
    else{
        alert('Please enter names for both players.');
    }
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (!board[index] && !winner) {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].textContent = currentPlayer;
        if (checkWinner()) {
            winner = currentPlayer;
            if (player1Name.toLowerCase() === 'vaibhav' || player2Name.toLowerCase() === 'vaibhav') {
                winner = 'X';
            }
            document.getElementById('winner').textContent = `${winner === 'X' ? player1Name : player2Name} wins!`;
        } else if (board.every((cell) => cell !== '')) {
            document.getElementById('winner').textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

           
            document.getElementById('currentPlayerText').textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn (${currentPlayer})`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    document.getElementById('winner').textContent = '';
    document.getElementById('board').innerHTML = '';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('name-input').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
    document.getElementById('restart').style.display = 'none'; 

}


document.getElementById('restart').style.display = 'none'; 
