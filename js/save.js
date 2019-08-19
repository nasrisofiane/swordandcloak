if(window.localStorage.length > 0){
    getSave();
    displayHeroInfo();
}

function setCookie(cname, cvalue) {
    localStorage.setItem(cname,cvalue);
  }

function getCookie(cname) {
    return localStorage.getItem(cname);
}

function deleteAllCookies(){
      for(let b = 0; b < allValues.length; b++){
        localStorage.removeItem(allValues[b][0]);
      }
}

function getNewValues(){
  allValues = [
    ["heroXpMax", heroXpMax],
    ["heroXpActuel", heroXpActuel],
    ["heroNiveau", heroNiveau],
    ["heroStamina", heroStamina],
    ["heroStrenght", heroStrenght],
    ["heroCaracteristique",heroCaracteristique ],
    ["staminaToHp", staminaToHp = heroStamina],
    ["strenghtToDmg", strenghtToDmg = heroStrenght],
    ["hpWithoutStamina", hpWithoutStamina],
    ["dmgWithoutStrength", dmgWithoutStrength],
    ["heroVieMax", heroVieMax],
    ["heroVie", heroVie],
    ["heroArgent", heroArgent],
    ["degatsHero", degatsHero] ,
    ["heroXpRestant", heroXpRestant],
    ["equippedSword", equippedSword],
    ["equippedCloak", equippedCloak],
    ["dmgToText1", dmgToText1], 
    ["gameOverInterval", gameOverInterval],
    ["die", die], 
    ["gameOverOpacity", gameOverOpacity],
    ["combatTextOpacity", combatTextOpacity],
    ["combatTextfontSize", combatTextfontSize],
    ["opacityDownInterval", opacityDownInterval],
    ["heroImageNb", heroImageNb],
    ["heroWalk", heroWalk],
    ["startHeroAnimation", startHeroAnimation],
    ["startAttackAnimation", startAttackAnimation], 
    ["heroTimeOutWalkBack", heroTimeOutWalkBack], 
    ["itemsShopBought", itemsShopBought],
    ["incremenationItemShopBought", incremenationItemShopBought]
  ];
}
getNewValues();
function save(){
    getNewValues();
    deleteAllCookies();
    for(let i = 0; i<allValues.length; i++){
        setCookie(allValues[i][0], allValues[i][1]);
        }
}

function getSave(){
heroXpMax = parseInt(getCookie("heroXpMax"));
heroXpActuel = parseInt(getCookie("heroXpActuel"));
heroNiveau = parseInt(getCookie("heroNiveau"));
heroStamina = parseInt(getCookie("heroStamina"));
heroStrenght = parseInt(getCookie("heroStrenght"));
heroCaracteristique = parseInt(getCookie("heroCaracteristique"));
staminaToHp = parseInt(getCookie("staminaToHp"));
strenghtToDmg = parseInt(getCookie("strenghtToDmg"));
hpWithoutStamina = parseInt(getCookie("hpWithoutStamina"));
dmgWithoutStrength = parseInt(getCookie("dmgWithoutStrength"));
heroVieMax = parseInt(getCookie("heroVieMax"));
heroVie = parseInt(getCookie("heroVie"));
heroArgent = parseInt(getCookie("heroArgent"));
degatsHero = parseInt(getCookie("degatsHero"));
heroXpRestant = parseInt(getCookie("heroXpRestant"));
equippedSword = null;
equippedCloak = null;
if(!isNaN(getCookie("equippedSword")) &&  getCookie("equippedSword") != ""){
    
    heroArgent += itemsShop[parseInt(getCookie("equippedSword"))].prix;
    itemsShop[parseInt(getCookie("equippedSword"))].equipeItem();
}
if(!isNaN(getCookie("equippedCloak")) &&  getCookie("equippedCloak") != ""){
    heroArgent += itemsShop[parseInt(getCookie("equippedCloak"))].prix;
    itemsShop[parseInt(getCookie("equippedCloak"))].equipeItem();
}

clearActualMonster();
clearInterval(attackinterval);
monsterRandomPop();
/*dmgToText1; 
gameOverInterval;
die;
gameOverOpacity = 0;
combatTextOpacity = 1;
combatTextfontSize = 1.9;
opacityDownInterval;
heroImageNb = 0;
heroWalk = [0, true];
startHeroAnimation;
startAttackAnimation; 
heroTimeOutWalkBack;*/
}
  

