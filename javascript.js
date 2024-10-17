const listeTaches = document.getElementById("listeTaches");
const inputTitreNouvelleTache = document.getElementById("titreNouvelleTache");
const inputContenuNouvelleTache = document.getElementById("contenuNouvelleTache");
const boutonAjouter = document.getElementById("ajouterTache");
const boutonFiltreTout = document.getElementById("filtreTout");
const boutonFiltreTerminee = document.getElementById("filtreTerminee");
const boutonFiltreNonTerminee = document.getElementById("filtreNonTerminee");
let sauvegardeTaches = [];

//  -- Fonction --  

//fonction ajoutant une nouvelle tâche
function ajouterTache() {
    const newLi = document.createElement("li");
    listeTaches.appendChild(newLi);
    newLi.innerHTML = `
                    <article class="classeTache">
                        <h3 class="titreTache">${inputTitreNouvelleTache.value}</h3>
                        <p class="texteTache">${inputContenuNouvelleTache.value}</p>
                        <div class="gestionTache">
                            <button type="button" name="terminer">Terminer</button>
                            <button type="button" name="supprimer">Supprimer</button>
                        </div>
                    </article>
    `;
    inputTitreNouvelleTache.value = "";
    inputContenuNouvelleTache.value = "";
    sauvegarderTaches();
}

// fonction supprimmant la tache séléctionnéé
function supprimerTache(event) {
    // Vérifie si on à bien cliqué sur le bon bouton
    if ((event.target.nodeName === "BUTTON") && (event.target.name === "supprimer")) {
        // Si oui, on supprime tout le Li parent
        listeTaches.removeChild(event.target.parentElement.parentElement.parentElement);
    }
    sauvegarderTaches();
}

// fonction terminant la tache séléctionnéé
function terminerTache(event) {
    // Vérifie si on à bien cliqué sur le bon bouton
    if ((event.target.nodeName === "BUTTON") && (event.target.name === "terminer")) {
        // Si oui, on ajoute la classe de tache terminée a tout le Li parent pour changer l'apparence
        event.target.parentElement.parentElement.parentElement.classList.add("tacheTerminee");
    }
    sauvegarderTaches();
}

// fonction de tri affichant toutes les taches
function afficheTout() {
    boutonFiltreTout.classList.add("filtreEnCours");
    boutonFiltreTerminee.classList.remove("filtreEnCours");
    boutonFiltreNonTerminee.classList.remove("filtreEnCours");
    const listeLi = document.querySelectorAll("#listeTaches li");
    listeLi.forEach(element => {
        element.classList.remove("masque");
    });
}

// fonction de tri affichant uniquement les taches terminées
function afficheTerminees() {
    boutonFiltreTerminee.classList.add("filtreEnCours");
    boutonFiltreTout.classList.remove("filtreEnCours");
    boutonFiltreNonTerminee.classList.remove("filtreEnCours");
    const listeLi = document.querySelectorAll("#listeTaches li");
    listeLi.forEach(element => {
        if (element.classList.contains("tacheTerminee")) {
            element.classList.remove("masque");
        } else {
            element.classList.add("masque");
        }
    });
}

// fonction de tri affichant uniquement les taches non-terminées
function afficheNonTerminees() {
    boutonFiltreNonTerminee.classList.add("filtreEnCours");
    boutonFiltreTout.classList.remove("filtreEnCours");
    boutonFiltreTerminee.classList.remove("filtreEnCours");
    const listeLi = document.querySelectorAll("#listeTaches li");
    listeLi.forEach(element => {
        if (element.classList.contains("tacheTerminee")) {
            element.classList.add("masque");
        } else {
            element.classList.remove("masque");
        }
    });
}

// fonction sauvegardant les tâches dans le localStorage
function sauvegarderTaches() {
    sauvegardeTaches = [];
    listeTaches.childNodes.forEach(element => {
        if (element.nodeName === "LI") {
            let sauvTitre = element.childNodes[1].childNodes[1].textContent;
            let sauvContenu = element.childNodes[1].childNodes[3].textContent;
            let sauvStatut = element.classList.contains("tacheTerminee");
            sauvegardeTaches.push({ titre: sauvTitre, contenu: sauvContenu, termine: sauvStatut });
        }
    });
    let donneesSauvegarde = JSON.stringify(sauvegardeTaches);
    localStorage.setItem("sauvegardeTaches", donneesSauvegarde);
    /*
    let svg = JSON.stringify(listeTaches.innerHTML);
    */
}

// chargement des données sauvegardées
function chargerTaches() {
    // récupération des données du local storage
    sauvegardeTaches = JSON.parse(localStorage.getItem("sauvegardeTaches"));
    console.log(sauvegardeTaches);
    //affichage des taches récupérées
    sauvegardeTaches.forEach(element => {
        const newLi = document.createElement("li");
        listeTaches.appendChild(newLi);
        newLi.innerHTML = `
                        <article class="classeTache">
                            <h3 class="titreTache">${element.titre}</h3>
                            <p class="texteTache">${element.contenu}</p>
                            <div class="gestionTache">
                                <button type="button" name="terminer">Terminer</button>
                                <button type="button" name="supprimer">Supprimer</button>
                            </div>
                        </article>
        `;
        if(element.termine){
            newLi.classList.add("tacheTerminee");
        }
    });
    /*
    let tabCharg = JSON.parse(localStorage.getItem("sauvegardeTaches"));
    listeTaches.innerHTML = tabCharg;
    */
}


// On charge les données au lancement/refresh de la page
chargerTaches();


//  -- Ecouteurs d'événements --

// ajouter une tâche
boutonAjouter.addEventListener("click", ajouterTache);


// supprimer une tâche
listeTaches.addEventListener("click", supprimerTache);

// marquer une tâche comme terminée
listeTaches.addEventListener("click", terminerTache);

// tri des tâches affichées
boutonFiltreTout.addEventListener("click", afficheTout);
boutonFiltreTerminee.addEventListener("click", afficheTerminees);
boutonFiltreNonTerminee.addEventListener("click", afficheNonTerminees);