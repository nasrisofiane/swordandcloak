// Création du monstre, affichage de l'image.
var monsterChoosed; // variable qui contiendra une nouvelle instance de l'objet monstre
var attackinterval;
var monsterImage; // chemin de l'image du monstre
var getMonsterWindow = document.getElementById("monster");
var getMonsterName = document.getElementById("monster-name");
var getMonsterHealthBar = document.getElementById("monster-health-bar");
var getHealthValueMonster = document.getElementById("health-value-monster"); //Element HTML pour afficher la vie actuel du monstre
const monsters = [ // tableau des noms de monstres et infos
    ['Le mage ancestral', 'images/sprites/disciple', 5], // premier index est égal au nom du monstre, le deuxième au chemin du sprite et le troisième au nombre de sprites pour l'animé.
    ['La chèvre en robe', 'images/sprites/chevreWarrior', 1],
    ['Le cancer', 'images/sprites/mage', 1],
    ['La grosse tête', 'images/sprites/grosseTete', 1],
    ['Le chien du concierge', 'images/sprites/chienBoss', 4]
];
getMonsterWindow.onclick = damageOnMonster;
class monster{ // Objet qui permet de créer un monstre en passant en paramètres son nom , level et sa difficulté.
    constructor(nom, level, difficulte){
        this.nom = nom;
        this.level = level;
        this.difficulte = difficulte;
        this.stamina = (10 + level) * difficulte;
        this.strength = (4 + level) * difficulte;
        this.vie = this.stamina * 1.7 * level * this.difficulte;
        this.degats = this.strength * 1.2 + level * this.difficulte;
        this.experience = (15 + this.level) * this.difficulte;
        this.argent = (this.level * this.difficulte) * 10;
    }

    attack(){
        heroBarreVie -= monsterChoosed.degats;
        
        if(heroBarreVie <= 0){
            alert("GAME OVER");
            heroBarreVie = 0;
        }
        displayHeroInfo();
        console.log("test");
    }

    autoAttack(){
        return attackinterval = setInterval(monsterChoosed.attack, 2600);
    }
   
}

class spriteImage{ //Objet qui récupère le background et lui applique le css qui lui permet de bien centrer l'image sur la DIV.
    constructor(elementHtml, backgroundImage){
        this.elementHtml = elementHtml;
        this.backgroundImage = backgroundImage; // url de l'image sans l'extension
        this.urlImage = `url(${this.backgroundImage}`; // ajoute le préfixe css + le chemin de l'image sans l'extension
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
 
function monsterRandomPop(){ // fonction avec un random number qui récupère aléatoirement le nom d'un monstre dans le tableau "monsters"
        var RandomDifficulte = Math.floor(Math.random()*2);
        var RandomMonsterNumber = Math.floor(Math.random()*5);
        monsterChoosed = new monster( monsters[RandomMonsterNumber][0], heroNiveau , RandomDifficulte);
        monsterImage = new spriteImage(getMonsterWindow, monsters[RandomMonsterNumber][1]);// créer une instance de l'objet spriteImage.
        monsterImage.apply(0); //applique l'image 0 du monstre au lancement de la page, sinon le monstre ne s'afficher qu'àprès le premier setInterval.
        monsterChoosed.autoAttack();
        var intervalMonsterImage = startInterval(monsterImage,monsters[RandomMonsterNumber][2]);
        //infos du monstre
            getMonsterHealthBar.max = monsterChoosed.vie;
            getMonsterName.innerHTML = monsterChoosed.nom; 
            checkMonsterHealth(monsterChoosed);
            
}

function checkMonsterHealth(monstreInfos){
    if(monstreInfos.vie > 0){
        getMonsterHealthBar.value = monstreInfos.vie;
        getHealthValueMonster.innerHTML = `${monstreInfos.vie.toFixed(1)} / ${getMonsterHealthBar.max}`;
        
    }
    else{
        augmenterXp_Argent();
        clearActualMonster();
        clearInterval(attackinterval);
        monsterRandomPop();
        regenHealthPoint();
    }
    
    
}

function animation(nbImage, monster){ // Paramètres nbImage qui définit le nombre de sprite possible pour que le random number n'aille pas chercher un sprite non existant ce paramètre est envoyé depuis la foncton "startInterval()"
    var imageAlea = Math.floor(Math.random(+1)*nbImages);
    monster.apply(imageAlea); // nombre aleatoire sera envoyé à la fonction de l'objet et affichera l'image généré aléatoirement.
}

function startInterval(instanceName, nbImages){ //instanceName qui récupère l'instance créer pour l'envoyé en paramète dans les autres fonction et objets.
    this.instanceName = instanceName;
    this.nbImages = nbImages;
    return test = setInterval(animation, 400, this.nbImages, this.instanceName);
}

function clearActualMonster(){
    clearInterval(test);
    monsterChoosed = null;
    monsterImage = null;
    getMonsterWindow.style.background = "none";
}
monsterRandomPop();


//degats onclick sur le monstre à l'ecran
function damageOnMonster(){
    
    monsterChoosed.vie -= degatsHero;
    create(degatsHero);
    checkMonsterHealth(monsterChoosed);
}


clearInterval(attackinterval);