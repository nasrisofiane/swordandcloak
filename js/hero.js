var heroBarreViehtml = document.getElementById("barre-de-vie");
var heroBarreXphtml = document.getElementById("barre-xp");
var heroXpNumber = document.getElementById("experience-number");
var heroHealthNumber = document.getElementById("health-number");
var heroNiveauhtml = document.getElementById("niveau-hero");
var heroCaracteristiquehtml = document.getElementById("stats");
var heroStaminahtml = document.getElementById("stamina");
var heroStrenghthtml = document.getElementById("strenght");
var damageDeal = document.getElementById("degat-envoyer");
var porteMonnaieArgent = document.getElementById("argent");
var porteMonnaieLogo = document.getElementById("logo-porte-monnaie");

var heroXpMax = 150;
var heroXpActuel = 0;
var heroNiveau = 1;
var heroCaracteristique = 0;
var heroBarreVie = 150;
var heroStamina =0;
var heroStrenght =0;
var heroArgent = 0;
var degatsHero = 1 + (heroStrenght*1.7) ;
var heroXpRestant;



heroBarreViehtml.max = heroBarreVie;
heroBarreXphtml.max = heroXpMax;
displayHeroInfo();

function augmenterXp_Argent(){
    //augement l'experience du hero a chaque mort du monstre//  

    heroXpActuel += monsterChoosed.experience;
    heroArgent += monsterChoosed.argent;
    console.log("Il reste "+heroXpRestant + " xp a gagner");
    if(heroXpActuel >= heroXpMax){
        lvlUp();
     }
    displayHeroInfo();
}

function displayHeroInfo(){
    porteMonnaieArgent.innerHTML = heroArgent;
    heroNiveauhtml.innerHTML = `LEVEL ${heroNiveau}`;
    heroBarreViehtml.value = heroBarreVie;
    heroHealthNumber.innerHTML =  `${heroBarreVie.toFixed(1)} / ${heroBarreViehtml.max}`;
    heroBarreXphtml.value = heroXpActuel;
    heroXpNumber.innerHTML = `${heroXpActuel} / ${heroBarreXphtml.max}`;
    heroBarreXphtml.max = heroXpMax;
}

function lvlUp(){ 
    degatsHero = 1 + (heroStrenght*1.7) ;
    heroNiveau += 1;
    heroCaracteristique = heroCaracteristique +2;
    heroBarreVie = heroBarreViehtml.max +100;
    heroBarreViehtml.max = heroBarreVie;
    heroXpMax = heroXpMax +30;
    heroXpActuel = 0;
    displayHeroInfo();
}

function regenHealthPoint(){
    heroBarreVie = heroBarreViehtml.max ;
    displayHeroInfo();
}

function caracteristique(){

    
}

//creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.
class combatText{
    constructor(degat){
        this.pos = 0;
        this.para = document.createElement("div");
        this.text = document.createTextNode(degat.toFixed(1));
        this.para.appendChild(this.text);
        this.para.style.position = "absolute";
        damageDeal.appendChild(this.para);
    }

    activate(){
        this.interval = setInterval(moveCombatText, 15, dmgToText);
    }
}

function moveCombatText(objet){
    objet.pos += 5;
    objet.para.style.top = `${objet.pos}px`;
   if(objet.pos > 650){
       objet.para.parentNode.removeChild(objet.para);
       clearInterval(objet.interval);
    }
}   


function create(degat){
    dmgToText= new combatText(degat);
    dmgToText.activate();
}
// FIN DE :creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.
