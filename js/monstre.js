var getMonsterWindow = document.getElementById("monster");
var getMonsterName = document.getElementById("monster-name");
var getMonsterHealthBar = document.getElementById("monster-health-bar");
const monsters = [ // tableau des noms de monstres et infos
    ['Le mage ancestral', 'images/disciple', 5], // premier index est égal au nom du monstre, le deuxième au chemin du sprite et le troisième au nombre de sprites pour l'animé.
    ['La chèvre en robe', 'images/chevreWarrior', 1],
    ['Le cancer', 'images/mage', 1],
    ['La grosse tête', 'images/grosseTete', 1],
    ['La diarhée hantée', 'images/diarhee', 1]
];

class monster{ // Objet qui permet de créer un monstre en passant en paramètres son nom , level et sa difficulté.
    constructor(nom, level, difficulte){
        this.nom = nom;
        this.level = level;
        this.difficulte = difficulte;
        this.stamina = (10 + level) * difficulte;
        this.strength = (4 + level) * difficulte;
        this.vie = this.stamina * 1.7 * level * this.difficulte;
        this.degats = this.strength * 1.2 * level * this.difficulte;
        this.experience = (30 * this.level) * this.difficulte;
        this.argent = (this.level * this.difficulte) * 4.5;
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
        this.elementHtml.style.backgroundPosition = "center";
    }
}
 
var monsterChoosed;
var monsterImage;
function monsterRandomPop(){ // fonction avec un random number qui récupère aléatoirement le nom d'un monstre dans le tableau "monsters"
    
        var RandomMonsterNumber = Math.floor(Math.random()*5);
        monsterChoosed = new monster( monsters[RandomMonsterNumber][0], 1 ,1);
        monsterImage = new spriteImage(getMonsterWindow, monsters[RandomMonsterNumber][1]);// créer une instance de l'objet spriteImage.
        monsterDisplayInfos(monsterChoosed);
        monsterImage.apply(0); //applique l'image 0 du monstre au lancement de la page, sinon le monstre ne s'afficher qu'àprès le premier setInterval.
        var intervalMonsterImage = startInterval(monsterImage,monsters[RandomMonsterNumber][2]);
    
    
   
  
    
}

function monsterDisplayInfos(monstreInfos){
    
    getMonsterHealthBar.max = monstreInfos.vie;
    getMonsterHealthBar.value = monstreInfos.vie;
    getMonsterName.innerHTML = monstreInfos.nom; 
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