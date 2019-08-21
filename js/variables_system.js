//1.0 Variables de fonctionnement du Héro.
var heroXpMax = 150;
var heroXpActuel = 0;
var heroNiveau = 1;
var heroStamina =0;
var heroStrenght = 0;
var heroCaracteristique = 0;
var staminaToHp = heroStamina;
var strenghtToDmg = heroStrenght;
var hpWithoutStamina = 100;
var dmgWithoutStrength = 1;
var heroVieMax = hpWithoutStamina + staminaToHp;
var heroVie = heroVieMax;
var heroArgent = 500000;
var degatsHero = dmgWithoutStrength + strenghtToDmg ;
var heroXpRestant;
var equippedSword;
var equippedCloak;
var dmgToText1; //variable qui contiendra une instance d'objet pour afficher les degats.
var gameOverInterval;
var die = true; //variable qui designe la mort du héro => true = en vie.
var gameOverOpacity = 0;
var combatTextOpacity = 1;
var combatTextfontSize = 1.9;
var opacityDownInterval;
var heroImageNb = 0;
var heroWalk = [0, true]; // premier index est egal à la distance parcourue depuis le côté gauche, et le deuxieme index est egal à true pour marche avant et false pour marche arrière.
var startHeroAnimation;
var startAttackAnimation; 
var heroTimeOutWalkBack; // un set timeout est assigné quand on attack le monstre.
var bonus = true;
var degatsBonus;

//2.0 Variables de fonctionnement des monstres.
var monsterChoosed; // variable qui contiendra toutes les informations du monstre sur lequel on tape.
var attackinterval; // contient l'attaque du monstre en interval.
var MonsterAttackSpeed = Math.floor(Math.random() * 1800) + 2300 ;
var MonsterAttackSpeedToSecond;
var nombreMonstreTue = 0;//nombre de monstre tué.
var monsterMove = [0,true, 40];
var monsterImage; // chemin de l'image du monstre
var RandomDifficulte;
var RandomMonsterNumber; // nombre aléatoire entre 0 et la longueur du tableau qui contient les monstres, pour faire aparaitre un monstre aléatoirement.
var intervalMonsterImage;
var imageAlea; //nombre aleatoire generer qui sera égal à une image aléatoire du monstre actuel, pour que son animation ne soit pas pareil à chaque fois.

const monsters = [ // tableau des noms de monstres et infos
    ['Le mage ancestral', 'images/sprites/disciple', 5], // premier index est égal au nom du monstre, le deuxième au chemin de l'image et le troisième au nombre d'image disponible pour l'animé.
    ['La chèvre en robe', 'images/sprites/chevreWarrior', 1],
    ['Le cancer', 'images/sprites/mage', 1],
    ['La grosse tête', 'images/sprites/grosseTete', 1],
    ['Le chien du concierge', 'images/sprites/chienBoss', 4]
];

//3.0 Variables de fonctionnement de la boutique.
var itemNumber = 0; //Ce nombre représente le nombre d'items créer dans la boutique, est incrémenté à chaque création d'item et fournit un itemID à chaque item.
var itemsShop = [//Contient les informations des objets(boutique) en forme de tableau multidimensionn el.
    ['Le Cure-dent', 500, 1, 1, "sword1", "epee",1],//(nom, prix, strenght, stamina ,image, type, bonus ), type = epee ou cape, bonus c'est les degats en + ou la vie en + en fonction de son type.
    ['La Fisteuse', 5000, 40, 190, "sword0", "epee",200],
    ['La Defourailleuse de Fion', 50000, 499, 501, "sword2", "epee",500],
    ['Cape Haute', 500, 6, 1, "cloak0", "cloak",110],
    ['Cape Oral', 1800, 27, 4, "cloak1", "cloak",240],
    ['Cape Cake', 4700, 68, 12, "cloak2", "cloak",451]
];
var itemsShopBought = [];
var incremenationItemShopBought = 0;
//4.0 Cookies system
var allValues; //var qui contiendra toutes les valeurs de vars.
