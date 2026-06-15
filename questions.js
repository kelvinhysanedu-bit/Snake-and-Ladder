/* =========================
   GLOBAL
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family: "Segoe UI", sans-serif;
    background:#0f172a;
    color:#f8fafc;
    min-height:100vh;
}

.container{
    width:95%;
    max-width:1600px;
    margin:auto;
    padding:20px;
}

.hidden{
    display:none !important;
}

/* =========================
   HEADER
========================= */

header{
    text-align:center;
    margin-bottom:25px;
}

header h1{
    color:#fbbf24;
    font-size:2.2rem;
    margin-bottom:10px;
}

header p{
    color:#cbd5e1;
}

/* =========================
   CARDS
========================= */

.card{
    background:#1e293b;
    border-radius:16px;
    padding:25px;
    box-shadow:0 0 20px rgba(0,0,0,0.25);
}

.setup-group{
    margin-bottom:20px;
}

.setup-group label{
    display:block;
    margin-bottom:8px;
    font-weight:600;
}

.setup-group input,
.setup-group select{
    width:100%;
    padding:12px;
    border:none;
    border-radius:10px;
    background:#334155;
    color:white;
    margin-bottom:10px;
}

/* =========================
   BUTTONS
========================= */

button{
    border:none;
    border-radius:12px;
    padding:12px 18px;
    cursor:pointer;
    font-size:1rem;
    font-weight:600;
    transition:0.25s;
}

button:hover{
    transform:translateY(-2px);
}

#startBtn{
    background:#fbbf24;
    color:#111827;
    width:100%;
}

#rollBtn{
    background:#3b82f6;
    color:white;
    width:100%;
    margin-bottom:10px;
}

#restartBtn{
    background:#ef4444;
    color:white;
    width:100%;
}

/* =========================
   LAYOUT
========================= */

.game-layout{
    display:grid;
    grid-template-columns:260px 1fr 260px;
    gap:20px;
}

.panel{
    background:#1e293b;
    border-radius:16px;
    padding:20px;
}

.panel h2{
    margin-bottom:12px;
    color:#fbbf24;
}

.panel hr{
    margin:20px 0;
    border:1px solid #334155;
}

/* =========================
   SCOREBOARD
========================= */

#scoreboard{
    display:flex;
    flex-direction:column;
    gap:10px;
}

.player-card{
    background:#334155;
    padding:10px;
    border-radius:10px;
}

.current-turn{
    border:2px solid #fbbf24;
}

/* =========================
   BOARD
========================= */

#board{
    display:grid;
    grid-template-columns:repeat(10,1fr);
    gap:3px;
    background:#fbbf24;
    padding:6px;
    border-radius:16px;
}

.cell{
    background:#1e293b;
    min-height:75px;
    position:relative;
    border-radius:8px;
    padding:4px;
    transition:0.2s;
}

.cell:hover{
    background:#334155;
}

.cell-number{
    font-size:12px;
    color:#94a3b8;
}

.cell-icon{
    position:absolute;
    bottom:4px;
    right:6px;
    font-size:14px;
}

/* =========================
   TOKENS
========================= */

.token-container{
    display:flex;
    flex-wrap:wrap;
    gap:2px;
    margin-top:4px;
}

.token{
    width:20px;
    height:20px;
    border-radius:50%;
    border:2px solid white;
}

.token1{
    background:#ef4444;
}

.token2{
    background:#3b82f6;
}

.token3{
    background:#22c55e;
}

.token4{
    background:#f59e0b;
}

/* =========================
   DICE
========================= */

#diceContainer{
    text-align:center;
    margin:20px 0;
}

#dice{
    width:120px;
    height:120px;
    margin:auto;
    border-radius:20px;
    background:#334155;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:4rem;
    border:3px solid #fbbf24;
}

.rolling{
    animation:shake 0.12s infinite;
}

@keyframes shake{

    0%{
        transform:rotate(-10deg);
    }

    50%{
        transform:rotate(10deg);
    }

    100%{
        transform:rotate(-10deg);
    }

}

/* =========================
   CURRENT PLAYER
========================= */

#currentPlayer{
    text-align:center;
    font-size:1.3rem;
    font-weight:bold;
    margin-bottom:15px;
}

#gameStatus{
    margin-top:20px;
    line-height:1.5;
}

/* =========================
   MODAL
========================= */

.modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:999;
}

.modal-content{
    width:90%;
    max-width:600px;
    background:#1e293b;
    padding:30px;
    border-radius:20px;
    text-align:center;
    box-shadow:0 0 30px rgba(0,0,0,0.4);
}

.modal-content h2{
    color:#fbbf24;
    margin-bottom:15px;
}

.modal-content p{
    font-size:1.2rem;
    line-height:1.6;
    margin-bottom:20px;
}

/* =========================
   RANKINGS
========================= */

#rankingBoard{
    display:flex;
    flex-direction:column;
    gap:10px;
}

.rank-item{
    background:#334155;
    padding:10px;
    border-radius:10px;
}

/* =========================
   MOBILE
========================= */

@media(max-width:1200px){

    .game-layout{
        grid-template-columns:1fr;
    }

    #board{
        order:1;
    }

}
