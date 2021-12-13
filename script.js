// Variables globales : 
var div = document.querySelector('#DIV');
var long=3;
var larg=3;
var tour = 1; // 1 pour joueur1 et 2 pour joueur2 
var i,j;
var plateau = []; // Plateau contenant le jeux
var scoreJ1 = 0;
var scoreJ2 = 0;

//Fonction qui permet de modifier une case du jeu

function set(row ,colomn , player) {
  if(player == 1)
  {
    plateau[row][colomn].className="joueur1";
    tour = 2;
    var divTour = document.querySelector('#Tour');
    divTour.innerHTML="C'est au joueur 2 de jouer";
  }
  else
  {
    plateau[row][colomn].className="joueur2";
    tour = 1;
    var divTour = document.querySelector('#Tour');
    divTour.innerHTML="C'est au joueur 1 de jouer";
  }
}

// Fonction qui permet de jouer un coup

function play(ligne,colomn) {
  if(plateau[ligne][colomn].className == "")
    set(ligne,colomn,tour);
  if(partie_finie() == 1){
    alert("Le joueur 1 a gagné !!!");
    scoreJ1++;
    var score1 = document.querySelector('#Score1');
    score1.innerHTML = "Joueur 1 :" +scoreJ1;
    setTimeout(function() {
    initGame();
    }, 1000);
  }
  else if(partie_finie() == 2){
    alert("Le joueur 2 a gagné !!!");
    scoreJ2++;
    var score2 = document.querySelector('#Score2');
    score2.innerHTML = "Joueur 2 :" +scoreJ2;
    setTimeout(function() {
    initGame();
    }, 1000);
  }
  else if(partie_nulle()){
    alert("Match nul");
    initGame();
  }
  
}

// Retourne si une partie se termine sur un score nul

function partie_nulle(){
var i;
  for(i=0;i<larg;i++)
    if(plateau[long-1][i].className == "")
      return false;
  return true;
}

// Retourne le gagnant de la manche si elle est terminée

function partie_finie(){
  var i,j;
  for(i=0;i<larg-2;i++){
    for(j=0;j<long-2;j++){
      var x=plateau[i][j].className;
      if(((plateau[i][j+1].className==x) && (plateau[i][j+2].className==x) ) ||
        ((plateau[i+1][j+1].className==x) && (plateau[i+2][j+2].className==x)) ||
        ((plateau[i+1][j].className==x) && (plateau[i+2][j].className==x) ) )
      {
      if (x == 'joueur1')
        return 1;
      if(x == "joueur2")
        return 2;
      }
    }
  }
  for(i=2;i<larg;i++){
    for(j=2;j<long;j++){
      var x=plateau[i][j].className;
      if(((plateau[i][j-1].className==x) && (plateau[i][j-2].className==x) ) ||
        ((plateau[i-1][j].className==x) && (plateau[i-2][j].className==x)) )
      {
      if (x == 'joueur1')
        return 1;
      if(x == 'joueur2')
        return 2;
      }
    }
    for(j=0;j<2;j++){
      var x=plateau[i][j].className;
      if((plateau[i-1][j+1].className==x) && (plateau[i-2][j+2].className==x) ) 
      {
      if (x == 'joueur1')
        return 1;
      if(x == 'joueur2')
        return 2;
      }
    }
    for(j=0;j<2;j++){
      var x=plateau[i][j].className;
      if((plateau[i-1][j-1].className==x) && (plateau[i-2][j-2].className==x) ) 
      {
      if (x == 'joueur1')
        return 1;
      if(x == 'joueur2')
        return 2;
      }
    }
    
  }
  return 0
}

// Initialise le plateau pour une manche

function initGame(){
  
  tour = 1;
  var divTour = document.querySelector('#Tour');
  divTour.innerHTML="C'est au joueur 1 de jouer";
  plateau = [];
  div.innerHTML = '';
  for (var i = long - 1; i >= 0; i--) {
        var tr = document.createElement('tr');
        plateau[i] = [];
        for (var j = 0; j < larg; j++) {
          var td = document.createElement('td');
          td.dataset.column = j;
          td.dataset.row = i;
          tr.appendChild(td);
          plateau[i][j] = td;
        }
        div.appendChild(tr);
  }
  div.addEventListener('click', function(e) { play(parseInt(e.target.dataset.row),parseInt(e.target.dataset.column)) });
}


//le programme principal :

initGame();

// Arreter le jeu au bout de 3 minutes

setTimeout(function() {
  if(scoreJ1>scoreJ2)  
    alert("Le joueur 1 a remporter ce match sur un score de "+ scoreJ1 +" | "+ scoreJ2);
  else if(scoreJ2>scoreJ1) 
    alert("Le joueur 2 a remporter ce match sur un score de "+ scoreJ1 +" | "+ scoreJ2);
  else
    alert("Match nul");
}, 180000);


