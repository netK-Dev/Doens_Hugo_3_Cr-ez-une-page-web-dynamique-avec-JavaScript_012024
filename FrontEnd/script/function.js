async function fetchWorks() {
    let Travaux;
    try {
        const rep = await fetch("http://localhost:5678/api/works"); // Récupération des travaux sur l'API
        if (!rep.ok) {
            throw new Error(`Erreur HTTP : ${rep.status}`); // Échec avec l'API
        }
        Travaux = await rep.json(); // Conversion des données au format JSON
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        Travaux = [];
    }
    return Travaux;
}


async function initPage() {
    lstTravaux = await fetchWorks();
    galerieTravaux.innerHTML = "";
    
    for (let i=0; i<lstTravaux.length; i++) {
        let element = document.createElement("figure");
        let elementImg = document.createElement("img");
        let elementFigCap = document.createElement("figcaption");

        elementImg.setAttribute("src", lstTravaux[i].imageUrl);
        elementImg.setAttribute("alt", lstTravaux[i].title);
        elementFigCap.innerText = `${lstTravaux[i].title}`;
        element.appendChild(elementImg);
        element.appendChild(elementFigCap);

        galerieTravaux.appendChild(element);
    };
};


async function filterListener() {
    lstTravaux = await fetchWorks()
    let btnsFiltre = document.querySelectorAll(".btnFiltre");
    btnsFiltre.forEach(btnFiltre => {
        btnFiltre.addEventListener("click", () => {
            let filtre = btnFiltre.textContent;
            if (filtre == "Tous") {
                galerieTravaux.innerHTML = "";
                const newLst = Array.from(lstTravaux);
                for (let i=0; i<newLst.length; i++) {
                    let element = document.createElement("figure");
                    let elementImg = document.createElement("img");
                    let elementFigCap = document.createElement("figcaption");
            
                    elementImg.setAttribute("src", newLst[i].imageUrl);
                    elementImg.setAttribute("alt", newLst[i].title);
                    elementFigCap.innerText = `${newLst[i].title}`;
                    element.appendChild(elementImg);
                    element.appendChild(elementFigCap);
            
                    galerieTravaux.appendChild(element);
                    console.log("Tout les travaux sont affichés");
                };
            } else if (filtre == "Objects") {
                galerieTravaux.innerHTML = "";
                const newLst = Array.from(lstTravaux);
                for (let i = newLst.length-1; i>= 0; i--) {
                    if (newLst[i].category.name != "Objets") {
                        newLst.splice(i, 1);
                    };
                };
                for (let i=0; i<newLst.length; i++) {
                    let element = document.createElement("figure");
                    let elementImg = document.createElement("img");
                    let elementFigCap = document.createElement("figcaption");
            
                    elementImg.setAttribute("src", newLst[i].imageUrl);
                    elementImg.setAttribute("alt", newLst[i].title);
                    elementFigCap.innerText = `${newLst[i].title}`;
                    element.appendChild(elementImg);
                    element.appendChild(elementFigCap);
            
                    galerieTravaux.appendChild(element);
                    console.log("Les travaux de type objets sont affichés");
                };
            } else if (filtre == "Appartements") {
                galerieTravaux.innerHTML = "";
                const newLst = Array.from(lstTravaux);
                for (let i = newLst.length-1; i>= 0; i--) {
                    if (newLst[i].category.name != "Appartements") {
                        newLst.splice(i, 1);
                    };
                };
                for (let i=0; i<newLst.length; i++) {
                    let element = document.createElement("figure");
                    let elementImg = document.createElement("img");
                    let elementFigCap = document.createElement("figcaption");
            
                    elementImg.setAttribute("src", newLst[i].imageUrl);
                    elementImg.setAttribute("alt", newLst[i].title);
                    elementFigCap.innerText = `${newLst[i].title}`;
                    element.appendChild(elementImg);
                    element.appendChild(elementFigCap);
            
                    galerieTravaux.appendChild(element);
                    console.log("Les travaux de type appartements sont affichés");
                };
            } else if (filtre == "Hôtels & restaurants") {
                galerieTravaux.innerHTML = "";
                const newLst = Array.from(lstTravaux);
                for (let i = newLst.length-1; i>= 0; i--) {
                    if (newLst[i].category.name != "Hotels & restaurants") {
                        newLst.splice(i, 1);
                    };
                };
                for (let i=0; i<newLst.length; i++) {
                    let element = document.createElement("figure");
                    let elementImg = document.createElement("img");
                    let elementFigCap = document.createElement("figcaption");
            
                    elementImg.setAttribute("src", newLst[i].imageUrl);
                    elementImg.setAttribute("alt", newLst[i].title);
                    elementFigCap.innerText = `${newLst[i].title}`;
                    element.appendChild(elementImg);
                    element.appendChild(elementFigCap);
            
                    galerieTravaux.appendChild(element);
                    console.log("Les travaux de type Hotels & restaurants sont affichés");
                };
            };
        });
    });
};


function styleFilter() {
    const btnFilter = document.querySelectorAll(".btnFiltre");

    for (let i=0; i<btnFilter.length; i++) {
        btnFilter[i].addEventListener("click", () => {

            for (let x=0; x<btnFilter.length; x++) {
                btnFilter[x].classList.remove("on");
            }

            btnFilter[i].classList.add("on");
        });
    };
};


function sessionInit() {
    const cont_InOut = document.getElementById('log');
    const lien = document.createElement('a');
    const editHeader = document.querySelector(".editMode");
    const filtres = document.querySelector('.filtres');
    const divMesProjet = document.querySelector(".mesProjet");
    const modiferProjet = document.getElementById("modifier");
    
    editHeader.style.display = "flex";
    modiferProjet.style.display = "flex";
    filtres.style.display = 'none';
    divMesProjet.style.marginBottom = "124px";

    lien.setAttribute("id", "logout");
    lien.textContent = "logout";

    cont_InOut.innerHTML = "";
    cont_InOut.appendChild(lien)
};


async function initModaleGallery() {
    document.querySelector(".GalleryModale").innerHTML = "";

    document.getElementById("GalleryModaleZone").style.display = "flex";
    document.getElementById("ajoutPhoto").style.display = "none"
    const back = document.getElementById("back")
    if (back) {
        back.remove()       // enlever la fleche si elle existe
    };

    let gallery = document.querySelector(".GalleryModale");
    let Works = await fetchWorks();
    let rows = Math.ceil(Works.length / 5);
    console.log(Works);

    // Définir le nombre de lignes dans la grille de la galerie
    gallery.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Parcourir chaque élément dans Works
    for (let i = 0; i < Works.length; i++) {
        let Work = document.createElement('div');
        let square = document.createElement('div');
        let trash = document.createElement('img');

        trash.setAttribute("src", "assets/icones/trash.svg");
        square.classList.add("blackSquare");
        square.appendChild(trash);
        

        Work.classList.add("modaleWork");
        Work.style.backgroundImage = `url(${Works[i].imageUrl})`;
        Work.appendChild(square);

       
        gallery.appendChild(Work);
        
        square.addEventListener("click", () => {
            console.log(Works[i]);
        });
    };

    document.getElementById("addPic").addEventListener("click", () => {
        // fonction pour afficher le formulaire.
        console.log("Bouton cliqué..");
        initAddWork()
    });
};

function initAddWork() {
    const ajoutPhoto = document.getElementById("ajoutPhoto");

    document.getElementById("GalleryModaleZone").style.display = "none";
    ajoutPhoto.style.display = "flex";
    

    const iconesZone = document.querySelector(".iconeModale");
    iconesZone.style.flexDirection = "row-reverse";

    // Vérifiez si l'icône de la flèche retour existe déjà
    let backExists = document.getElementById("back");
    if (!backExists) {
        // Si elle n'existe pas, créez et ajoutez l'icône
        const back = document.createElement("img");
        back.setAttribute("src", "assets/icones/arrow-left.svg");
        back.style.height = "21px";
        back.style.width = "21px";
        back.id = "back";
        iconesZone.appendChild(back);  // Ajout de la flèche retour

        back.addEventListener("click", () => {
            initModaleGallery()
        });
    }
}


function inputListener() {
    const inputIMG = document.getElementById("imageUpload");
    const showIMG = document.getElementById("showImg");
    const inputIMG_area = document.querySelector(".inputImg-area");
    const inputTitle = document.getElementById("title");
    const inputCategory = document.getElementById("category");
    const btnSubmit = document.querySelector(".submit-button");
    let title = "";
    let img = "";
    let category = "";

    // Désactiver le bouton de soumission initialement
    btnSubmit.setAttribute("type", "");

    function checkFormCompletion() {
        // Vérifie si tous les champs requiss sont remplis
        if (title !== "" && img !== "" && category !== "") {
            console.log("Tous les champs sont remplis. Prêt à soumettre.");
            btnSubmit.setAttribute("type", "submit"); // Activer le bouton
            btnSubmit.style.backgroundColor = "#1D6154";
            submitWork()
        } else {
            btnSubmit.setAttribute("type", ""); // Désactiver le bouton si la condition n'est pas remplie
        }
    }

    inputIMG.addEventListener("change", function() {
        if (this.files && this.files[0]) {
            img = URL.createObjectURL(this.files[0]);
            showIMG.style.backgroundImage = 'url(' + img + ')';
            showIMG.style.backgroundSize = 'cover';
            showIMG.style.backgroundPosition = 'center';
            inputIMG_area.style.display = "none";
            showIMG.style.display = "block";
        } else {
            inputIMG_area.style.display = "flex";
            showIMG.style.display = "none";
            img = ""; // Réinitialiser img si aucun fichier n'est sélectionné
        }
        checkFormCompletion(); // Vérifier après chaque modification
    });

    inputTitle.addEventListener("change", () => {
        title = inputTitle.value.trim();
        console.log(title);
        checkFormCompletion(); // Vérifier après chaque modification
    });

    inputCategory.addEventListener("change", () => {
        category = inputCategory.value;
        console.log(category);
        checkFormCompletion(); // Vérifier après chaque modification
    });
}

async function submitWork() {
    const formulaire = document.getElementById("photoUploadForm");

    formulaire.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("envoyer !")
    });
}


