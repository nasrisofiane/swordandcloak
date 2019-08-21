class items{ //Objet(JAVASCRIPT) qui permet de créer un Objet(Boutique)
    constructor(nom, prix, strenght, stamina ,image, type, bonus){
        this.nom = nom;
        this.prix = prix; 
        this.image = image;
        this.strenght = strenght;
        this.stamina = stamina;
        this.type = type;
        this.bought = false;
        this.objetContainerParent = document.createElement("div");
        this.objetContainer = document.createElement("div");
        this.objetContainerPrix = document.createElement("div");
        this.objetContainerInfos = document.createElement("div");
        this.itemId = itemNumber;
        this.niveau = 1;
        this.monstreTue = 0;
        this.nombreTue = 10;
        this.nombreDeCoup = 0;
        this.nombreCoupMax = 5;
        itemNumber +=1;
        if(this.type == "epee"){
            this.degat = bonus * this.niveau;
            this.elementHTML = epeeEquipe;
            this.objetContainerInfos.innerHTML = `<div class ="nom">${this.nom}</div>  <div>Degats : ${this.degat} </div> <div>Force : ${this.strenght}</div><div> Endurance : ${this.stamina} </div>`;
        }
        else{
            this.vie = bonus
            this.elementHTML = capeEquipe;
            this.objetContainerInfos.innerHTML = `<div class ="nom">${this.nom}</div>  <div>Vie : ${this.vie} </div> <div>Force : ${this.strenght}</div><div> Endurance : ${this.stamina} </div>`;
        }
        this.imageObjet();
    }

    imageObjet(){// affiche l'image de l'objet dans une div dans la boutique.

        
        this.floutageDiv = document.createElement("div");
        this.floutageDiv.style.position ="absolute";
        this.floutageDiv.style.width ="100%";
        this.floutageDiv.style.height = "100%";
        this.objetContainer.appendChild(this.floutageDiv);
        this.objetContainer.style.background = `url(images/items/${this.image}.png)`;
        this.objetContainer.style.backgroundSize = "80px";
        this.objetContainer.style.backgroundRepeat  = "no-repeat";
        this.objetContainer.className="objet";
        this.objetContainer.style.backgroundPosition  = "top";
        //test
        this.objetContainer.id = this.itemId;
        //fin de test
        this.objetContainerPrix.innerHTML = `${this.prix}`;
        this.objetContainerPrix.className = "prix-objet";
        this.objetContainerInfos.className = "infos-objet";
        this.objetContainer.appendChild(this.objetContainerPrix);
        this.objetContainer.appendChild(this.objetContainerInfos);
        boutique.appendChild(this.objetContainer);
        this.objetLevel = 0;
        this.objetContainerParent.appendChild(this.objetContainer);
        this.objetContainerParent.className = "objet-parent";
        boutique.appendChild(this.objetContainerParent);
    }
    
    equipeItem(saved){ // fonction qui permet d'équipé l'objet(Jeu) visuellement et fonctionnellement. supprime l'objet de la boutique, le met dans les objets équipé et l'affiche sur héro.
        if(this.bought == false){
            if(heroArgent >= this.prix || saved == true){
                if(saved == true){
                }
                else{
                    heroArgent -= this.prix;
                    heroStrenght += this.strenght;
                    heroStamina += this.stamina;
                }
                this.hideItem();
                if(this.type == "epee"){
                    if(equippedSword != null || equippedSword != undefined){
                        console.log("cleared");
                        itemsShop[equippedSword].desequipeItem();
                    }
                    if(saved == true){

                    }
                    else{
                        this.updateDmgandVie();
                    }
                    equippedSword = this.itemId;
                    this.itemInfos();
                    getHeroWeapon.style.background = `url(images/items/${this.image}.png)`;
                    getHeroWeapon.style.backgroundSize = "contain";
                    getHeroWeapon.style.backgroundRepeat  = "no-repeat";
                    getHeroWeapon.style.backgroundPosition  = "center";
                    degatsHero -= itemsShopBought[itemsShopBought.length-1].degat;
                    console.log(itemsShopBought[itemsShopBought.length-1]);
                   
                }
                else{
                    if(equippedCloak != null || equippedCloak != undefined){
                        console.log("cleared");
                        itemsShop[equippedCloak].desequipeItem();
                    }
                    if(saved == true){

                    }
                    else{
                        hpWithoutStamina += this.vie;
                    }
                    equippedCloak = this.itemId;
                    this.itemInfos();
                }
                this.elementHTML.style.background = `url(images/items/${this.image}.png)`;
                this.elementHTML.style.backgroundSize = "contain";
                this.elementHTML.style.backgroundRepeat  = "no-repeat";
                this.elementHTML.style.backgroundPosition  = "center";
                heroVie = heroVieMax;
            }
            else{
                alert("Pas assez d'or");
            }
        }
        displayHeroInfo();
    }

    showVisuel(){
                this.hideItem();
                if(this.type == "epee"){
                    if(equippedSword != null || equippedSword != undefined){
                        console.log("cleared");
                        itemsShop[equippedSword].desequipeItem();
                    }   
                    equippedSword = this.itemId;
                    this.itemInfos();
                    getHeroWeapon.style.background = `url(images/items/${this.image}.png)`;
                    getHeroWeapon.style.backgroundSize = "contain";
                    getHeroWeapon.style.backgroundRepeat  = "no-repeat";
                    getHeroWeapon.style.backgroundPosition  = "center";
                }
                else{
                    if(equippedCloak != null || equippedCloak != undefined){
                        console.log("cleared");
                        itemsShop[equippedCloak].desequipeItem();
                    }
                    equippedCloak = this.itemId;
                    this.itemInfos();
                } 
                this.elementHTML.style.background = `url(images/items/${this.image}.png)`;
                this.elementHTML.style.backgroundSize = "contain";
                this.elementHTML.style.backgroundRepeat  = "no-repeat";
                this.elementHTML.style.backgroundPosition  = "center";
                displayHeroInfo();
    }

    itemInfos(){
        if(this.type == "epee"){
            inventairePartGauche.innerHTML = `<strong>Epée bonus</strong><p class="niveau-objet">Niveau objet : ${this.niveau}</p><p>Degats + ${this.degat}</p><p> Strength + ${this.strenght}</p><p> Stamina + ${this.stamina}</p>`;

        }
        else{
            inventairePartDroite.innerHTML = ` <strong>Cape bonus</strong><p class="niveau-objet">Niveau objet : ${this.niveau}</p><p>vie + ${this.vie}</p><p> Strength + ${this.strenght}</p><p> Stamina + ${this.stamina}</p>`;
        }
    }

    hideItem(){
        this.bought = true;
        this.floutageDiv.style.backgroundColor = "rgba(114, 112, 112, 0.431)";
        this.objetContainerPrix.innerHTML = `Acheté`;
        this.objetContainerPrix.style.color = "green";
        this.objetContainerPrix.style.background = "none";
        itemsShopBought[incremenationItemShopBought] = (itemsShop[this.itemId]);
        incremenationItemShopBought +=1;
    }

    desequipeItem(){ // Si objet est desequipper, retire toutes les stats que donnait l'objet, supprime visuellement l'objet, dans les objets équipé.
        if(this.bought == true){
            heroStrenght -= this.strenght;
            heroStamina -= this.stamina;
            if(this.type == "epee"){
                dmgWithoutStrength -= dmgWithoutStrength - this.degat;
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

    niveauObjet(){
        console.log(this.objetLevel);
    }
  
    priseDeNiveau(){
        if(this.type == "epee"){   
            if(this.monstreTue == this.nombreTue-1){
                this.nombreTue =this.nombreTue * 2;
                this.niveau += 1;
                this.degat += (this.degat * 10) /100;
                this.updateDmgandVie(); 
                this.monstreTue =0;
            }   
        } 
        if(this.type == "cloak"){
            this.nombreDeCoup += 1;
            if(this.nombreDeCoup == this.nombreCoupMax){
                this.nombreCoupMax = this.nombreCoupMax * 2;
                this.niveau += 1;
                this.vie = (this.vie *20) /100;
                hpWithoutStamina += this.vie; 
                this.nombreDeCoup =0;
                displayHeroInfo();
            }
        }
        this.itemInfos();
        nextUpgrade();      
    }

    updateDmgandVie(){
        dmgWithoutStrength += this.degat;
        displayHeroInfo();
    }
}

function nextUpgrade(){
    if(equippedSword != null && equippedSword != undefined && equippedSword != ""){
        var compteur = itemsShop[equippedSword].nombreTue;
        var decompte = itemsShop[equippedSword].monstreTue ;
        blocLvl[0].innerHTML=(`${decompte}/${compteur}`);
    }
    
    if(equippedCloak != null && equippedCloak != undefined && equippedCloak != ""){
        var compteur2 = itemsShop[equippedCloak].nombreCoupMax;
        var decompte2 = itemsShop[equippedCloak].nombreDeCoup ;
        blocLvl[1].innerHTML=(`${decompte2}/${compteur2}`);
    }
    
}




for(let i = 0; i < itemsShop.length; i++){ // boucle qui ajoute la fonction equipeItem() à tout les objets présent dans la boutique.
    itemsShop[i] = new items(itemsShop[i][0], itemsShop[i][1], itemsShop[i][2], itemsShop[i][3], itemsShop[i][4], itemsShop[i][5], itemsShop[i][6]);
    itemsShop[i].objetContainer.addEventListener("click", function(){
        itemsShop[i].equipeItem();
    });
}

vieTextStats.style.fontSize = "1em";
degatTextStats.style.fontSize = "1em";