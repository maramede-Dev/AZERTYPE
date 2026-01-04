
/**
 * Cette fonction affiche dans le console le score de l'utilisateur
 * @param {number} score : Le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mot propose à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes){
//Récuperation de la zone dans laquelle on va ecrire le score
let spanScore = document.querySelector('.zoneScore span')
//Ecriture du texte
let afficheScore =`${score}/${nbMotsProposes}`
//On place le texte à l'interieur du span.
spanScore.innerText = afficheScore
}
/**
 * Cette fonction affiche une proposition, que le joueurdevra recopier,
 * dans la zone "zoneProposition"
 * @param {string} proposition : La proposition à afficher
 */
function afficherProposition(proposition){
    let zoneProposition = document.querySelector('.zoneProposition')
    console.log(zoneProposition)
    zoneProposition.innerText = proposition
}
/**
 * cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : email de la personne avec qui il veut partager son score
 * @param {string} score : le score
 */
function afficherEmail(nom, email, score){
    let mailto = `mailto: ${email}?subject=partage du score sur Azertype&body=Salut, je suis ${nom} et je viens de realiser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}
/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format.
 * Ici deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom){
if(nom.length < 2){
    throw new Error("Le nom est trop court")
}
}
/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format.
 * @param {string} email 
 * @throws {Error} 
 */
function validerEmail(email){
    let emailRegExpr = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExpr.test(email) ){
       throw new Error("L'email n'est pas valide")
    }
}
/**
 * cette fonction afiiche le message d'erreur passé en paramètre.
 * si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs.
 * @param {string} message 
 */
function afficherMessageErreur(message){
    let spanErreurMessage = document.getElementById("erreurMessage")
    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        popup.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message
}
/**
 * Cette fonction permet de récupérer les informqtions dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail){
    try {
        let baliseNom = document.getElementById('nom')
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById('email')
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)
    } catch(erreur){
        //Gérer l'erreur
        afficherMessageErreur(erreur.message)
    }
   
}

/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance 
 * la boucle de jeu correspondante
 */
function lancerJeu(){
    //initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById('btnValiderMot')
    let inputEcriture = document.getElementById('inputEcriture')

    afficherProposition(listeProposition[i])
    //Gestion de l'evenement click sur le bouton "Valider"

    btnValiderMot.addEventListener('click', ()=>{
        console.log(inputEcriture.value)
        if(listeProposition[i]===inputEcriture.value){
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if(listeProposition[i] === undefined){
            afficherProposition('Le jeu est fini')
            btnValiderMot.disabled = true
        }else{ 
            afficherProposition(listeProposition[i])
        }
    })
    //Gestion de l'evenement change sur les boutons radios.

    let listsBtnRadio = document.querySelectorAll('.optionSource input')
    for (let index = 0; index < listsBtnRadio.length; index++) {
        listsBtnRadio[index].addEventListener('change', (event)=>{
            console.log(event.target.value)
            if(event.target.value === "1"){
                listeProposition = listeMots
            }else{
                listeProposition = listePhrases
            }
            afficherProposition(listeProposition[i])
        })  
    }

   let form = document.querySelector('form')
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        let scoreEmail = `${score}/${i}`
        gererFormulaire(scoreEmail)
        
    })
    afficherResultat(score, i)
}
