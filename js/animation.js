// Animation inventaire sur MOUSEOVER montre les infos de l'item survolé.
function showItemInfos(event){
    if(event.target.id == inventairePartGauche.id){
        inventairePartDroite.style.display = "none";
        capeEquipe.style.display = "none";
        inventairePartGauche.style.flex = "4";
        inventairePartGauche.style.fontSize = "1.3em";
        
    }
    else if(event.target.id == inventairePartDroite.id){
        inventairePartGauche.style.display = "none";
        epeeEquipe.style.display = "none";
        inventairePartDroite.style.flex = "4";
        inventairePartDroite.style.fontSize = "1.3em";
    }
}

function initialInventaireDisplay(){2
    inventairePartDroite.style.display = "flex";
    inventairePartGauche.style.display = "flex";
    inventairePartDroite.style.flex = "2";
    inventairePartGauche.style.flex = "2";
    inventairePartGauche.style.fontSize = "1em";
    inventairePartDroite.style.fontSize = "1em";
    capeEquipe.style.display = "block";
    epeeEquipe.style.display = "block";
}

for(let i = 0; i < inventaireShowInfos.length; i++){
    inventaireShowInfos[i].addEventListener("mouseover", showItemInfos);
    inventaireShowInfos[i].addEventListener("mouseout", initialInventaireDisplay);
}
//FIN DE: Animation inventaire sur MOUSEOVER montre les infos de l'item survolé.



//Animation héro
//skin hero, animation             
heroAnimation();
function heroAnimation(){ // créer l'animation d'attaque, le bras de héro est découpé de son corps, les mouvements de bras et d'épée sont précis.
        getHeroWeapon.style.bottom = "0px";
        getHeroSkin.style.background = `url('images/hero/heromodulable0.png')`;
        getHeroSkin.style.backgroundSize = "contain";
        getHeroSkin.style.backgroundRepeat = "no-repeat";
        getHeroSkin.style.backgroundPosition = "center";
        switch(heroImageNb){
            case 0: //chaque case représente une position différente du bras et de l'épée.
                    getHeroArm.style.left ="10px";
                    getHeroArm.style.transform = "rotate(0deg)";
                    getHeroArm.style.top = "70px";
                    getHeroWeapon.style.transform = "rotate(20deg)";
                    getHeroWeapon.style.top = "58px";
                    getHeroWeapon.style.left = "42px";
                    break;
            case 1: 
                    /*getHeroArm.style.left ="20px";
                    getHeroArm.style.transform = "rotate(-20deg)";
                    getHeroWeapon.style.left = "57px";*/
                    getHeroArm.style.left ="20px";
                    getHeroArm.style.transform = "rotate(-40deg)";
                    getHeroArm.style.top = "70px";
                    getHeroWeapon.style.transform = "rotate(0deg)";
                    getHeroWeapon.style.top = "20px";
                    getHeroWeapon.style.left = "54px";
                    break;
            case 2:
                    getHeroArm.style.left ="10px";
                    getHeroArm.style.transform = "rotate(-80deg)";
                    getHeroArm.style.top = "60px";
                    getHeroWeapon.style.transform = "rotate(-10deg)";
                    getHeroWeapon.style.top = "-5px";
                    break;
        }
        heroImageNb += 1;
        if(heroImageNb > 2){
            heroImageNb = 0;
            //getHeroSkin.style.background = `url('images/hero/heroFille${heroImageNb}.png')`;
            heroAnimation();
            clearInterval(startAttackAnimation);
         }
}

function heroWalkAnimation(){ //créer l'animation de course jusqu'au monstre.
        if(heroWalk[1] == true){
            if(heroWalk[0] < 38/*représente la distance parcourue en pourcentage sur l'écran.*/){
                heroWalk[0] +=2;
                if(equippedSword != null && equippedSword != undefined){
                    getHeroCompleteSKin.style.left = `${heroWalk[0]-5}%`;
                }
                else{
                    getHeroCompleteSKin.style.left = `${heroWalk[0]-3}%`;
                }
            }
            else{
              
            }
        }
        else if(heroWalk[1] == false){
            if(heroWalk[0] >= 0){
                getHeroCompleteSKin.style.left = `${heroWalk[0]}%`;
                heroWalk[0] -=2;
            }
            else{
                heroWalk[1] = true;
                clearInterval(startHeroAnimation);
            }
        }
}
//FIN DE:Animation héro.

//Creer un combat text à droite du monstre qui affiche les degats du hero en temps reel.
class combatText{
    constructor(degat, elementHtml, positionDmg, ScrollOrStatic){
        this.pos = positionDmg;
        this.ScrollOrStatic = ScrollOrStatic;
        this.para = document.createElement("div");
        this.text = document.createTextNode(`-${convertIntToText(degat)}`);
        this.para.appendChild(this.text);
        this.para.style.position = "absolute";
        this.elementHtml = elementHtml;
        this.elementHtml.appendChild(this.para);
    }

    activate(){
        if(this.ScrollOrStatic == "scroll"){
            this.interval = setInterval(moveCombatText, 15, dmgToText);
        }
        else if(this.ScrollOrStatic == "static"){
            clearInterval(opacityDownInterval);
            staticCombatText(dmgToText1, false);
            opacityDownInterval = setInterval(this.opacityDown, 100);
            setTimeout(staticCombatText, 2000,dmgToText1, true);
        }
    }

    opacityDown(){
        combatTextfontSize -= 0.1;
        combatTextOpacity -= 0.1;
        dmgToText1.para.style.opacity = combatTextOpacity;
        dmgToText1.para.style.fontSize = `${combatTextfontSize}em`;
        if(combatTextOpacity <=0){
            clearInterval(opacityDownInterval);
            combatTextOpacity = 1;
            combatTextfontSize = 1.9;
        }
    }
}

function moveCombatText(objet){
    objet.pos += 5;
    objet.para.style.top = `${objet.pos}px`;
   if(objet.pos > 650){
       objet.para.parentNode.removeChild(objet.para);
       clearInterval(objet.interval);
    }
}

function staticCombatText(objet, deleteDmg){
    objet.pos = 0;
    objet.para.style.top = `${objet.pos}px`;
   if(deleteDmg == true){
       objet.para.parentNode.removeChild(objet.para);
       clearInterval(objet.interval);
    }
}

function create(degat, elementHtml, positionDmg, ScrollOrStatic){
    if(ScrollOrStatic == "scroll"){
        dmgToText= new combatText(degat, elementHtml, positionDmg, ScrollOrStatic);
        dmgToText.activate();
    }
    else if(ScrollOrStatic == "static"){
        dmgToText1 = new combatText(degat, elementHtml, positionDmg, ScrollOrStatic);
        dmgToText1.activate();
    }
}
// FIN DE :creer un combat text à droite du monstre qui afficher les degats du hero en temps reel.

//Animation bonus
function addElement (addOrdelete) {
    bonusPos = 0;
    var newDiv = document.createElement("div");
    newDiv.id = "bonus";
    newDiv.addEventListener("click", function(){
        doubleDamage();
        addElement(false); 
        setTimeout (doubleDamage, 5000); 
    });
    if(addOrdelete == true){
        setTimeout (addElement, 7000, false);
        bonusAnimationInterval = setInterval(fallDownBonus, 40, newDiv);
        
        getZoneCombat.appendChild(newDiv);
       }
    else if(addOrdelete == false){
         // durée du bonus
        getBonus = document.getElementById("bonus");
        getBonus.parentNode.removeChild(getBonus);
    }
}

function fallDownBonus(element){
    bonusPos +=10;
    if(bonusPos >= getHeroCompleteSKin.offsetTop){
        clearInterval(bonusAnimationInterval);
    }
    return newDiv = element.style.top = `${bonusPos}px`;
}
//FIN DE:Animation bonus