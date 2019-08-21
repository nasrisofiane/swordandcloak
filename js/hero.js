displayHeroInfo();
function augmenterXp_Argent(){ // fonction d'incrémentation d'argent et d'exp à chaque mort de monstre, et appel levelUP si l'exp depasse 100%.
    //augement l'experience du hero a chaque mort du monstre//  
    heroXpActuel += monsterChoosed.experience;
    heroArgent += monsterChoosed.argent;
    if(heroXpActuel >= heroXpMax){
        lvlUp();
     }
    displayHeroInfo();
}

function displayHeroInfo(){ // function qui actualise toutes infos visuel avec les valeurs de variables actuel, fonction appelé à chaque fin d'action.
    updateHeroStats();
    porteMonnaieArgent.innerHTML = parseInt(Math.round(heroArgent));
    heroNiveauhtml.innerHTML = `LEVEL ${heroNiveau}`;
    heroBarreViehtml.max = heroVieMax;
    heroBarreViehtml.value = heroVie;
    heroHealthNumber.innerHTML =  `${heroVie.toFixed(1)} / ${heroBarreViehtml.max}`;
    heroBarreXphtml.value = heroXpActuel;
    heroXpNumber.innerHTML = `${heroXpActuel} / ${heroBarreXphtml.max}`;
    heroBarreXphtml.max = heroXpMax;
    strengthText.innerHTML = `Strength ${heroStrenght}`;
    staminaText.innerHTML = `Stamina ${heroStamina}`;
    skillPointText.innerHTML = `${heroCaracteristique} point(s) de statistique disponible`;
    vieTextStats.innerHTML = `Vie Max ${heroVieMax.toFixed(1)}`;
    degatTextStats.innerHTML= `Degats ${degatsHero.toFixed(1)}`;
}

function lvlUp(){  //Changements des stats ou autres au level up !
    heroNiveau += 1;
    heroCaracteristique = heroCaracteristique +2;
    hpWithoutStamina += 15;
    heroVieMax = hpWithoutStamina + staminaToHp;
    heroXpMax = heroXpMax +30; // A CHANGER
    heroXpActuel = 0;
    displayHeroInfo();
}

function regenHealthPoint(){ // regen toute la vie du hero.
    heroVie = heroVieMax;
    displayHeroInfo();
}

function caracteristique(event){ // fonction qui depense un point de stats et qui ajoute dans la force ou la stamina
    if(heroCaracteristique > 0){
        if(event.target.id == "add-strength"){
            heroStrenght += 1;
        }
        else if(event.target.id == "add-stamina"){
            heroStamina += 1;
        }
        heroCaracteristique -=1;
    }
    updateHeroStats();
    displayHeroInfo();
}

for(let i = 0; i <= 1; i++){ // boucle qui fait le tour de tout les element HTML présent pour la classe .stats-add-icon et lui ajoute la fonction  caracteristique() au click.
    statsAddIcon[i].onclick = caracteristique;
}

function updateHeroStats(){//met à jour les stats du héro avec ses modificateur pour qu'à chaque points de stats les dmg et la vie soit bien recalculer. (fonction appelée dans displayHeroInfo())
    staminaToHp = heroStamina*2;
    heroVieMax = hpWithoutStamina + staminaToHp;
    strenghtToDmg = heroStrenght * 1.7;
    degatsHero = dmgWithoutStrength + strenghtToDmg ;
}

// SYSTEM DE GAME OVER.
function gameOver(){
        if(die == true){
            clearInterval(attackinterval);
            getGameOver.style.display = "flex";
            clearInterval(gameOverInterval);
            gameOverInterval = setInterval(GameOverAnimation, 100);
            heroVie = 0;
        }
        else if(die == false){
            clearInterval(attackinterval);
            monsterChoosed.autoAttack();
            clearInterval(gameOverInterval);
            gameOverInterval = setInterval(GameOverAnimation, 30);
        }

        if(heroArgent < 1){
            heroArgent = 0;
        }
        
}

function GameOverAnimation(){
    if(die == true){
        getGameOver.style.opacity = gameOverOpacity;
        gameOverOpacity +=0.1;
        if(gameOverOpacity >=1){
            heroArgent = heroArgent / 2;
            clearInterval(gameOverInterval);
            die = false;
        }
    }
    else if(die == false){
        getGameOver.style.opacity = gameOverOpacity;
        gameOverOpacity -=0.1;
        if(gameOverOpacity <=0){
            heroVie = heroVieMax;
            getGameOver.style.display = "none";
            clearInterval(gameOverInterval);
            die = true;
        }
    }
    displayHeroInfo();
    save();     
}
getGameOver.onclick = gameOver;
//FIN DE SYSTEM DE GAMEOVER.

//Creer un combat text à droite du monstre qui affiche les degats du hero en temps reel.
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
        combatTextfontSize -= 0.1;
        combatTextOpacity -= 0.1;
        dmgToText1.para.style.opacity = combatTextOpacity;
        dmgToText1.para.style.fontSize = `${combatTextfontSize}em`;
        if(combatTextOpacity <=0){
            clearInterval(opacityDownInterval);
            combatTextOpacity = 1;
            combatTextfontSize = 1.9;
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
        dmgToText1 = new combatText(degat, elementHtml, positionDmg, ScrollOrStatic);
        dmgToText1.activate();
    }
}
// FIN DE :creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.


//skin hero, animation             
heroAnimation();
function heroAnimation(){ // créer l'animation d'attaque, le bras de héro est découpé de son corps, les mouvements de bras et d'épée sont précis.
        getHeroWeapon.style.bottom = "0px";
        getHeroSkin.style.background = `url('images/hero/heromodulable0.png')`;
        getHeroSkin.style.backgroundSize = "contain";
        getHeroSkin.style.backgroundRepeat = "no-repeat";
        getHeroSkin.style.backgroundPosition = "center";
        switch(heroImageNb){
            case 0: //chaque case représente une position différente du bras et de l'épée.
                    getHeroArm.style.left ="10px";
                    getHeroArm.style.transform = "rotate(0deg)";
                    getHeroArm.style.top = "70px";
                    getHeroWeapon.style.transform = "rotate(20deg)";
                    getHeroWeapon.style.top = "30px";
                    getHeroWeapon.style.left = "42px";
                    break;
            case 1: 
                    /*getHeroArm.style.left ="20px";
                    getHeroArm.style.transform = "rotate(-20deg)";
                    getHeroWeapon.style.left = "57px";*/
                    getHeroArm.style.left ="20px";
                    getHeroArm.style.transform = "rotate(-40deg)";
                    getHeroArm.style.top = "70px";
                    getHeroWeapon.style.transform = "rotate(0deg)";
                    getHeroWeapon.style.top = "20px";
                    getHeroWeapon.style.left = "54px";
                    break;
            case 2:
                    getHeroArm.style.left ="10px";
                    getHeroArm.style.transform = "rotate(-80deg)";
                    getHeroArm.style.top = "60px";
                    getHeroWeapon.style.transform = "rotate(-10deg)";
                    getHeroWeapon.style.top = "-5px";
                    break;
        }
        heroImageNb += 1;
        if(heroImageNb > 2){
            heroImageNb = 0;
            //getHeroSkin.style.background = `url('images/hero/heroFille${heroImageNb}.png')`;
            heroAnimation();
            clearInterval(startAttackAnimation);
         }
}

function heroWalkAnimation(){ //créer l'animation de course jusqu'au monstre.
        if(heroWalk[1] == true){
            if(heroWalk[0] < 38/*représente la distance parcourue en pourcentage sur l'écran.*/){
                heroWalk[0] +=2;
                if(equippedSword != null && equippedSword != undefined){
                    getHeroCompleteSKin.style.left = `${heroWalk[0]-5}%`;
                }
                else{
                    getHeroCompleteSKin.style.left = `${heroWalk[0]-3}%`;
                }
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

setInterval (randomBonus, 10000); //déclenche la fonction pour le bonus random


function doubleDamage (){ 
    if (bonus == true){
        degatsBonus = degatsHero*2;
        dmgWithoutStrength += degatsBonus;
        bonus = false;
    }
    else {
        dmgWithoutStrength -= degatsBonus;
        bonus = true;
    }
    updateHeroStats();
    displayHeroInfo();
}

function randomBonus () {
    var chance = Math.floor(Math.random()*3);
    if (chance == 1) {
        addElement(true);
    }

    }
    


function addElement (addOrdelete) {
    var newDiv = document.createElement("div");
    newDiv.addEventListener("click", function(){
        addElement(false); 
        doubleDamage();
        setTimeout (doubleDamage, 5000); 
    });
    if(addOrdelete == true){
        setTimeout (addElement, 7000, false)
        newDiv.id = "bonus";
        getZoneCombat.appendChild(newDiv);
       }
    else if(addOrdelete == false){
         // durée du bonus
        var getBonus = document.getElementById("bonus");
        getBonus.parentNode.removeChild(getBonus);
    }
    
}
