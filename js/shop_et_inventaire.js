var boutique = document.getElementById("boutique");
var epeeEquipe = document.getElementById("epee-equipe");
var capeEquipe = document.getElementById("cape-equipe");
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
        if(this.type == "epee"){
            this.degat = bonus;
            this.elementHTML = epeeEquipe;
        }
        else{
            this.vie = bonus
            this.elementHTML = capeEquipe;
        }
        this.imageObjet();
    }

    imageObjet(){
        this.objetContainer.style.background = `url(images/weapons/${this.image}.png)`;
        this.objetContainer.style.backgroundSize = "contain";
        this.objetContainer.style.backgroundRepeat  = "no-repeat";
        this.objetContainer.className="objet";
        boutique.appendChild(this.objetContainer);
    }
    
    equipeItem(){
        if(this.bought == false){
            if(heroArgent >= this.prix){
                heroArgent -= this.prix;
                heroStrenght += this.strenght;
                heroStamina += this.stamina;
                this.bought = true;
                if(this.type == "epee"){
                    degatsHero += this.degat;
                }
                else{
                    heroVieMax += this.vie;
                }
                this.elementHTML.style.background = `url(images/weapons/${this.image}.png)`;
                this.elementHTML.style.backgroundSize = "contain";
                this.elementHTML.style.backgroundRepeat  = "no-repeat";
            }
            else{
                alert("Pas de bras pas de chocolat");
            }
        }
        else{
            alert("Déjà acheté.");
        }
        displayHeroInfo();
    }

    
}



var sword1 = new items('Le Cure-dent', 500, 4, 2, "sword1", "epee",70);
var sword2 = new items('La Fisteuse', 5000, 40, 190, "sword0", "epee",200);
var sword3 = new items('La Defourailleuse de Fion', 50000, 499, 501, "green", "epee",500);

var cloak1 = new items('Cape Haute', 500, 4, 2, "red", "epee",70);
var cloak2 = new items('Cape Oral', 500, 4, 2, "red", "epee",70);
var cloak3 = new items('Cape Cake', 500, 4, 2, "red", "epee",70);





