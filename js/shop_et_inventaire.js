var boutique = document.getElementById("boutique");
var epeeEquipe = document.getElementById("epee-equipe");
var capeEquipe = document.getElementById("cape-equipe");
var inventairePartGauche = document.getElementById("inventaire-part-gauche");
var inventairePartDroite = document.getElementById("inventaire-part-droite");
var inventaireShowInfos = document.getElementsByClassName("show-infos");
var swordInfosText = document.getElementById("inventaire-part-gauche").childNodes;
var cloakInfosText = document.getElementById("inventaire-part-droite").childNodes;
var vieTextStats = document.getElementById("vie-text");
var degatTextStats = document.getElementById("degats-text");



var itemNumber = 0;
class items{
    constructor(nom, prix, strenght, stamina ,image, type, bonus ){
        this.nom = nom;
        this.prix = prix; 
        this.image = image;
        this.strenght = strenght;
        this.stamina = stamina;
        this.type = type;
        this.bought = false;
        this.objetContainer = document.createElement("div");
        this.objetContainerPrix = document.createElement("div");
        this.objetContainerInfos = document.createElement("div");
        this.itemId = itemNumber;
        itemNumber +=1;
        if(this.type == "epee"){
            this.degat = bonus;
            this.elementHTML = epeeEquipe;
            this.objetContainerInfos.innerHTML = `<div>Degats : ${this.degat} </div> <div>Force : ${this.strenght}</div><div> Endurance : ${this.stamina} </div>`;
        }
        else{
            this.vie = bonus
            this.elementHTML = capeEquipe;
            this.objetContainerInfos.innerHTML = `<div>Vie : ${this.vie} </div> <div>Force : ${this.strenght}</div><div> Endurance : ${this.stamina} </div>`;
        }
        
        this.imageObjet();
    }

    imageObjet(){
        this.objetContainer.style.background = `url(images/weapons/${this.image}.png)`;
        this.objetContainer.style.backgroundSize = "contain";
        this.objetContainer.style.backgroundRepeat  = "no-repeat";
        this.objetContainer.className="objet";
        this.objetContainer.style.backgroundPosition  = "center";
        //test
        this.objetContainer.id = this.itemId;
        //fin de test
        this.objetContainerPrix.innerHTML = `${this.prix}`;
        this.objetContainerPrix.className = "prix-objet";
        this.objetContainerInfos.className = "infos-objet";
        this.objetContainer.appendChild(this.objetContainerPrix);
        this.objetContainer.appendChild(this.objetContainerInfos);
        boutique.appendChild(this.objetContainer);
        
    }
    
    equipeItem(){
        if(this.bought == false){
            if(heroArgent >= this.prix){
                
                heroArgent -= this.prix;
                heroStrenght += this.strenght;
                heroStamina += this.stamina;
                this.bought = true;
                this.objetContainer.style.backgroundColor = "grey";
                this.objetContainer.style.visibility = "hidden";
                if(this.type == "epee"){
                    if(equippedSword != null || equippedSword != undefined){
                        console.log("cleared");
                        itemsShop[equippedSword].desequipeItem();
                    }
                    dmgWithoutStrength += this.degat;
                    equippedSword = this.itemId;
                    swordInfosText[3].innerHTML = `Degats + ${this.degat}`;
                    swordInfosText[5].innerHTML = `Strength + ${this.strenght}`;
                    swordInfosText[7].innerHTML = `Stamina + ${this.stamina}`;
                    getHeroWeapon.style.background = `url(images/weapons/${this.image}.png)`;
                    getHeroWeapon.style.backgroundSize = "contain";
                    getHeroWeapon.style.backgroundRepeat  = "no-repeat";
                    getHeroWeapon.style.backgroundPosition  = "center";
                    
                }
                else{
                    if(equippedCloak != null || equippedCloak != undefined){
                        console.log("cleared");
                        itemsShop[equippedCloak].desequipeItem();
                    }
                    hpWithoutStamina += this.vie;
                    equippedCloak = this.itemId;
                    cloakInfosText[3].innerHTML = `vie + ${this.vie}`;
                    cloakInfosText[5].innerHTML = `Strength + ${this.strenght}`;
                    cloakInfosText[7].innerHTML = `Stamina + ${this.stamina}`;
                }
                this.elementHTML.style.background = `url(images/weapons/${this.image}.png)`;
                this.elementHTML.style.backgroundSize = "contain";
                this.elementHTML.style.backgroundRepeat  = "no-repeat";
                this.elementHTML.style.backgroundPosition  = "center";
            }
            else{
                alert("Pas assez d'or");
            }
        }
        displayHeroInfo();
    }

    desequipeItem(){
        if(this.bought == true){
            
            heroStrenght -= this.strenght;
            heroStamina -= this.stamina;
            if(this.type == "epee"){
                dmgWithoutStrength -= this.degat;
            }
            else{
                hpWithoutStamina -= this.vie;
            }
            this.elementHTML.style.background = `none`;
            this.elementHTML.style.backgroundSize = "contain";
            this.elementHTML.style.backgroundRepeat  = "no-repeat";
        }
        displayHeroInfo();
    }
}

var itemsShop = [
    new items('Le Cure-dent', 500, 1, 1, "sword1", "epee",1),
    new items('La Fisteuse', 5000, 40, 190, "sword0", "epee",200),
    new items('La Defourailleuse de Fion', 50000, 499, 501, "sword2", "epee",500),
    new items('Cape Haute', 500, 6, 1, "cloak0", "cloak",110),
    new items('Cape Oral', 1800, 27, 4, "cloak1", "cloak",240),
    new items('Cape Cake', 4700, 68, 12, "cloak2", "cloak",451)
];

/*var sword1 = new items('Le Cure-dent', 500, 4, 2, "sword1", "epee",70);
var sword2 = new items('La Fisteuse', 5000, 40, 190, "sword0", "epee",200);
var sword3 = new items('La Defourailleuse de Fion', 50000, 499, 501, "green", "epee",500);

var cloak1 = new items('Cape Haute', 500, 4, 2, "red", "epee",70);
var cloak2 = new items('Cape Oral', 500, 4, 2, "red", "epee",70);
var cloak3 = new items('Cape Cake', 500, 4, 2, "red", "epee",70);


*/
for(let i = 0; i < itemsShop.length; i++){
    itemsShop[i].objetContainer.addEventListener("click", function(){
        itemsShop[i].equipeItem();
    });
}

vieTextStats.style.fontSize = "1em";
degatTextStats.style.fontSize = "1em";