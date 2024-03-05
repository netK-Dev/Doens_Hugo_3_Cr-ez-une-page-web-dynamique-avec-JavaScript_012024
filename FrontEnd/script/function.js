// Fonction qui crée chaque élément de la galerie à partir d'une liste
function createGallery(liste) {
    for (let i = 0; i < liste.length; i++) {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        let caption = document.createElement("figcaption");

        image.setAttribute("src", liste[i].imageUrl);
        image.setAttribute("alt", liste[i].title);
        caption.innerText = `${liste[i].title}`;
        figure.appendChild(image);
        figure.appendChild(caption);

        // Ajout du travail à la galerie
        galleryWorks.appendChild(figure);
    };
}



// Fonction qui crée un bouton pour chaque catégorie
async function createFilterButton() {
    // On récupère les catégories avec fetchCategories
    categoryListe = await fetchCategories();
    const btnContainer = document.querySelector(".filtres");
    btnContainer.innerHTML = "";

    // Création du bouton "Tous"
    const btnAll = document.createElement("button");
    btnAll.innerHTML = "Tous";
    btnAll.setAttribute("class", "btnFiltre");
    btnAll.classList.add("on");
    btnContainer.appendChild(btnAll);

    // Création des boutons à partir de la liste de catégories
    for (let i = 0; i < categoryListe.length; i++) {
        const btn = document.createElement("button");

        btn.setAttribute("class", "btnFiltre");
        btn.innerHTML = categoryListe[i].name;

        btnContainer.appendChild(btn);
    }
}



// Fonction pour gérer le fonctionnement des boutons filtre
async function filterListener() {
    // Chargement de la liste des travaux
    let worksList = await fetchWorks();
    let filterButtons = document.querySelectorAll(".btnFiltre");

    // Ajout d'un écouteur d'événement sur chaque bouton
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            let filter = this.textContent;
            galleryWorks.innerHTML = "";

            let updatedList;
            if (filter === "Tous") {
                updatedList = worksList;
            } else {
                updatedList = worksList.filter(work => work.category.name === filter);
            }

            // Création de la galerie filtrée
            createGallery(updatedList);

            // Pour gérer le style des boutons filtres
            filterButtons.forEach(btn => btn.classList.remove("on"));
            this.classList.add("on");
        });
    });
}



// Fonction qui initialise la page
async function initPage() {
    // Utilisation de fetchWorks pour obtenir la liste des travaux
    let worksList = await fetchWorks();
    galleryWorks.innerHTML = "";

    // Création de la galerie
    createGallery(worksList);
    
    // Création des boutons de filtres
    createFilterButton();
    filterListener();
}



// Fonction pour initialiser la page pour les utilisateurs connectés
function sessionInit() {
    // Récupération des éléments du DOM
    const loginContainer = document.getElementById('log');
    const editHeader = document.querySelector(".editMode");
    const filters = document.querySelector('.filtres');
    const myProjectsDiv = document.querySelector(".mesProjet");
    const editProjectButton = document.getElementById("modifier");

    // Définition des styles
    editHeader.style.display = "flex";
    editProjectButton.style.display = "flex";
    filters.style.display = 'none';
    myProjectsDiv.style.marginBottom = "124px";

    // Création du lien logout
    const logoutLink = document.createElement('a');
    logoutLink.setAttribute("id", "logout");
    logoutLink.textContent = "logout";
    loginContainer.innerHTML = "";
    loginContainer.appendChild(logoutLink);
}



// Fonction pour initialiser la modale
async function initModalGallery() {
    // On vide la galerie à l'intérieur de la modale
    document.querySelector(".GalleryModale").innerHTML = "";
    // On cache la zone ajout photo
    document.getElementById("ajoutPhoto").style.display = "none";
    // On affiche la zone galerie modale
    document.getElementById("GalleryModaleZone").style.display = "flex";
    // On affiche le bouton ajout photo
    document.getElementById("addPic").style.display = "block";

    // Élever le bouton retour s'il existe
    const backButton = document.getElementById("back");
    if (backButton) {
        backButton.remove();
    }

    // Récupération des travaux
    let works = await fetchWorks();

    // Définir le nombre de lignes dynamiquement
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
        
        // Ajout de l'événement de suppression sur chaque carré noir
        square.addEventListener("click", () => {
            deleteWork(works[i].id);

            // Actualiser les galeries
            initPage();
            initModalGallery();
        });
    }
}



// Fonction pour afficher le formulaire d'ajout de projet
async function initAddWork() {
    const addPhotoZone = document.getElementById("ajoutPhoto");
    const iconsZone = document.querySelector(".iconeModale");
    const categoryOptions = document.getElementById("category");
    const categoryListe = await fetchCategories();

    // Modification des affichages
    document.getElementById("GalleryModaleZone").style.display = "none";
    addPhotoZone.style.display = "flex";
    iconsZone.style.flexDirection = "row-reverse";

    // On vide la liste des options
    categoryOptions.innerHTML = ""

    // Création de l'option vide
    const selectedOption = document.createElement("option");
    selectedOption.selected = true;
    categoryOptions.appendChild(selectedOption);

    // Création des options à partir des catégories disponible
    for (let i=0; i<categoryListe.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", `${i+1}`);
        option.innerHTML = categoryListe[i].name;

        categoryOptions.appendChild(option);
    }

    // Vérifie si la flèche retour existe
    let backButtonExists = document.getElementById("back");
    if (!backButtonExists) {
        // Si elle n'existe pas, on la crée
        const backButton = document.createElement("img");
        backButton.setAttribute("src", "assets/icones/arrow-left.svg");
        backButton.style.height = "21px";
        backButton.style.width = "21px";
        backButton.id = "back";

        // Ajout de la flèche retour
        iconsZone.appendChild(backButton);

        // Ajout de l'événement sur le bouton retour
        backButton.addEventListener("click", () => {
            initModalGallery();
        });
    }
}



// Fonction pour vérifier si le formulaire est rempli entièrement
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
