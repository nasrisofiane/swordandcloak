restore();

function restore(){
    getSave();
    restoreMonsterChoosed();
}

function stringifyJson(key, objet){
    var toStringItem = JSON.stringify(objet);
    localStorage.setItem(key ,toStringItem);
    console.log(toStringItem);
   }
   
function parseJson(key){
    var parseItem = JSON.parse(localStorage.getItem(key));
    return parseItem;
}

function save(){
    stringifyJson("monsterChoosed", monsterChoosed);
    stringifyJson("RandomMonsterNumber", RandomMonsterNumber);
    stringifyJson("RandomDifficulte", RandomDifficulte);
}
var restoreMonster;
function getSave(){
    
    restoreMonster = parseJson("monsterChoosed");
    RandomMonsterNumber = parseJson("RandomMonsterNumber");
    RandomDifficulte = parseJson("RandomDifficulte");
    console.log(restoreMonsterChoosed);
}

function restoreMonsterChoosed(){
    clearActualMonster();
 monsterRandomPop(true);
}
