/*****************************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à lùaffichage et à la fermeture
 * de lq popup de partage:
 * 
 ****************************************************************************************/
/**
 * Cette fonction affiche la popup pour partager son score.
 */
function afficherPopup(){
    let popupBackground = document.querySelector(".popupBackground")
    //La popup est masquée par défaut (display:none), ajouter la classe "active"
    // Va changer son display et la rendre visible.
    popupBackground.classList.add("active")
}
/**
 * Cette fonction cache la popup pour partager son score.
 */
function cacherPopup(){
    let popupBackground = document.querySelector(".popupBackground")
    //La popup est masquée par défaut (display:none), supprimer  la classe "active"
    // Va rétablir cet affichage par défaut.
    popupBackground.classList.remove("active")
}
/**
 * Cette fonction initialise les ecouteurs d'évenements qui concernent
 * l'affichage de la popup.
 */
function initAddEventListenerPopup(){
    // On écoute le click sur le bouton "parteger"
    let btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("Click", ()=>{
        //Quand on a clické sur le bouton partagé, on affiche la popup
        afficherPopup()
    })
    //On ecoute le click sur la div "popupBackground"
    popupBackground.addEventListener("Click", (event)=>{
        //Si on a cliqué sur la popupBackground
        //(et pas un autre élément qui se trouve la dedant)
        if(event.target===popupBackground){
            //Alors on cache la popup
            cacherPopup()
        }
    })
}
