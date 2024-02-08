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
