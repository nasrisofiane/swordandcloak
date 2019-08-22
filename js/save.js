function restore(){
    //if(localStorage.getItem("saved")){
    for(let i = 0; i< localStorage.length; i++){
        parseJson(localStorage.key(i));
    }
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
    if(skip != true){
    //localStorage.setItem("saved", true);
    stringifyJson("restoreMonster", monsterChoosed);
    if(equippedSword != null && equippedSword != undefined && equippedSword != "" ){
        stringifyJson("swordSaved", itemsShop[equippedSword]);
        stringifyJson("lastEquippedSword", equippedSword);
    }
    if(equippedCloak != null && equippedCloak != undefined && equippedCloak != "" ){
        stringifyJson("cloakSaved", itemsShop[equippedCloak]);
        stringifyJson("lastEquippedCloak", equippedCloak);
    }
    
    stringifyJson("itemsShopBought", itemsShopBought);
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
    console.log("nouvelle sauvegarde.");
    }
}

function restoreMonsterChoosed(){
    clearActualMonster();
    monsterRandomPop(true);
}
var newShop = [];
function restoreItems(){


    if(lastEquippedCloak != null && lastEquippedCloak != undefined && lastEquippedCloak != "" && !isNaN(lastEquippedCloak)){ 
        itemsShop[lastEquippedCloak].equipeItem(true);
        itemsShop[lastEquippedCloak].niveau = cloakSaved.niveau;
        itemsShop[lastEquippedCloak].nombreDeCoup = cloakSaved.nombreDeCoup;
        itemsShop[lastEquippedCloak].nombreCoupMax = cloakSaved.nombreCoupMax;
        itemsShop[lastEquippedCloak].vie = cloakSaved.vie;
        itemsShop[lastEquippedCloak].itemInfos();
    }
    if(lastEquippedSword != null && lastEquippedSword != undefined && lastEquippedSword != "" && !isNaN(lastEquippedSword)){
        itemsShop[lastEquippedSword].equipeItem(true);
        itemsShop[lastEquippedSword].niveau = swordSaved.niveau;
        itemsShop[lastEquippedSword].monstreTue = swordSaved.monstreTue;
        itemsShop[lastEquippedSword].nombreTue = swordSaved.nombreTue;
        itemsShop[lastEquippedSword].degat = swordSaved.degat;
        itemsShop[lastEquippedSword].itemInfos();
    }
    nextUpgrade();
    
    if(itemsShopBought.length > 0){
        for(let i = 0; i < itemsShopBought.length; i++){ 
            var id = itemsShopBought[i].itemId;
            newShop[i] = itemsShop[id];
        }
        for(let a = 0; a < newShop.length; a++){
            newShop[a].hideItem();
        }
    }
    
}

if(localStorage.getItem("heroXpMax")){
    restore();
}

function eraseGame(){
    localStorage.clear();
    skip = true;
    document.location.reload(true);
}
window.addEventListener("unload", save);
