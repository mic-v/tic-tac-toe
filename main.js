

/**
const Player = (name, turn) => {
    let name_ = name;
    let turn_ = turn;
    let wins = 0;
    let lost = 0;
    let draw = 0;
    const win_game = () => wins++;
    const lose_game = () => lost++;
    const draw_game = () => draw++;
    return {win_game, lose_game, draw_game};
}
*/

/*
let scores = {
    x: 1,
    o: -1,
    tie: 0
};

function equals3(a, b, c) {
    return a == b && b == c && a != '_';
}

class Player {
    constructor(name = 'Player', turn = 0, symbol = 'x') {
        this.name = name;
        this.turn = turn;
        this.symbol = symbol;
        this.wins = 0;
        this.lost = 0;
        this.draw = 0;
    }

    win_game() {
        wins++;
    }
    lose_game() {
        lost++;
    }
    draw_game() {
        draw++;
    }

    get_symbol() {
        return this.symbol;
    }
}

class Bot extends Player {
    constructor (name = 'Player', turn = 0, symbol = 'o', board) {
        super(name,turn,symbol);
        this.board = board;
    }


    isMovesLeft()
    {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.board[i][j] == '_')
                    return true;
            }
        }
        return false;
    }

    evaluate() {
        for(let row = 0; row<3; row++)
        {
            if(equals3(this.board[row][0], this.board[row][1], this.board[row][2]))
            {
                if(this.board[row][0] == 'x') {
                    return +10;
                } else if(this.board[row][0] == 'o')
                    return -10;
            }
        }

        for(let cols = 0; cols<3; cols++)
        {
            if(equals3(this.board[0][cols], this.board[1][cols], this.board[2][cols]))
            {
                if(this.board[0][cols] == 'x') {
                    return +10;
                } else if(this.board[0][cols] == 'o')
                    return -10;
            }
        }

        if(equals3(this.board[0][0], this.board[1][1], this.board[2][2]))
        {
            if(this.board[0][0] == 'x')
                return +10;
            else if(this.board[0][0] == 'o') 
                return -10;
        }
        if(equals3(this.board[0][2], this.board[1][1], this.board[2][0]))
        {
            if(this.board[0][2] == 'x')
                return +10;
            else if(this.board[0][2] == 'o') 
                return -10;
        }

        return 0;
    }

    update_board(board) {
        this.board = board;
        console.log(this.board);
    }

    minimax(board, depth, maximizingPlayer) {


        let result = this.evaluate();

        if(result == 10)

            return result;
        if(result == -10)
            return result;

        if(!this.isMovesLeft() || depth == 0) 
            return result;


        if(maximizingPlayer) {
            let bestScore = -1000;
            for(let i = 0; i < 3; i++) {

                for(let j = 0; j < 3; j++) {

                    if(this.board[i][j] == '_') {
                        this.board[i][j] = 'x';
                        let score = this.minimax(this.board, depth + 1, false);
                        this.board[i][j] = '_';
                        bestScore = Math.max(bestScore, score);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = 1000;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(this.board[i][j] == '_') {
                        this.board[i][j] = 'o';
                        let score = this.minimax(this.board, depth + 1, true);
                        this.board[i][j] = '_';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
    
    perform_move() {
        console.log(this.board);
        let bestScore = -Infinity;
        let move = [0,0];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++){
                if(this.board[i][j] == '_') {
                    this.board[i][j] = 'o';
                    let score = this.minimax(this.board, 0, false);
                    this.board[i][j] = '_';
                    console.log("Score =" + score);
                    if(score > bestScore) {
                        bestScore = score;
                        move = [i,j];
                    }
                }
            }
        }
        console.log("best move is" + move);

    }

    test2() {

    }

    test1() {

        this.test2();
    }

}

const player = new Bot("board",1,1,1);
player.test1();


*/
/*
const gameboard = (function() {
    const m = 3;
    let moveTurn = 0;
    let gameFinished = false;
    let gameDraw = false;
    let board = new Array(m);

    /*
    let player = new Player();
    let bot = new Bot('Bot', 1, 'o',board);

    for(var i = 0; i < m; i++)
    {
        board[i] = new Array(3);
    }

    for(var i = 0; i < m; i++)
    {
        for(var j = 0; j < m; j++)
        {
            board[i][j] = '_';
        }
    }

    //console.log(board);

    const set_turn = () => {
        move = move ? false : true;
    };

    const reset_board = () => {
        board = new Array(m);
        for(var i = 0; i < m; i++)
        {
            board[i] = new Array(3);
        }
    };

    const perform_move = move => {
        var x = move.charAt(0);
        var y = move.charAt(1);
        if(board[x][y] == '_' && !gameFinished)
        {
            board[x][y] = true;
            if(moveTurn % 2 == 0)
            {
                board[x][y] = 'x';
                document.getElementById(move).innerHTML = 'x';
            }
            else
            {
                board[x][y] = 'o';
                document.getElementById(move).innerHTML = 'o';
            }
            
            gameFinished = check_game_finished(moveTurn);
            if(gameFinished)
                finish_game(moveTurn);
            moveTurn++;
        }
        return true;
    };


    const finish_game = turn => {
        if(gameDraw)
            document.getElementById("turn-display").innerHTML = 'Tie game!';
        else if(turn % 2 == 0)
            document.getElementById("turn-display").innerHTML = 'Player won game!';
        else
            document.getElementById("turn-display").innerHTML = 'Bot won game!';
    };

    const check_game_finished = turn => {
        let symbol = '_';
        if(turn % 2 == 0)
            symbol = 'x';
        else   
            symbol = 'o';

        //console.log("Current symbol is : " + symbol)
        if(moveTurn >= 8) {
            gameDraw = true;
            return true;
        }

        //console.log(board[0][0] + " " + board[0][1] + " " + board[0][2] + "plus game symbol: " + symbol);
        if(equals3(board[0][0],board[0][1], board[0][2]))
        {
            return true;
        }
        else if(board[1][0] == symbol && board[1][1] == symbol && board[1][2] == symbol)
        {
            return true;
        }
        else if(board[2][0] == symbol && board[2][1] == symbol && board[2][2] == symbol)
        {
            return true;
        }
        else if(board[0][0] == symbol && board[1][0] == symbol && board[2][0] == symbol)
        {
            return true;
        }
        else if(board[0][1] == symbol && board[1][1] == symbol && board[2][1] == symbol)
        {
            return true;
        }
        else if(board[0][2] == symbol && board[1][2] == symbol && board[2][2] == symbol)
        {
            return true;
        }
        else if(board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol)
        {
            return true;
        }
        else if(board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol)
        {
            return true;
        }
        return false;

    }

    return {
        set_turn, reset_board, perform_move
    };
})();


*/

const ai = 'o';
const human = 'x';

const minimalValue = -50;
const maximalValue = 50;

let turn = 1;
let humanTurn = true;



let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]];

console.log(board);

function isMovesLeft(board) {
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(board[i][j] == "")
                return true;
        }
    }
    return false;
}

function equals3(a, b ,c)
{
    return a == b && b == c && a != "";
}


function bestMove() {
    let bestScore = 1000;
    const move = [-1,-1];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == "") {
                board[i][j] = ai;
                let score = minimax(board, 0, true);
                console.log("move " + i + "/" + j + " " + " Score: " + score);
                board[i][j] = "";
                if(score < bestScore) {
                    bestScore = score;
                    move[0] = i;
                    move[1] = j;
                }
            }
        }
    }
    console.log("Best move: " + move);
    const moveID = move[0] + '' + move[1];
    board[move[0]][move[1]] = ai;
    document.getElementById(moveID).innerHTML = 'o';

    console.log(board);
    

}

function minimax(board, depth, isMaximizingPlayer)
{
    let result = evaluateBoard(board);
    if(result == maximalValue) return 1;
    if(result == minimalValue) return -1;
    if(!isMovesLeft(board)) return 0;

    if(isMaximizingPlayer){
        let bestScore = -1000;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] ==  "") {
                    board[i][j] = human;
                    //console.log(board);
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    //console.log(board);
                    if(score >= bestScore){
                        bestScore = score;
                    }
                }
            } 
        }
        return bestScore;
    } else {   
        let bestScore = 1000;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == "") {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    if(score <= bestScore)
                    {
                        bestScore = score;
                    }
                }
            } 
        }
        return bestScore;
    }

}

function evaluateBoard(board) {
    for(let i = 0; i < 3 ; i++) {
        if(equals3(board[i][0], board[i][1], board[i][2])) {
            if(board[i][0] == human) {
                return maximalValue;
            } else if(board[i][0] == ai) {
                return minimalValue;
            }
        }
    }
    for(let i = 0; i < 3 ; i++) {
        if(equals3(board[0][i], board[1][i], board[2][i])) {
            if(board[0][i] == human) {
                return maximalValue;
            } else if(board[0][i] === ai) {
                return minimalValue;
            }
        }
    }
    
    
    if(equals3(board[0][0], board[1][1], board[2][2])) {
        if(board[0][0] == human)
            return maximalValue;
        else if(board[0][0] === ai)
            return minimalValue;
    }
    if(equals3(board[0][2], board[1][1], board[2][0])) {
        if(board[0][2] == human)
            return maximalValue;
        else if(board[0][2] == ai)
            return minimalValue;
    }
    return 0;
}

function perform_move(move) {
    var x = move.charAt(0);
    var y = move.charAt(1);
    if(board[x][y] == "" && humanTurn && isMovesLeft(board))
    {
        board[x][y] = 'x';
        document.getElementById(move).innerHTML = 'x';        
    }
    humanTurn = false;
    turn++;
    bestMove();
    humanTurn = true;
    turn++;
    console.log(board);
}

function board_click(clicked_id)
{
    if(humanTurn)
        perform_move(clicked_id);
    //gameboard.perform_move(clicked_id);
    //document.getElementById(clicked_id).innerHTML = 'x';
}

/*

const gameBoard = (() => {




})();
*/