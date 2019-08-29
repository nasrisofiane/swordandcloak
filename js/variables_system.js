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
var heroArgent = 0;
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
var bonusAnimationInterval;
var bonusPos = 0;

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
var monsterKilled;

const monsters = [ // tableau des noms de monstres et infos
    ['Le mage ancestral', 'images/sprites/disciple', 5], // premier index est égal au nom du monstre, le deuxième au chemin de l'image et le troisième au nombre d'image disponible pour l'animé.
    ['La chèvre en robe', 'images/sprites/chevreWarrior', 6],
    ['Le cancer', 'images/sprites/mage', 4],
    ['La grosse tête', 'images/sprites/grosseTete', 15],
    ['Le chien du concierge', 'images/sprites/chienBoss', 4]
];

//3.0 Variables de fonctionnement de la boutique.
var itemNumber = 0; //Ce nombre représente le nombre d'items créer dans la boutique, est incrémenté à chaque création d'item et fournit un itemID à chaque item.
var itemsShop = [//Contient les informations des objets(boutique) en forme de tableau multidimensionn el.
    ['Le Cure-dent', 500, 1, 1, "sword0", "epee",1],
    ['Le Cure-dent', 500, 1, 1, "sword0", "epee",1],//(nom, prix, strenght, stamina ,image, type, bonus ), type = epee ou cape, bonus c'est les degats en + ou la vie en + en fonction de son type.
    ['La Fisteuse', 5000, 12, 4, "sword1", "epee",8],
    ['La Defourailleuse de Fion', 15000, 21, 8, "sword2", "epee",23],
    ['L Ecarteuleuse', 30000, 35, 13, "sword3", "epee",40],
    ['La Fendanus', 50000, 52, 20, "sword4", "epee",72],
    ['La Douce Pin', 100000, 90, 35, "sword5", "epee",130],
    ['La Hrustchnurps', 180000, 130, 52, "sword6", "epee",210],
    ['La Aie Sapik', 250000, 170, 60, "sword7", "epee",235],
    ['Le Demon De Minuit', 666666, 6666, 6666, "sword8", "epee",2666],
    ['Cape Haute', 500, 1, 1, "cloak0", "cloak",20],
    ['Cape Oral', 1800, 4, 19, "cloak1", "cloak",45],
    ['Cape Cake', 4700, 7, 45, "cloak2", "cloak",98],
    ['Cape Pougne', 8000, 15, 70, "cloak3", "cloak",152],
    ['Cape Risti', 10000, 18, 95, "cloak4", "cloak",180],
    ['Cape Rice Des Dieux', 15000, 22, 120, "cloak5", "cloak",203],
    ['Cape Ayrokei', 22000, 25, 169, "cloak6", "cloak",231],
    ['Cape Udepied', 28000, 30, 187, "cloak7", "cloak",268],
    ['Cape De Staline', 40000, 45, 274, "cloak8", "cloak",354]
];

var compteur;
var decompte ;
var compteur2;
var decompte2;

//4.0 Cookies system
var itemShopBug = [];
var itemsShopBought;
var newShop = [];
var restoreMonster;
var swordSaved;
var cloakSaved;
var skip = false;


function avoidDuplicateEntries(){
    for(let b = 0; b < itemShopBug.length; b++){
        if(itemShopBug[b] == this.itemId){
            return duplicate = true;
            break;
            alert();
        }
        else{
            return duplicate = false;
        }
    }
}
var duplicate;
