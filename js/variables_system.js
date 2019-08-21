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
    ['Le Cure-dent', 500, 1, 1, "sword0", "epee",1],//(nom, prix, strenght, stamina ,image, type, bonus ), type = epee ou cape, bonus c'est les degats en + ou la vie en + en fonction de son type.
    ['La Fisteuse', 5000, 40, 190, "sword1", "epee",100],
    ['La Defourailleuse de Fion', 15000, 150, 280, "sword2", "epee",200],
    ['L Ecarteuleuse', 30000, 399, 501, "sword3", "epee",400],
    ['La Fendanus', 50000, 600, 740, "sword4", "epee",600],
    ['La Douce Pin', 100000, 1000, 900, "sword5", "epee",800],
    ['La Hrustchnurps', 180000, 1350, 1000, "sword6", "epee",1000],
    ['La Aie Sapik', 250000, 2000, 1200, "sword7", "epee",1500],
    ['Le Demon De Minuit', 666666, 6666, 6666, "sword8", "epee",2666],
    ['Cape Haute', 500, 6, 1, "cloak0", "cloak",60],
    ['Cape Oral', 1800, 18, 4, "cloak1", "cloak",120],
    ['Cape Cake', 4700, 36, 12, "cloak2", "cloak",240],
    ['Cape Pougne', 8000, 100, 20, "cloak3", "cloak",480],
    ['Cape Risti', 10000, 240, 60, "cloak4", "cloak",800],
    ['Cape Rice Des Dieux', 15000, 500, 120, "cloak5", "cloak",1000],
    ['Cape Ayrokei', 22000, 850, 200, "cloak6", "cloak",1200],
    ['Cape Udepied', 28000, 1000, 380, "cloak7", "cloak",1500],
    ['Cape De Staline', 40000, 1500, 669, "cloak8", "cloak",2000]
];
var itemsShopBought = [];
var incremenationItemShopBought = 0;
//4.0 Cookies system
var allValues; //var qui contiendra toutes les valeurs de vars.
