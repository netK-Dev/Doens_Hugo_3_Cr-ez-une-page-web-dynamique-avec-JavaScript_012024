async function fetchTravaux() {
    let Travaux;
    try {
        const rep = await fetch("http://localhost:5678/api/works"); // Récupération des travaux sur l'API
        if (!rep.ok) {
            throw new Error(`Erreur HTTP : ${rep.status}`); // Échec avec l'API
        }
        Travaux = await rep.json(); // Conversion des données au format JSON
        console.log("Travaux récupérés :", Travaux);
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        Travaux = [];
    }
    return Travaux;
}


async function initPage() {
    lstTravaux = await fetchTravaux();
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