
let players=[],current=0,finished=[];
const snakes={98:78,95:56,62:18,48:26};
const ladders={3:22,8:30,28:84,58:77};

function startGame(){
const count=parseInt(document.getElementById('playerCount').value);
players=[];
for(let i=0;i<count;i++){
let n=document.querySelectorAll('#names input')[i].value||`Player ${i+1}`;
players.push({name:n,pos:1});
}
document.getElementById('setup').classList.add('hidden');
document.getElementById('game').classList.remove('hidden');
createBoard();
updateAll();
}

function createBoard(){
const board=document.getElementById('board');
board.innerHTML='';
for(let i=100;i>=1;i--){
const d=document.createElement('div');
d.className='cell';
d.id='cell'+i;
d.innerHTML=i;
board.appendChild(d);
}
}

function rollDice(){
let diceBox=document.getElementById('dice');
let ticks=0;
let anim=setInterval(()=>{
diceBox.textContent=Math.floor(Math.random()*6)+1;
ticks++;
if(ticks>10){
clearInterval(anim);
let roll=Math.floor(Math.random()*6)+1;
diceBox.textContent='🎲 '+roll;
movePlayer(roll);
}
},100);
}

function movePlayer(roll){
let p=players[current];
if(finished.includes(p.name)){nextTurn();return;}
p.pos=Math.min(100,p.pos+roll);
if(snakes[p.pos]) p.pos=snakes[p.pos];
if(ladders[p.pos]) p.pos=ladders[p.pos];

if(p.pos===100 && !finished.includes(p.name)){
finished.push(p.name);
}

showQuestion();
updateAll();
nextTurn();
}

function nextTurn(){
let tries=0;
do{
current=(current+1)%players.length;
tries++;
}while(finished.includes(players[current].name)&&tries<players.length);
updateAll();
}

function updateAll(){
document.querySelectorAll('.playerToken').forEach(e=>e.remove());
players.forEach((p,i)=>{
let cell=document.getElementById('cell'+p.pos);
if(cell){
let s=document.createElement('div');
s.className='playerToken';
s.textContent=['🔴','🔵','🟢','🟡'][i];
cell.appendChild(s);
}
});

document.getElementById('scoreboard').innerHTML=players.map(p=>`${p.name}: ${p.pos}`).join('<br>');
document.getElementById('turnInfo').textContent=players[current].name;

document.getElementById('rankings').innerHTML=finished.map((n,i)=>`${['🥇','🥈','🥉','🏅'][i]} ${n}`).join('<br>');
}

function showQuestion(){
const mode=document.getElementById('mode').value;
let bank=[];
if(mode==='mixed'){
bank=[...QUESTIONS.speaking,...QUESTIONS.vocabulary,...QUESTIONS.grammar];
}else{
bank=QUESTIONS[mode];
}
const q=bank[Math.floor(Math.random()*bank.length)];
document.getElementById('questionArea').innerHTML='<h3>English Challenge</h3><p>'+q+'</p>';
}

function restartGame(){location.reload();}

