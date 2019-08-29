displayHeroInfo();

function heroAtStartGame(){
    equippedSword = 0;
    heroArgent += itemsShop[equippedSword].prix;
    itemsShop[equippedSword].equipeItem();
    
}

function augmenterXp_Argent(){ // fonction d'incrémentation d'argent et d'exp à chaque mort de monstre, et appel levelUP si l'exp depasse 100%.
    //augement l'experience du hero a chaque mort du monstre//  
    heroXpActuel += monsterChoosed.experience;
    if(heroXpActuel > heroXpMax){
        var xpOver = heroXpActuel - heroXpMax;
    }
    
    heroArgent += monsterChoosed.argent;
    if(heroXpActuel >= heroXpMax){
        lvlUp();
        heroXpActuel += xpOver;
     }
    displayHeroInfo();
}

function displayHeroInfo(){ // function qui actualise toutes infos visuel avec les valeurs de variables actuel, fonction appelé à chaque fin d'action.
    updateHeroStats();
    porteMonnaieArgent.innerHTML = parseInt(Math.round(heroArgent));
    heroNiveauhtml.innerHTML = `LEVEL ${heroNiveau}`;
    heroBarreViehtml.max = heroVieMax;
    heroBarreViehtml.value = heroVie;
    heroHealthNumber.innerHTML =  `${convertIntToText(heroVie)} / ${convertIntToText(heroBarreViehtml.max)}`;
    heroBarreXphtml.value = heroXpActuel;
    heroXpNumber.innerHTML = `${convertIntToText(heroXpActuel)} / ${convertIntToText(heroBarreXphtml.max)}`;
    heroBarreXphtml.max = heroXpMax;
    strengthText.innerHTML = `Strength ${convertIntToText(heroStrenght)}`;
    staminaText.innerHTML = `Stamina ${convertIntToText(heroStamina)}`;
    skillPointText.innerHTML = `${heroCaracteristique} point(s) de statistique disponible`;
    vieTextStats.innerHTML = `Vie Max ${convertIntToText(heroVieMax)}`;
    degatTextStats.innerHTML= `Degats ${convertIntToText(degatsHero)}`;
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

//System de bonus pour héro.
function doubleDamage (){ 
    if (bonus == true){
        degatsBonus = heroStrenght +1 * 1.4;
        heroStrenght += degatsBonus;
        bonus = false;
        bonusPos=0;
    }
    else {
        heroStrenght -= degatsBonus;
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
    console.log("bonus ? "+chance);
}
setInterval (randomBonus, 10000); //déclenche la fonction pour le bonus random
//FIN DE: system bonus pour héro.