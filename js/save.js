
function restore(){
    //if(localStorage.getItem("saved")){
    for(let i = 0; i< localStorage.length; i++){
        parseJson(localStorage.key(i));
    }
    itemsShopBought = [...new Set(itemShopBug)]; 
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
        
    stringifyJson("itemShopBug", itemShopBug);
    if(bonus == false){
        heroStrenght -= degatsBonus;
    }
    stringifyJson("restoreMonster", monsterChoosed);
    if(equippedSword != null && equippedSword != undefined && equippedSword != "" ){
        stringifyJson("equippedSword", equippedSword);
        stringifyJson("swordSaved", itemsShop[equippedSword]); 
    }
    if(equippedCloak != null && equippedCloak != undefined && equippedCloak != "" ){
        stringifyJson("equippedCloak", equippedCloak);
        stringifyJson("cloakSaved", itemsShop[equippedCloak]);
    }
    stringifyJson("monsterLife", monsterChoosed.vie);
    stringifyJson("RandomMonsterNumber", RandomMonsterNumber);
    stringifyJson("RandomDifficulte", RandomDifficulte);
    stringifyJson("heroVie", heroVie);
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
    monsterChoosed.vie = monsterLife;
    checkMonsterHealth(monsterChoosed);
}

function restoreItems(){

    if(itemsShopBought.length > 0){
        for(let i = 0; i < itemsShopBought.length; i++){ 
            if(itemsShop[itemsShopBought[i]].type == "epee"){
                equippedSword = itemsShopBought[i];
                console.log("Arme équipée = "+equippedSword);
            }
        }
    }


    if(equippedCloak != undefined && equippedCloak != null && equippedCloak != ""){
        itemsShop[equippedCloak].bought = cloakSaved.bought;
        itemsShop[equippedCloak].niveau = cloakSaved.niveau;
        itemsShop[equippedCloak].nombreDeCoup = cloakSaved.nombreDeCoup;
        itemsShop[equippedCloak].nombreCoupMax = cloakSaved.nombreCoupMax;
        itemsShop[equippedCloak].vie = cloakSaved.vie;
        itemsShop[equippedCloak].equipeItem(true);
        itemsShop[equippedCloak].itemInfos();
        itemsShop[equippedCloak].priseDeNiveau();
        itemsShop[equippedCloak].showVisuel();
    }

    if(equippedSword != undefined && equippedSword != null && equippedSword != ""){
        itemsShop[equippedSword].bought = swordSaved.bought;
        itemsShop[equippedSword].niveau = swordSaved.niveau;
        itemsShop[equippedSword].monstreTue = swordSaved.monstreTue;
        itemsShop[equippedSword].nombreTue = swordSaved.nombreTue;
        itemsShop[equippedSword].degat = swordSaved.degat;
        itemsShop[equippedSword].itemInfos();
        itemsShop[equippedSword].equipeItem(true);
        itemsShop[equippedSword].priseDeNiveau();
        itemsShop[equippedSword].showVisuel();
    }
    checkItemsBought();
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

function checkItemsBought(){
    for(let a = 0; a < itemsShopBought.length; a++){
        itemsShop[itemsShopBought[a]].hideItem();
    }
}
displayHeroInfo();
