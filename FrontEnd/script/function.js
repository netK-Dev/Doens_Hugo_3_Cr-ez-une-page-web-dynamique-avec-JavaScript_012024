async function fetchWorks() {
    let works;
    try {
        // Récupération des travaux sur l'API
        const resp = await fetch("http://localhost:5678/api/works");
        // Vérification du statut de la réponse
        if (!resp.ok) {
            // Échec avec l'API
            throw new Error(`Erreur HTTP : ${resp.status}`);
        }
        // Conversion des données au format JSON
        works = await resp.json();
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        // Initialisation des catégories à un tableau vide en cas d'erreur
        works = [];
    }
    // Retour des travaux
    return works;
}



// Fonction pour afficher la galerie dynamiquement
async function initPage() {
    // Utilisation de fetchWorks pour obtenir la liste des travaux
    let worksList = await fetchWorks();
    galleryWorks.innerHTML = "";
    
    // Pour chaque travaux, on créer les elements figure, image et figcaption
    for (let i = 0; i < worksList.length; i++) {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        let caption = document.createElement("figcaption");

        image.setAttribute("src", worksList[i].imageUrl);
        image.setAttribute("alt", worksList[i].title);
        caption.innerText = `${worksList[i].title}`;
        figure.appendChild(image);
        figure.appendChild(caption);

        // ajout du travail a la galerie
        galleryWorks.appendChild(figure);
    };
};



async function filterListener() {
    // Chargement de la liste des travaux
    let worksList = await fetchWorks();
    let filterButtons = document.querySelectorAll(".btnFiltre");

    // Ajout d'un écouteur d'événement sur chaque bouton
    filterButtons.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            
            // Texte du bouton cliqué
            let filter = filterButton.textContent;
            if (filter == "Tous") {
                galleryWorks.innerHTML = "";
                // Copie de la liste des travaux
                const updatedList = Array.from(worksList);
                for (let i = 0; i < updatedList.length; i++) {
                    let figure = document.createElement("figure");
                    let image = document.createElement("img");
                    let caption = document.createElement("figcaption");

                    image.setAttribute("src", updatedList[i].imageUrl);
                    image.setAttribute("alt", updatedList[i].title);
                    caption.innerText = `${updatedList[i].title}`;
                    figure.appendChild(image);
                    figure.appendChild(caption);

                    // Affichage de chaque travail
                    galleryWorks.appendChild(figure);
                };
            } else if (filter == "Objects") {
                galleryWorks.innerHTML = "";

                // Création de la liste objets
                const updatedList = Array.from(worksList);
                for (let i = updatedList.length - 1; i >= 0; i--) {
                    if (updatedList[i].category.name != "Objets") {
                        updatedList.splice(i, 1);
                    };
                };
                // Création de la galerie filtré
                for (let i = 0; i < updatedList.length; i++) {
                    let figure = document.createElement("figure");
                    let image = document.createElement("img");
                    let caption = document.createElement("figcaption");

                    image.setAttribute("src", updatedList[i].imageUrl);
                    image.setAttribute("alt", updatedList[i].title);
                    caption.innerText = `${updatedList[i].title}`;
                    figure.appendChild(image);
                    figure.appendChild(caption);

                    // Affichage des travaux filtrés
                    galleryWorks.appendChild(figure);
                };
            } else if (filter == "Appartements") {
                galleryWorks.innerHTML = "";
                // Céation de la list appartements
                const updatedList = Array.from(worksList);
                for (let i = updatedList.length - 1; i >= 0; i--) {
                    if (updatedList[i].category.name != "Appartements") {
                        updatedList.splice(i, 1);
                    };
                };
                // Création de la galerie filtré
                for (let i = 0; i < updatedList.length; i++) {
                    let figure = document.createElement("figure");
                    let image = document.createElement("img");
                    let caption = document.createElement("figcaption");

                    image.setAttribute("src", updatedList[i].imageUrl);
                    image.setAttribute("alt", updatedList[i].title);
                    caption.innerText = `${updatedList[i].title}`;
                    figure.appendChild(image);
                    figure.appendChild(caption);

                    // Affichage des travaux d'appartements
                    galleryWorks.appendChild(figure);
                };
            } else if (filter == "Hôtels & restaurants") {
                galleryWorks.innerHTML = "";
                // Création de la liste Hôtels & restaurants
                const updatedList = Array.from(worksList);
                for (let i = updatedList.length - 1; i >= 0; i--) {
                    if (updatedList[i].category.name != "Hotels & restaurants") {
                        updatedList.splice(i, 1);
                    };
                };
                // Création de la galerie filtré
                for (let i = 0; i < updatedList.length; i++) {
                    let figure = document.createElement("figure");
                    let image = document.createElement("img");
                    let caption = document.createElement("figcaption");

                    image.setAttribute("src", updatedList[i].imageUrl);
                    image.setAttribute("alt", updatedList[i].title);
                    caption.innerText = `${updatedList[i].title}`;
                    figure.appendChild(image);
                    figure.appendChild(caption);

                    // Affichage des travaux d'hôtels & restaurants
                    galleryWorks.appendChild(figure);
                };
            };
        });
    });

    // Pour gérer le style des boutons filtres
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", () => {

            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove("on");
            }

            filterButtons[i].classList.add("on");
        });
    };
};



// Fonction pour initialiser la page pour les utilisateurs connecté
function sessionInit() {
    // Récupere les éléments du DOM
    const loginContainer = document.getElementById('log');
    const editHeader = document.querySelector(".editMode");
    const filters = document.querySelector('.filtres');
    const myProjectsDiv = document.querySelector(".mesProjet");
    const editProjectButton = document.getElementById("modifier");

    // Definition des style
    editHeader.style.display = "flex";
    editProjectButton.style.display = "flex";
    filters.style.display = 'none';
    myProjectsDiv.style.marginBottom = "124px";

    // Création du lien logOut
    const logoutLink = document.createElement('a');
    logoutLink.setAttribute("id", "logout");
    logoutLink.textContent = "logout";
    loginContainer.innerHTML = "";
    loginContainer.appendChild(logoutLink);
};



// Fonction pour initialiser la modale
async function initModalGallery() {
    document.querySelector(".GalleryModale").innerHTML = "";
    document.getElementById("ajoutPhoto").style.display = "none";
    document.getElementById("GalleryModaleZone").style.display = "flex";
    document.getElementById("addPic").style.display = "block";

    // Elever retour le bouton si il existe
    const backButton = document.getElementById("back");
    if (backButton) {
        backButton.remove();
    };

    // Récupération des travaux
    let works = await fetchWorks();
    
    // definie le nombre de lignes dynamiquement
    let gallery = document.querySelector(".GalleryModale");
    let rows = Math.ceil(works.length / 5);
    gallery.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Créer la galerie dans la modale
    for (let i = 0; i < works.length; i++) {
        let work = document.createElement('div');
        let square = document.createElement('div');
        let trash = document.createElement('img');

        trash.setAttribute("src", "assets/icones/trash.svg");
        square.classList.add("blackSquare");
        square.appendChild(trash);
        

        work.classList.add("modalWork");
        work.style.backgroundImage = `url(${works[i].imageUrl})`;
        work.appendChild(square);

       
        gallery.appendChild(work);
        
        // Ajout de l'événement de suppression sur chaques carrés noirs
        square.addEventListener("click", function(event) {
            event.preventDefault();
            deleteWork(works[i].id);
            initModalGallery();
            initPage();
        });
    };

};



// Fonction pour supprimer les travaux.
async function deleteWork(workId) {
    // Définition des données
    const endpoint = `http://localhost:5678/api/works/${workId}`;
    const authToken = localStorage.getItem('token');
    const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
    };

    // Envoie de la requete
    try {
        const serverResponse = await fetch(endpoint, fetchOptions);
        if (!serverResponse.ok) {
            throw new Error(`HTTP Error: ${serverResponse.status}`);
        }
        console.log('Travail supprimé avec succès');
    } catch(fetchError) {
        console.error('Error deleting work:', fetchError);
    }
}



// Fonction pour afficher le formulaire d'ajout de projet
function initAddWork() {
    const addPhotoButton = document.getElementById("ajoutPhoto");
    const iconsZone = document.querySelector(".iconeModale");

    // Modification des display
    document.getElementById("GalleryModaleZone").style.display = "none";
    addPhotoButton.style.display = "flex";
    iconsZone.style.flexDirection = "row-reverse";

    // Verifie si la flèche retour existe
    let backButtonExists = document.getElementById("back");
    if (!backButtonExists) {
        // Si elle n'existe pas, on la créer :
        const backButton = document.createElement("img");
        backButton.setAttribute("src", "assets/icones/arrow-left.svg");
        backButton.style.height = "21px";
        backButton.style.width = "21px";
        backButton.id = "back";

        // Ajout de la flèche retour
        iconsZone.appendChild(backButton);

        // Ajout de l'évenement sur le bouton retour
        backButton.addEventListener("click", () => {
            initModalGallery()
        });
    }
}



// Fonction pour vérifier si le formulaire est remplis entièrement
function checkFormCompletion() {
    // Vérifie si tous les champs requis sont remplis
    if (title !== "" && image !== "" && category !== "") {
        console.log("Tous les champs sont remplis. Prêt à soumettre.");
        // Activer le bouton
        btnSubmit.setAttribute("type", "submit");
        btnSubmit.style.backgroundColor = "#1D6154";
    }
    // Désactiver le bouton si la condition n'est pas remplie
    else {
        btnSubmit.setAttribute("type", "");
        btnSubmit.style.backgroundColor = "#ccc";
    }
}



// Fonction pour envoyer un nouveau projet a l'API
async function sendWork(workData) {
    const endpoint = 'http://localhost:5678/api/works';
    // Création du formData avec les info néséssaire a la requete
    const workFormData = new FormData();
    workFormData.append('title', workData.title);
    workFormData.append('image', workData.image); 
    workFormData.append('category', workData.category);

    const fetchOptions = {
      method: 'POST',
      body: workFormData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
  
    // Envoie de la requete
    try {
      const fetchResponse = await fetch(endpoint, fetchOptions);
      if (!fetchResponse.ok) {
        throw new Error(`HTTP Error: ${fetchResponse.status}`);
      }
      const responseWorkData = await fetchResponse.json();
      console.log('Work posted successfully:', responseWorkData);
    } catch(fetchError) {
      console.error('Error posting the work:', fetchError);
    }
    
    // Actualise sans recharger la page
    initPage();
}

