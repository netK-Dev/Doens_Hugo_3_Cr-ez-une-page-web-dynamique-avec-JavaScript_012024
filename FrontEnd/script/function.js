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



async function fetchCat() {
    let Categories;
    try {
        const rep = await fetch("http://localhost:5678/api/categories"); // Récupération des categiries sur l'API
        if (!rep.ok) {
            throw new Error(`Erreur HTTP : ${rep.status}`); // Échec avec l'API
        }
        Categories = await rep.json(); // Conversion des données au format JSON
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        Categories = [];
    }
    return Categories;
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



async function filterListener() {               // Fonction a modifier pour recupérer les categories dynamiquement 
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

    // Création de la galerie dans la modale
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
        
        square.addEventListener("click", function(event) {
            event.preventDefault()
            console.log(Works[i].id);
            deleteWork(Works[i].id);
        });
    };

};



async function deleteWork(workId) {
    const url = `http://localhost:5678/api/works/${workId}`;
    const token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log('Travail supprimé avec succès');
    } catch(error) {
        console.error('Erreur lors de la suppression du travail:', error);
    }
}



function initAddWork() {
    const ajoutPhoto = document.getElementById("ajoutPhoto");
    const iconesZone = document.querySelector(".iconeModale");
    document.getElementById("GalleryModaleZone").style.display = "none";
    ajoutPhoto.style.display = "flex";
    iconesZone.style.flexDirection = "row-reverse";

    // Vérifie si l'icône de la flèche retour existe déjà
    let backExists = document.getElementById("back");
    if (!backExists) {
        // Si elle n'existe pas, on la créer
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



function checkFormCompletion() {
    // Vérifie si tous les champs requis sont remplis
    if (title !== "" && img !== "" && category !== "") {
        console.log("Tous les champs sont remplis. Prêt à soumettre.");
        btnSubmit.setAttribute("type", "submit"); // Activer le bouton
        btnSubmit.style.backgroundColor = "#1D6154";
    } else {
        btnSubmit.setAttribute("type", ""); // Désactiver le bouton si la condition n'est pas remplie
        btnSubmit.style.backgroundColor = "#ccc"
    }
}



async function sendWork(data) {
    const url = 'http://localhost:5678/api/works';
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.img); 
    formData.append('category', data.category);

  
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Projet posté avec succès:', responseData);
    } catch(error) {
      console.error('Erreur lors de la publication du projet:', error);
    }
}
