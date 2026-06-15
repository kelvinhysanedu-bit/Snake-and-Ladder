/* =====================================
   GLOBAL VARIABLES
===================================== */

let players = [];
let currentPlayerIndex = 0;
let finishedPlayers = [];

let gameStarted = false;

const BOARD_SIZE = 100;

/* =====================================
   SNAKES
===================================== */

const snakes = {

    98: 78,
    95: 75,
    92: 88,

    83: 19,
    73: 53,

    69: 33,
    64: 60,

    59: 17,
    52: 42,

    48: 26,
    46: 25

};

/* =====================================
   LADDERS
===================================== */

const ladders = {

    2: 23,
    7: 29,

    15: 37,
    21: 41,

    28: 55,
    36: 57,

    51: 72,
    71: 92,

    80: 99

};

/* =====================================
   TOKEN COLORS
===================================== */

const tokenClasses = [

    "token1",
    "token2",
    "token3",
    "token4"

];

/* =====================================
   CATEGORY ICONS
===================================== */

const categoryIcons = [

    "🗣️",
    "📚",
    "✏️"

];

/* =====================================
   START GAME
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", startGame);

    document
        .getElementById("rollBtn")
        .addEventListener("click", rollDice);

    document
        .getElementById("restartBtn")
        .addEventListener("click", restartGame);

    document
        .getElementById("closeQuestion")
        .addEventListener("click", closeQuestion);

    document
        .getElementById("closeWinner")
        .addEventListener("click", closeWinner);

});

/* =====================================
   START GAME FUNCTION
===================================== */

function startGame() {

    players = [];
    finishedPlayers = [];
    currentPlayerIndex = 0;

    const playerCount = parseInt(
        document.getElementById("playerCount").value
    );

    const nameInputs = [

        document.getElementById("player1"),
        document.getElementById("player2"),
        document.getElementById("player3"),
        document.getElementById("player4")

    ];

    for (let i = 0; i < playerCount; i++) {

        let playerName =
            nameInputs[i].value.trim();

        if (playerName === "") {

            playerName = `Player ${i + 1}`;

        }

        players.push({

            name: playerName,
            position: 1,
            finished: false

        });

    }

    document
        .getElementById("setupScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    gameStarted = true;

    generateBoard();

    renderTokens();

    updateScoreboard();

    updateCurrentPlayer();

}

/* =====================================
   GENERATE BOARD
===================================== */

function generateBoard() {

    const board =
        document.getElementById("board");

    board.innerHTML = "";

    for (
        let square = 100;
        square >= 1;
        square--
    ) {

        const cell =
            document.createElement("div");

        cell.classList.add("cell");

        cell.id = `cell-${square}`;

        const icon =
            categoryIcons[
                Math.floor(
                    Math.random() *
                    categoryIcons.length
                )
            ];

        cell.innerHTML = `

            <div class="cell-number">
                ${square}
            </div>

            <div class="token-container">
            </div>

            <div class="cell-icon">
                ${icon}
            </div>

        `;

        board.appendChild(cell);

    }

}
/* =====================================
   RENDER TOKENS
===================================== */

function renderTokens() {

    document
        .querySelectorAll(".token-container")
        .forEach(container => {

            container.innerHTML = "";

        });

    players.forEach((player, index) => {

        const square =
            document.getElementById(
                `cell-${player.position}`
            );

        if (!square) return;

        const tokenContainer =
            square.querySelector(
                ".token-container"
            );

        const token =
            document.createElement("div");

        token.classList.add(
            "token",
            tokenClasses[index]
        );

        token.title = player.name;

        tokenContainer.appendChild(token);

    });

}

/* =====================================
   UPDATE SCOREBOARD
===================================== */

function updateScoreboard() {

    const scoreboard =
        document.getElementById(
            "scoreboard"
        );

    scoreboard.innerHTML = "";

    players.forEach((player, index) => {

        const card =
            document.createElement("div");

        card.classList.add(
            "player-card"
        );

        if (
            index === currentPlayerIndex
        ) {

            card.classList.add(
                "current-turn"
            );

        }

        card.innerHTML = `

            <strong>
                ${player.name}
            </strong>

            <br>

            Position:
            ${player.position}

        `;

        scoreboard.appendChild(card);

    });

}

/* =====================================
   CURRENT PLAYER DISPLAY
===================================== */

function updateCurrentPlayer() {

    if (!players.length) return;

    document
        .getElementById(
            "currentPlayer"
        )
        .textContent =
            players[
                currentPlayerIndex
            ].name;

}

/* =====================================
   DICE ANIMATION
===================================== */

let rolling = false;

function rollDice() {

    if (rolling) return;

    if (!gameStarted) return;

    const currentPlayer =
        players[currentPlayerIndex];

    if (
        currentPlayer.finished
    ) {

        moveToNextPlayer();
        return;

    }

    rolling = true;

    const dice =
        document.getElementById(
            "dice"
        );

    dice.classList.add(
        "rolling"
    );

    let animationCount = 0;

    const animation =
        setInterval(() => {

            const randomFace =
                Math.floor(
                    Math.random() * 6
                ) + 1;

            dice.textContent =
                randomFace;

            animationCount++;

            if (
                animationCount >= 12
            ) {

                clearInterval(
                    animation
                );

                const finalRoll =
                    Math.floor(
                        Math.random() * 6
                    ) + 1;

                dice.classList.remove(
                    "rolling"
                );

                dice.textContent =
                    finalRoll;

                movePlayer(
                    finalRoll
                );

                rolling = false;

            }

        }, 90);

}

/* =====================================
   MOVE PLAYER
===================================== */

function movePlayer(
    rolledNumber
) {

    const player =
        players[
            currentPlayerIndex
        ];

    let newPosition =
        player.position +
        rolledNumber;

    if (
        newPosition > BOARD_SIZE
    ) {

        newPosition =
            BOARD_SIZE;

    }

    player.position =
        newPosition;

    renderTokens();

    setTimeout(() => {

        checkSnakesAndLadders();

    }, 400);

}
/* =====================================
   SNAKES & LADDERS
===================================== */

function checkSnakesAndLadders() {

    const player =
        players[currentPlayerIndex];

    let message = "";

    if (
        snakes[player.position]
    ) {

        const oldPos =
            player.position;

        player.position =
            snakes[player.position];

        message = `
🐍 ${player.name}
slid down from
${oldPos} to
${player.position}
`;

    }

    if (
        ladders[player.position]
    ) {

        const oldPos =
            player.position;

        player.position =
            ladders[player.position];

        message = `
🪜 ${player.name}
climbed from
${oldPos} to
${player.position}
`;

    }

    renderTokens();

    if (message !== "") {

        document
            .getElementById(
                "gameStatus"
            )
            .textContent =
                message;

    }

    showQuestion();

}

/* =====================================
   RANDOM QUESTION
===================================== */

function showQuestion() {

    const mode =
        document
            .getElementById(
                "gameMode"
            )
            .value;

    let questionPool = [];
    let categoryTitle =
        "English Challenge";

    if (
        mode === "speaking"
    ) {

        questionPool =
            QUESTIONS.speaking;

        categoryTitle =
            "🗣 Speaking";

    }

    else if (
        mode === "vocabulary"
    ) {

        questionPool =
            QUESTIONS.vocabulary;

        categoryTitle =
            "📚 Vocabulary";

    }

    else if (
        mode === "grammar"
    ) {

        questionPool =
            QUESTIONS.grammar;

        categoryTitle =
            "✏️ Grammar";

    }

    else {

        const categories = [

            {
                title:
                    "🗣 Speaking",
                data:
                    QUESTIONS.speaking
            },

            {
                title:
                    "📚 Vocabulary",
                data:
                    QUESTIONS.vocabulary
            },

            {
                title:
                    "✏️ Grammar",
                data:
                    QUESTIONS.grammar
            }

        ];

        const selected =
            categories[
                Math.floor(
                    Math.random() *
                    categories.length
                )
            ];

        categoryTitle =
            selected.title;

        questionPool =
            selected.data;

    }

    const randomQuestion =
        questionPool[
            Math.floor(
                Math.random() *
                questionPool.length
            )
        ];

    document
        .getElementById(
            "questionCategory"
        )
        .textContent =
            categoryTitle;

    document
        .getElementById(
            "questionText"
        )
        .textContent =
            randomQuestion;

    document
        .getElementById(
            "questionModal"
        )
        .classList.remove(
            "hidden"
        );

}

/* =====================================
   CLOSE QUESTION
===================================== */

function closeQuestion() {

    document
        .getElementById(
            "questionModal"
        )
        .classList.add(
            "hidden"
        );

    checkWinnerStatus();

}
/* =====================================
   WINNER CHECK
===================================== */

function checkWinnerStatus() {

    const player =
        players[currentPlayerIndex];

    if (
        player.position >= 100 &&
        !player.finished
    ) {

        player.finished = true;

        finishedPlayers.push(
            player.name
        );

        showWinnerPopup(
            player.name
        );

        updateRankingBoard();

    }

    updateScoreboard();

    moveToNextPlayer();

}

/* =====================================
   WINNER POPUP
===================================== */

function showWinnerPopup(
    playerName
) {

    let place = "";

    switch (
        finishedPlayers.length
    ) {

        case 1:
            place = "🥇 First Place";
            break;

        case 2:
            place = "🥈 Second Place";
            break;

        case 3:
            place = "🥉 Third Place";
            break;

        default:
            place = "🏅 Finished";
            break;

    }

    document
        .getElementById(
            "winnerTitle"
        )
        .textContent =
            place;

    document
        .getElementById(
            "winnerMessage"
        )
        .textContent =
            `${playerName} reached square 100!`;

    document
        .getElementById(
            "winnerModal"
        )
        .classList.remove(
            "hidden"
        );

}

/* =====================================
   CLOSE WINNER
===================================== */

function closeWinner() {

    document
        .getElementById(
            "winnerModal"
        )
        .classList.add(
            "hidden"
        );

}

/* =====================================
   RANKING BOARD
===================================== */

function updateRankingBoard() {

    const board =
        document.getElementById(
            "rankingBoard"
        );

    board.innerHTML = "";

    finishedPlayers.forEach(
        (player, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.classList.add(
                "rank-item"
            );

            let medal = "🏅";

            if (index === 0)
                medal = "🥇";

            if (index === 1)
                medal = "🥈";

            if (index === 2)
                medal = "🥉";

            item.innerHTML = `
                ${medal}
                ${player}
            `;

            board.appendChild(
                item
            );

        }
    );

}

/* =====================================
   NEXT PLAYER
===================================== */

function moveToNextPlayer() {

    let attempts = 0;

    do {

        currentPlayerIndex++;

        if (
            currentPlayerIndex >=
            players.length
        ) {

            currentPlayerIndex = 0;

        }

        attempts++;

    }

    while (

        players[
            currentPlayerIndex
        ].finished &&

        attempts <
        players.length

    );

    updateCurrentPlayer();

    updateScoreboard();

}

/* =====================================
   RESTART GAME
===================================== */

function restartGame() {

    const confirmReset =
        confirm(
            "Restart the game?"
        );

    if (!confirmReset)
        return;

    players = [];

    finishedPlayers = [];

    currentPlayerIndex = 0;

    gameStarted = false;

    document
        .getElementById(
            "setupScreen"
        )
        .classList.remove(
            "hidden"
        );

    document
        .getElementById(
            "gameScreen"
        )
        .classList.add(
            "hidden"
        );

    document
        .getElementById(
            "scoreboard"
        )
        .innerHTML = "";

    document
        .getElementById(
            "rankingBoard"
        )
        .innerHTML = "";

    document
        .getElementById(
            "board"
        )
        .innerHTML = "";

    document
        .getElementById(
            "gameStatus"
        )
        .textContent = "";

    document
        .getElementById(
            "dice"
        )
        .textContent = "🎲";

}

/* =====================================
   GAME COMPLETE CHECK
===================================== */

function allPlayersFinished() {

    return players.every(
        player =>
        player.finished
    );

}
