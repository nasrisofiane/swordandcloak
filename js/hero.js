var heroBarreViehtml = document.getElementById("barre-de-vie");
var heroBarreXphtml = document.getElementById("barre-xp");
var heroNiveauhtml = document.getElementById("niveau-hero");
var heroCaracteristiquehtml = document.getElementById("stats");
var heroStaminahtml = document.getElementById("stamina");
var heroStrenghthtml = document.getElementById("strenght");
var heroXpMax = 150;
var heroXpActuel = 0;
var heroNiveau = 0;
var heroCaracteristique = 0;
var heroBarreVie = 150;
var heroStamina =0;
var heroStrenght =0;




function augmenterXp(){
    // action xp +10 a chaque mort du monstre//  

    heroXpActuel += monsterChoosed.experience;

    if(heroXpActuel >= heroXpMax){
        lvlUp();
    }

    console.log(heroXpActuel);
    console.log(heroNiveau);
}


function lvlUp(){
   
    heroNiveau += 1;
    heroCaracteristique = heroCaracteristique +2;
    heroBarreVie = heroBarreVie +100;
    heroXpMax = heroXpMax +30;
    heroXpActuel = 0;
}

function caracteristique(){

    
}


// //action si la vie du joueur est a zero (a faire le systeme de perte de vie)
// if (heroBarreVie >= 0){
//     //GameOVER//
// }
