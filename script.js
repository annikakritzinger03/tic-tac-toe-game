window.onload=function(){
    
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector("#statusText");
    const restartBtn = document.querySelector("#restartBtn");
    
    const winConditions = [
        [0,1,2], //rows
        [3,4,5],
        [6,7,8],
        [0,3,6], //columbs
        [1,4,7],
        [2,5,8],
        [0,4,8], //diagnals
        [2,4,6]
    ];
    
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = false;
    

    InitializeGame();

    function  InitializeGame(){
        running = true;
        cells.forEach(cell => cell.addEventListener('click', CellClicked));
        restartBtn.addEventListener('click', RestartGame);
        statusText.textContent = `It is ${currentPlayer}'s turn`; 
    }

    function  CellClicked(){
        const cellIndex = this.getAttribute("cellIndex");

        if(options[cellIndex] != "" || !running){
            return;
        }

        UpdateCell(this, cellIndex);
        CheckWinner();
    }

    function  UpdateCell(cell, index){
        options[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if(currentPlayer == "X"){
            cell.style.color  = "red";
        }
        else{
            cell.style.color  = "green";
        }
    }

    function  ChangePlayer(){
        currentPlayer = (currentPlayer == "X")?"O":"X";
        statusText.textContent = `It is ${currentPlayer}'s turn`; 
    }

    function  CheckWinner(){
        let roundWon = false;

        for(let i=0; i<winConditions.length; i++){
            //go through winConditions and check if corresponding cells in options are the same
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];
            
            if(cellA == "" || cellB == "" || cellC == ""){
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            statusText.textContent = `Player ${currentPlayer} is the winner! Congratulations!`;
            running = false;
        }
        else if(!options.includes("")){
            statusText.textContent = "Draw!"
            running = false;
        }
        else{
            ChangePlayer();
        }
    }

    function  RestartGame(){
        currentPlayer = "X"
        options =  ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `It is ${currentPlayer}'s turn`; 
        cells.forEach(cell => cell.textContent = "");
        running = true;
    }
}