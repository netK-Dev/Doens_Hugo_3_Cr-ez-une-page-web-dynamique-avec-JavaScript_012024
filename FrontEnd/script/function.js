async function fetchTravaux() {
    let lstTravaux;
    try {
        const rep = await fetch("http://localhost:5678/api/works"); // Récupération des travaux sur l'API
        if (!rep.ok) {
            throw new Error(`Erreur HTTP : ${rep.status}`); // Échec avec l'API
        }
        lstTravaux = await rep.json(); // Conversion des données au format JSON
        console.log("Travaux récupérés :", lstTravaux);
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        lstTravaux = [];
    }
    return lstTravaux;
}