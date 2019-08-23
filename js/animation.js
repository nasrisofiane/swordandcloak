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



