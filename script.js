const screens=[...document.querySelectorAll(".screen")];
const progressBar=document.getElementById("progressBar");

function go(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  const index=screens.findIndex(s=>s.id===id);
  progressBar.style.width=((index/(screens.length-1))*100)+"%";
  window.scrollTo({top:0,behavior:"smooth"});
}

function answer(button,correct){
  const msg=document.getElementById("answerMessage");
  document.querySelectorAll(".choices button").forEach(b=>b.disabled=true);
  if(correct){
    button.style.background="rgba(201,106,130,.22)";
    button.style.borderColor="#c96a82";
    msg.textContent="Eu sabia. Você lembra. ❤️";
    setTimeout(()=>go("memoria"),1200);
  }else{
    button.style.opacity=".45";
    msg.textContent="Quase... tenta sentir a resposta. 😌";
    setTimeout(()=>button.style.opacity="1",650);
    document.querySelectorAll(".choices button").forEach(b=>b.disabled=false);
  }
}

function rollDice(){
  const dice=document.getElementById("d20");
  const number=document.getElementById("diceNumber");
  const status=document.getElementById("diceStatus");
  dice.classList.remove("rolling");
  void dice.offsetWidth;
  dice.classList.add("rolling");
  status.textContent="O destino está decidindo...";
  let ticks=0;
  const timer=setInterval(()=>{
    number.textContent=Math.floor(Math.random()*20)+1;
    ticks++;
    if(ticks>=10){
      clearInterval(timer);
      number.textContent="20";
      status.textContent="Acerto crítico. Eu escolheria você de novo. ❤️";
      setTimeout(()=>go("universo"),1600);
    }
  },80);
}

function showMemory(text){
  document.getElementById("memoryText").textContent=text;
}

function openLetter(){
  go("final");
  const letter=document.getElementById("letterText");
  const text=`Eu poderia escrever mil coisas aqui, mas nenhuma delas seria suficiente para explicar o quanto você significa para mim.

Então eu só quero que você saiba uma coisa:

entre todas as pessoas, todos os caminhos e todas as possibilidades, eu ainda escolheria você.

Obrigado por cada memória, cada risada, cada abraço e por tudo que ainda vamos viver.

Feliz aniversário, meu amor. ❤️`;
  letter.textContent="";
  let i=0;
  const type=()=>{
    if(i<text.length){
      letter.textContent+=text[i++];
      setTimeout(type,text[i-1]==="."?45:18);
    }
  };
  setTimeout(type,450);
}

function restart(){go("inicio")}

go("inicio");
