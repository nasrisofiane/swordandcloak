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
