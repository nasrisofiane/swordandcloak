getMonsterWindow.onclick = damageOnMonster;
class monster{ // Objet qui permet de créer un monstre en passant en paramètres son nom , level et sa difficulté.
    constructor(nom, level, difficulte){
        this.nom = nom;
        this.level = level;
        this.difficulte = difficulte;
        this.stamina = (10 + level) * difficulte;
        this.strength = (4 + level) * difficulte;
        this.vie = this.stamina * 0.6 * level * this.difficulte;
        this.degats = this.strength * 0.2 + level * this.difficulte;
        this.experience = (15 + this.level) * this.difficulte;
        this.argent = (this.level * this.difficulte) * 10;
    }

    attack(){
        heroVie -= monsterChoosed.degats;
        if(heroVie <= 0){
            gameOver();
        }
        displayHeroInfo();
        // animation d'attaque
        monsterChoosed.moveToHero();
        create(monsterChoosed.degats, getReceivedDamage, 0, "static");
        setTimeout(monsterChoosed.moveToHero, 300); 
        if(equippedCloak != null || equippedCloak != undefined){
        itemsShop[equippedCloak].nombreDeCoup += 1;
        itemsShop[equippedCloak].priseDeNiveau();
        }
    }

    autoAttack(){
       attackinterval = setInterval(monsterChoosed.attack, MonsterAttackSpeed);
    }

    moveToHero(){
        if(monsterMove[1] == true){
            monsterMove[2] = 42;
            getMonsterWindow.style.left = `${monsterMove[2]}%`;
            monsterMove[1] = false;
        }
        else{
            monsterMove[2] = 43;
            getMonsterWindow.style.left = `${monsterMove[2]}%`;
            clearInterval(monsterMove[0]);
            monsterMove[1]  = true;
        }
    }

    die(){
        if(this.vie <= 0){
            if(equippedSword != null || equippedSword != undefined){
                monsterKilled = setTimeout(() => {
                    itemsShop[equippedSword].monstreTue += 1;
                    itemsShop[equippedSword].priseDeNiveau();
                }, 50);
                
                }
        }
    }
}

class spriteImage{ //Objet qui récupère le background et lui applique le css qui lui permet de bien centrer l'image sur la DIV.
    constructor(elementHtml, backgroundImage){
        this.elementHtml = elementHtml;
        this.backgroundImage = backgroundImage; // url de l'image sans l'extension
        this.urlImage = `url(${this.backgroundImage}`; // ajoute la syntaxe css + le chemin de l'image sans l'extension
    }
    apply(init){
        this.initImage = init; // numéro de l'image généré aleatoirement depuis la fonction animation.
        this.elementHtml.style.background = `${this.urlImage}${this.initImage}.png)`; // concatène le tout et ajout le iniImage avant l'extension qui est le numéro de l'image.
        this.elementHtml.style.backgroundSize = "contain";
        this.elementHtml.style.backgroundSize = "contain";
        this.elementHtml.style.backgroundRepeat = "no-repeat";
        this.elementHtml.style.backgroundPosition = "bottom";
    }
}
 
function monsterRandomPop(restoreSave){ // fonction avec un random number qui récupère aléatoirement le nom d'un monstre dans le tableau "monsters"
        MonsterAttackSpeed = Math.floor(Math.random() * 1800) + 2300;
        MonsterAttackSpeedToSecond = MonsterAttackSpeed/100;
        
        if(restoreSave == true){
            monsterChoosed = new monster(restoreMonster.nom, heroNiveau, RandomDifficulte);
            monsterImage = new spriteImage(getMonsterWindow, monsters[RandomMonsterNumber][1]);
        }
        else{
            //Propriétés du monstre généré plus ou moins aléatoirement.
            if(nombreMonstreTue >= 5 && heroNiveau > 0){
                RandomDifficulte = 4;
                nombreMonstreTue = 0;
            }
            else{
                RandomDifficulte = Math.floor(Math.random()*3);
            }
            RandomMonsterNumber = Math.floor(Math.random()*5);
            //FIN DE :Propriétés du monstre généré plus ou moins aléatoirement.
            // créer une instance de l'objet spriteImage.
            monsterChoosed = new monster( monsters[RandomMonsterNumber][0], heroNiveau , RandomDifficulte);
            monsterImage = new spriteImage(getMonsterWindow, monsters[RandomMonsterNumber][1]);
            //fin de la création de l'instance spriteImage.
        }
        monsterImage.apply(0); //applique l'image 0 du monstre au lancement de la page, sinon le monstre ne s'afficher qu'àprès le premier setInterval.
        monsterChoosed.autoAttack();
        intervalMonsterImage = startInterval(monsterImage,monsters[RandomMonsterNumber][2]);
        //infos du monstre
        getMonsterHealthBar.max = monsterChoosed.vie;
        getMonsterName.innerHTML = monsterChoosed.nom; 
        getDifficulteMonster.innerHTML = `${monsterChoosed.difficulte}`;
        getDegatsTexteMonster.innerHTML = `Degats : ${monsterChoosed.degats}`;
        getVitesseAttaqueTexteMonster.innerHTML = `Vitesse D'attaque : ${MonsterAttackSpeedToSecond.toString().charAt(0)}.${MonsterAttackSpeedToSecond.toString().charAt(1)}s`;
        checkMonsterHealth(monsterChoosed);
}
function checkMonsterHealth(monstreInfos){ //vérifie la vie du monstre. fonction appelé à chaque degats infligé.
    if(monstreInfos.vie > 0){
        getMonsterHealthBar.value = monstreInfos.vie;
        getHealthValueMonster.innerHTML = `${convertIntToText(monstreInfos.vie)} / ${convertIntToText(getMonsterHealthBar.max)}`;   
    }
    else if(monstreInfos.vie <= 0){
        nombreMonstreTue +=1;
        augmenterXp_Argent();
        clearTimeout(monsterKilled);
        monsterChoosed.die();
        clearActualMonster();
        clearInterval(attackinterval);
        monsterRandomPop();
        regenHealthPoint();
        //setTimeout(save, 40);
    } 
}

function animation(nbImage, monster){ // Paramètres nbImage qui définit le nombre de sprite possible pour que le random number n'aille pas chercher un sprite non existant ce paramètre est envoyé depuis la foncton "startInterval()"
    imageAlea = Math.floor(Math.random(+1)*nbImages);
    monster.apply(imageAlea); // nombre aleatoire sera envoyé à la fonction de l'objet et affichera l'image généré aléatoirement.
}

function startInterval(instanceName, nbImages){ //instanceName qui récupère l'instance créer pour l'envoyé en paramète dans les autres fonction et objets.
    this.instanceName = instanceName;
    this.nbImages = nbImages;
    return startIntervalAnimation = setInterval(animation, 400, this.nbImages, this.instanceName);
}

function clearActualMonster(){ // nettoire les variables de fonction du monstres et son apparence. fonction appelé avant la gerenation d'un nouveau monstre.
    clearInterval(startIntervalAnimation);
    monsterChoosed = null;
    monsterImage = null;
    getMonsterWindow.style.background = "none";
    clearInterval(attackinterval);
}
monsterRandomPop();


//degats onclick sur le monstre à l'ecran
function damageOnMonster(){
    clearInterval(startHeroAnimation);// clear Interval pour eviter qu'il ne s'empile.
    clearTimeout(heroTimeOutWalkBack); // clear Timeout pour eviter qu'il ne s'empile.
    clearInterval(startAttackAnimation);
    heroWalk[1] = true;
    heroTimeOutWalkBack = setTimeout(function(){heroWalk[1] = false;},800); // si on ne clique plus pour attaquer, alors le hero revient à sa position initiale.
    startAttackAnimation = setInterval(heroAnimation, 45); // execute la fonction qui donne un coup d'épée visuellement.
    startHeroAnimation = setInterval(heroWalkAnimation,8);// execute la fonction qui deplace le héro jusqu'au monstre.
    monsterChoosed.vie -= degatsHero;
    create(degatsHero, damageDeal, 0, "scroll"); // créer une instance qui permet d'afficher un degats à l'écran.
    checkMonsterHealth(monsterChoosed);
}


