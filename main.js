const Player = (name, turn) => {
    let name_ = name;
    let turn_ = turn;
    let wins = 0;
    let lost = 0;
    let draw = 0;
    const win_game = () => wins++;
    const lose_game = () => lost++;
    const draw_game = () => draw++;

}


const gameboard = (function() {
    const m = 3;
    let moveTurn = 0;
    let gameFinished = false;
    let gameDraw = false;
    let board = new Array(m);
    for(var i = 0; i < m; i++)
    {
        board[i] = new Array(3);
    }

    for(var i = 0; i < m; i++)
    {
        for(var j = 0; j < m; j++)
        {
            board[i][j] = false;
        }
    }

    console.log(board);

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
        if(!board[x][y] && !gameFinished)
        {
            board[x][y] = true;
            console.log(x + " " + y);
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
        let symbol = '';
        if(turn % 2 == 0)
            symbol = 'x';
        else   
            symbol = 'o';

        console.log("Current symbol is : " + symbol)
        if(moveTurn >= 8) {
            gameDraw = true;
            return true;
        }

        console.log(board[0][0] + " " + board[0][1] + " " + board[0][2] + "plus game symbol: " + symbol);
        if(board[0][0] == symbol && board[0][1] == symbol && board[0][2] == symbol)
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

        console.log("game not finished" + moveTurn);
        return false;

    }

    return {
        set_turn, reset_board, perform_move
    };
})();

function board_click(clicked_id)
{
    gameboard.perform_move(clicked_id);
    //document.getElementById(clicked_id).innerHTML = 'x';
}