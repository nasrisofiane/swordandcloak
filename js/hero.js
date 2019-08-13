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
var strengthText = document.getElementById("strength-text");
var staminaText = document.getElementById("stamina-text");
var skillPointText = document.getElementById("skill-point-text");
var statsAddIcon = document.getElementsByClassName("stats-add-icon");
var getHeroSkin = document.getElementById("hero");
var getHeroWeapon = document.getElementById("weapon");
var getHeroCompleteSKin = document.getElementById("player-character-window");
var getReceivedDamage = document.getElementById("received-dmg");

var heroXpMax = 150;
var heroXpActuel = 0;
var heroNiveau = 1;
var heroStamina =0;
var heroStrenght =0;
var heroCaracteristique = 2;
var heroVieMax = 100 + (heroStamina * 1.3);
var heroVie = heroVieMax;
var heroArgent = 0;
var degatsHero = 1 + (heroStrenght*1.7) ;
var heroXpRestant;

heroBarreViehtml.max = heroVieMax;
heroBarreXphtml.max = heroXpMax;
displayHeroInfo();
var dmgToText1;
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
    heroBarreViehtml.max = heroVieMax;
    heroBarreViehtml.value = heroVie;
    heroHealthNumber.innerHTML =  `${heroVie.toFixed(1)} / ${heroBarreViehtml.max}`;
    heroBarreXphtml.value = heroXpActuel;
    heroXpNumber.innerHTML = `${heroXpActuel} / ${heroBarreXphtml.max}`;
    heroBarreXphtml.max = heroXpMax;
    strengthText.innerHTML = `Strength ${heroStrenght}`;
    staminaText.innerHTML = `Stamina ${heroStamina}`;
    skillPointText.innerHTML = `${heroCaracteristique} stat point(s)`;
    
}

function lvlUp(){  
    degatsHero = 1 + (heroStrenght*1.7) ;
    heroNiveau += 1;
    heroCaracteristique = heroCaracteristique +2;
    heroVieMax += 5;
    heroBarreViehtml.max = heroVieMax;
    heroXpMax = heroXpMax +30;
    heroXpActuel = 0;
    displayHeroInfo();
}

function regenHealthPoint(){ // regen toute la vie du hero.
    heroVie = heroVieMax;
    displayHeroInfo();
}

function caracteristique(event){ // fonction qui depense un point de stats et qui ajoute dans la force ou la stamina
    console.log(event.target.id);
    if(heroCaracteristique > 0){
        if(event.target.id == "add-strength"){
            heroStrenght += 1;
            degatsHero += 1 *1.7 ;
        }
        else if(event.target.id == "add-stamina"){
            heroStamina += 1;
            heroVieMax += 1 * 1.4;
        }
        heroCaracteristique -=1;
    }
    else{
       
    }
    displayHeroInfo();
}

for(var i = 0; i <= 1; i++){
    statsAddIcon[i].onclick = caracteristique;
   
}


//creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.
var opacity = 1;
var fontSize = 1.9;
var opacityDownInterval;
class combatText{
    constructor(degat, elementHtml, positionDmg, ScrollOrStatic){
        this.pos = positionDmg;
        this.ScrollOrStatic = ScrollOrStatic;
        this.para = document.createElement("div");
        this.text = document.createTextNode(`-${degat.toFixed(1)}`);
        this.para.appendChild(this.text);
        this.para.style.position = "absolute";
        this.elementHtml = elementHtml;
        this.elementHtml.appendChild(this.para);
    }

    activate(){
        if(this.ScrollOrStatic == "scroll"){
            this.interval = setInterval(moveCombatText, 15, dmgToText);
        }
        else if(this.ScrollOrStatic == "static"){
            clearInterval(opacityDownInterval);
            staticCombatText(dmgToText1, false);
            opacityDownInterval = setInterval(this.opacityDown, 100);
            setTimeout(staticCombatText, 2000,dmgToText1, true);
        }
    }

    opacityDown(){
        fontSize -= 0.1;
        opacity -= 0.1;
        dmgToText1.para.style.opacity = opacity;
        dmgToText1.para.style.fontSize = `${fontSize}em`;
        if(opacity <=0){
            clearInterval(opacityDownInterval);
            opacity = 1;
            fontSize = 1.9;
        }
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

function staticCombatText(objet, deleteDmg){
    objet.pos = 0;
    objet.para.style.top = `${objet.pos}px`;
   if(deleteDmg == true){
       objet.para.parentNode.removeChild(objet.para);
       clearInterval(objet.interval);
    }
    
}


function create(degat, elementHtml, positionDmg, ScrollOrStatic){
    if(ScrollOrStatic == "scroll"){
        dmgToText= new combatText(degat, elementHtml, positionDmg, ScrollOrStatic);
        dmgToText.activate();
    }
    else if(ScrollOrStatic == "static"){
        dmgToText1= new combatText(degat, elementHtml, positionDmg, ScrollOrStatic);
        dmgToText1.activate();
    }
    
}
// FIN DE :creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.


//skin hero, animation
var heroImageNb = 0;
var heroWalk = [0, true]; // premier index est egal à la distance parcourue depuis le côté gauche, et le deuxieme index est egal à true pour marche avant et false pour marche arrière.
var startHeroAnimation;
var startAttackAnimation; 
var heroTimeOutWalkBack; // un set timeout est assigné quand on attack le monstre.

heroAnimation();
function heroAnimation(){
        getHeroWeapon.style.bottom = "0px";
        getHeroSkin.style.background = `url('images/hero/heroFille${heroImageNb}.png')`;
        getHeroSkin.style.backgroundSize = "contain";
        getHeroSkin.style.backgroundRepeat = "no-repeat";
        getHeroSkin.style.backgroundPosition = "center";
        switch(heroImageNb){
            case 0:
                    getHeroWeapon.style.left = "10px";
                    break;
            case 1: 
                    getHeroWeapon.style.left = "15px";
                    break;
            case 2:
                    getHeroWeapon.style.left = "21px";
                    break;
        }
        heroImageNb += 1;
        if(heroImageNb > 2){
            heroImageNb = 0;
            getHeroSkin.style.background = `url('images/hero/heroFille${heroImageNb}.png')`;
            getHeroWeapon.style.left = "10px";
            getHeroSkin.style.backgroundSize = "contain";
            getHeroSkin.style.backgroundRepeat = "no-repeat";
            getHeroSkin.style.backgroundPosition = "center";
            clearInterval(startAttackAnimation);
         }
         
}

function heroWalkAnimation(){
        if(heroWalk[1] == true){
            if(heroWalk[0] < 40){
                getHeroCompleteSKin.style.left = `${heroWalk[0]}%`;
                heroWalk[0] +=2;
            }
            else{
              
            }
        }
        else if(heroWalk[1] == false){
            if(heroWalk[0] >= 0){
                getHeroCompleteSKin.style.left = `${heroWalk[0]}%`;
                heroWalk[0] -=2;
            }
            else{
                heroWalk[1] = true;
                clearInterval(startHeroAnimation);
            }
        }
        
}




