const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loses: 0, tie: 0 };
        updateScore();

        //Firt get the computer choice
        function pickComputer() {
            let computerRandom = Math.random();
            let computerChoice = '';

            if (computerRandom >= 0 && computerRandom <= 1 / 3) {
                computerChoice = 'rock';
            } else if (computerRandom >= 1 / 3 && computerRandom <= 2 / 3) {
                computerChoice = 'paper';
            } else if (computerRandom >= 2 / 3 && computerRandom <= 1) {
                computerChoice = 'scissors';
            }

            return computerChoice;
        }
        document.querySelector('.js-rock-button').addEventListener('click',
            () => {humanMove('rock');}
        );

        document.querySelector('.js-paper-button').addEventListener('click',
            () => {humanMove('paper');}
        );

        document.querySelector('.js-scissors-button').addEventListener('click',
            () => {humanMove('scissors');}
        );

        document.body.addEventListener('keydown', 
            (event) => {
                if(event.key === 'r'){
                    humanMove('rock');
                }
                else if(event.key === 'p'){
                    humanMove('paper');
                }
                else if(event.key === 's'){
                    humanMove('scissors');
                }
            }
        )

        //Human choice
        function humanMove(myMove) {
            const computerChoice = pickComputer();

            let result = '';
            if (myMove === 'scissors') {
                if (computerChoice === 'rock') {
                    result = 'You lose.';
                } else if (computerChoice === 'paper') {
                    result = 'You win.';
                } else if (computerChoice === 'scissors') {
                    result = 'Tie.';
                }
            } else if (myMove === 'paper') {
                if (computerChoice === 'rock') {
                    result = 'You win.';
                } else if (computerChoice === 'paper') {
                    result = 'Tie.';
                } else if (computerChoice === 'scissors') {
                    result = 'You lose.';
                }
            } else if (myMove === 'rock') {
                if (computerChoice === 'rock') {
                    result = 'Tie.';
                } else if (computerChoice === 'paper') {
                    result = 'You lose.';
                } else if (computerChoice === 'scissors') {
                    result = 'You win.';
                }
            }

            // Update the score based on the result
            if (result === 'You win.') {
                score.wins += 1;
            } else if (result === 'You lose.') {
                score.loses += 1;
            } else if (result === 'Tie.') {
                score.tie += 1;
            }

            //Save the score 
            localStorage.setItem('score', JSON.stringify(score));
            updateScore();

            document.querySelector('.js-result').innerHTML = `${result}`;
            document.querySelector('.js-move').innerHTML = `You
        <img src="images/${myMove}-emoji.png" class="move-icon">
        <img src="images/${computerChoice}-emoji.png" class="move-icon">
        Computer`;
        }

        //Update score
        function updateScore() {
            document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses} Tie: ${score.tie}`;
        }

        //Reset score
        function resetScore() {
            score.wins = 0;
            score.loses = 0;
            score.tie = 0;
            localStorage.removeItem('score');
            updateScore();
        }
    
