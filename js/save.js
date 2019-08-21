

function restore(){
    //if(localStorage.getItem("saved")){
    for(let i = 0; i< localStorage.length; i++){
        parseJson(localStorage.key(i));
    }
    monsterChoosed = 0;
    restoreMonsterChoosed();
    restoreItems();
    displayHeroInfo();
    //localStorage.removeItem("saved");
    //}
    //else{
        
    //save();
    //}
}


function stringifyJson(key, objet){
    var toStringItem = JSON.stringify(objet);
    localStorage.setItem(key ,toStringItem);
   }
   
function parseJson(key){
    var parseItem = JSON.parse(localStorage.getItem(key));
    return window[key] = parseItem;
}

function save(){
    //localStorage.setItem("saved", true);
    stringifyJson("monsterChoosed", monsterChoosed);
    stringifyJson("swordSaved", itemsShop[equippedSword]);
    stringifyJson("lastEquippedSword", equippedSword);
    stringifyJson("cloakSaved", itemsShop[equippedCloak]);
    stringifyJson("lastEquippedCloak", equippedCloak);
    stringifyJson("RandomMonsterNumber", RandomMonsterNumber);
    stringifyJson("RandomDifficulte", RandomDifficulte);
    stringifyJson("heroXpMax", heroXpMax);
    stringifyJson("heroNiveau", heroNiveau);
    stringifyJson("heroStamina", heroStamina);
    stringifyJson("heroStrenght", heroStrenght);
    stringifyJson("heroCaracteristique", heroCaracteristique);
    stringifyJson("hpWithoutStamina", hpWithoutStamina);
    stringifyJson("dmgWithoutStrength", dmgWithoutStrength);
    stringifyJson("heroXpActuel", heroXpActuel);
    stringifyJson("heroArgent", heroArgent);
}
var restoreMonster;
var lastEquippedSword;
var lastEquippedCloak;
var swordSaved;
var cloakSaved;
function restoreMonsterChoosed(){
    restoreMonster = parseJson("monsterChoosed");
    clearActualMonster();
    monsterRandomPop(true);
}

function restoreItems(){
    itemsShop[lastEquippedSword].equipeItem(true);
    itemsShop[lastEquippedCloak].equipeItem(true);
}