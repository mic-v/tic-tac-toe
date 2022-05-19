
class Player {
    constructor(name = 'Player', turn = 0, symbol = 'X') {
        this.name = name;
        this.turn = turn;
        this.symbol = symbol;
        this.wins = 0;
        this.lost = 0;
        this.draw = 0;
    }

    set_turn(turn) {
        this.turn = turn;
    }

    get_turn() {
        return this.turn;
    }

    set_symbol(symbol) {
        this.symbol = symbol;
    }

    get_symbol() {
        return this.symbol;
    }
}

class Bot extends Player {
    constructor(name = 'Bot', turn = 1, symbol = 'O', enemySymbol = 'X') {
        super(name, turn, symbol);
        this.enemySymbol = enemySymbol;
    }

    set_symbol(symbol) {
        super.set_symbol(symbol);
        this.enemySymbol = symbol == 'X' ? 'O' : 'X';
        console.log(this.symbol + " wow " + this.enemySymbol);
    }

    equals3(a, b ,c)
    {
        return a == b && b == c && a != "";
    }

    evaluate_board(board) {
        for(let i = 0; i < 3 ; i++) {
            if(this.equals3(board[i][0], board[i][1], board[i][2])) {
                return board[i][0];
            }
        }
        for(let i = 0; i < 3 ; i++) {
            if(this.equals3(board[0][i], board[1][i], board[2][i])) {
                return board[0][i];
            }
        }
        
        if(this.equals3(board[0][0], board[1][1], board[2][2])) {
            return board[0][0];
        }
        if(this.equals3(board[0][2], board[1][1], board[2][0])) {
            return board[0][2];
        }
        return '';
    }

    is_moves_left(board) {
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

    minimax(board, depth, isMaximizingPlayer) {
        if(this.evaluate_board(board) == this.symbol) {
            return this.turn != 0 ? -1 : 1;
        } 
        if(this.evaluate_board(board) == this.enemySymbol) {
            return this.turn != 0 ? 1 : -1;
        }

        if(!this.is_moves_left(board)) return 0;

        if(isMaximizingPlayer) {
            let bestScore = -1000;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(board[i][j] == "") {
                        board[i][j] = this.turn != 0 ? this.enemySymbol : this.symbol;
                        let score = this.minimax(board, depth + 1, false);
                        board[i][j] = "";
                        if(score >= bestScore) {
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
                        board[i][j] = this.turn != 0 ? this.symbol : this.enemySymbol;
                        let score = this.minimax(board, depth + 1, true);
                        board[i][j] = "";
                        if(score <= bestScore) {
                            bestScore = score;
                        }
                    }
                }
            }
            return bestScore;
        }
    }
    best_move(board) {
        let bestScore = this.turn != 0 ? 1000 : -1000;
        const move = [-1,-1];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == "") {
                    board[i][j] = this.symbol;
                    let isMax = this.turn != 0 ? true : false;
                    let score = this.minimax(board, 1, isMax);
                    board[i][j] = "";

                    if(this.turn != 0) {
                        if(score <= bestScore) {
                            bestScore = score;
                            move[0] = i;
                            move[1] = j;
                        }
                    } else {
                        if(score > bestScore) {
                            bestScore = score;
                            move[0] = i;
                            move[1] = j;
                        }
                    }
                }
            }
        }
        let bestMove = move[0] + "" + move[1];
        return bestMove; 
    }
}


const GameBoard = (() => {

    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]];

    let player = new Player();
    let bot = new Bot();
    let humanTurn;

    const init_game = () => {
        turn = 0;
        humanTurn = true;
        console.log(board);
        //console.log("Test" + player.get_symbol() + " " + bot.get_symbol());
    }

    const reset_game = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let id = i + "" + j;
                board[i][j] = "";
                document.getElementById(id).innerHTML = "&nbsp";
            }
        }
        
        if(player.get_turn() <= 0)
            humanTurn = true;
        else {
            humanTurn = false;
            bot_perform_move();
        }
    }

    const reset_game_finished = () => {
        if(check_game_finished()) {
            reset_game();
            let resultBoard = document.querySelector("#game-result");
            resultBoard.classList.remove("opacity-90");
            resultBoard.classList.remove("z-40");
            resultBoard.classList.add("opacity-0");
            resultBoard.classList.add("z-0");

        }
    }

    const get_player = () => {
        return player;
    }

    const get_bot = () => {
        return bot;
    }

    const perform_move = (move) => {
        let x = move.charAt(0);
        let y = move.charAt(1);
        if(!check_game_finished() && board[x][y] == "" && humanTurn) {
            humanTurn = false;
            board[x][y] = player.get_symbol();
            DisplayController.update_board(move, player.get_symbol());
            bot_perform_move();
        } else if(check_game_finished()) {
            evaluate_game();
        }
    }

    const bot_perform_move = () => {
        if(!check_game_finished()) {
            let move = bot.best_move(board);
            let x = move.charAt(0);
            let y = move.charAt(1);
            console.log(move);;
            board[x][y] = bot.get_symbol();
            DisplayController.update_board(move, bot.get_symbol());
            humanTurn = true;
            evaluate_game();
        } else if(check_game_finished()){
            evaluate_game();
        }
    }

    const check_game_finished = () => {
        let emptySpace = board.some(row => row.includes(''));
        if(!emptySpace) {
            return true;
        } else {
            let symbol = evaluate_board();
            if(symbol != '') {
                return true;    
            }
            return false;
        }
    }

    const evaluate_game = () => {

        let resultBoard = document.querySelector("#game-result");
        let resultMessage = document.querySelector("#result-message");
        let symbol = evaluate_board();
        if(symbol == player.get_symbol()) {
            console.log("palyer won");
            resultMessage.innerHTML = "You Won?";
            resultBoard.classList.remove("opacity-0");
            resultBoard.classList.remove("z-0");
            resultBoard.classList.add("opacity-90");
            resultBoard.classList.add("z-40");
        } else if(symbol == bot.get_symbol()) {
            console.log("ener won");
            resultMessage.innerHTML = "You Lost!";
            resultBoard.classList.remove("opacity-0");
            resultBoard.classList.remove("z-0");
            resultBoard.classList.add("opacity-90");
            resultBoard.classList.add("z-40");
        } else {
            if(check_game_finished()) {
                console.log("draw won");
                resultMessage.innerHTML = "Draw";
                resultBoard.classList.remove("opacity-0");
                resultBoard.classList.remove("z-0");
                resultBoard.classList.add("opacity-90");
                resultBoard.classList.add("z-40");
            } 
        }
    }

    const evaluate_board = () => {
        let symbol = '';
        for(let i = 0; i < 3; i++) {
            //  console.log(board[i][0] + " " + board[i][1] + " " +  board[i][2])
            if(board[i][0] == board[i][1] && board[i][1]  == board[i][2] && board[i][0] != "") {
                symbol = board[i][0];
            }
        }
        for(let i = 0; i < 3; i++) {
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != "") {
                symbol = board[0][i];
            }
        }
        //console.log(board[0][0] + " " + board[1][1] + " " +  board[2][2])
        if((board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "")){
            symbol = board[1][1];
        }
        if((board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "")){
            symbol = board[1][1];
        } 
        return symbol;
    }

    return {init_game, reset_game, reset_game_finished, get_player, get_bot, perform_move, bot_perform_move, evaluate_board,
    check_game_finished};
})();

const DisplayController = (() => {

    const playerTurn = document.querySelector("#check");
    const playerIcon = document.querySelector("#check2");
    const boardReset = document.querySelector("#reset-board");
    const resultBoard = document.querySelector("#game-result");

    const init_controller = () => {
        playerTurn.checked = false;
        playerIcon.checked = false;
        playerTurn.addEventListener('click', update_turn);
        playerIcon.addEventListener('click', update_icon);
        boardReset.addEventListener('click', reset_board);
        resultBoard.addEventListener('click', reset_game);

        const gridItems = document.querySelectorAll(".ttt-item");
        for(let i = 0; i < gridItems.length; i++) {
            gridItems[i].addEventListener('click', function(e) {
                perform_move(gridItems[i].id);
            });
        }

    }

    const update_turn = () => {
        let text = document.querySelector("#check-text").innerHTML;
        console.log("Player: " + GameBoard.get_player().get_turn() + " Bot: " + GameBoard.get_bot().get_turn());
        if(text === "Yes"){
            document.querySelector("#check-text").innerHTML = "No";
            GameBoard.get_player().set_turn(1);
            GameBoard.get_bot().set_turn(0);
        } else {
            document.querySelector("#check-text").innerHTML = "Yes";
            GameBoard.get_player().set_turn(0);
            GameBoard.get_bot().set_turn(1);
        }
        GameBoard.reset_game();
        console.log("Player: " + GameBoard.get_player().get_turn() + " Bot: " + GameBoard.get_bot().get_turn());

    }

    const update_icon = () => {
        let text = document.querySelector("#check2-text").innerHTML;
        console.log("Player: " + GameBoard.get_player().get_symbol() + " Bot: " + GameBoard.get_bot().get_symbol());
        if(text === "X"){
            document.querySelector("#check2-text").innerHTML = "O";
            GameBoard.get_player().set_symbol("O");
            GameBoard.get_bot().set_symbol("X");
        } else {
            document.querySelector("#check2-text").innerHTML = "X";
            GameBoard.get_player().set_symbol("X");
            GameBoard.get_bot().set_symbol("O");
        }
        GameBoard.reset_game();
        console.log("Player: " + GameBoard.get_player().get_symbol() + " Bot: " + GameBoard.get_bot().get_symbol());

    }
    
    const reset_board = () => {
        GameBoard.reset_game();
        const gridItems = document.querySelectorAll(".ttt-item");
        for(let i = 0; i < gridItems.length; i++) {
            gridItems[i].innerHTML = "&nbsp";
        }
    }

    const reset_game = () => {
        GameBoard.reset_game_finished();
    }

    const perform_move = (move) => {
        //console.log("perform move");
        GameBoard.perform_move(move);
    }

    const update_board = (move, symbol) => {
        console.log("move: "+ move);
        document.getElementById(move).innerHTML = symbol;
    }

    return {init_controller, update_board};
})();

console.log("test: " + GameBoard.evaluate_board())
GameBoard.init_game();
DisplayController.init_controller();

