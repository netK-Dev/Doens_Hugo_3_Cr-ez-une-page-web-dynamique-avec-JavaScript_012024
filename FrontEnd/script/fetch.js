// Fonction qui récupère les travaux
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
        // tableau vide en cas d'erreur
        works = [];
    }
    // Retour des travaux
    return works;
}



// Fonction qui récupère les catégories
async function fetchCategories() {
    let categoryListe;
    try {
        // Récupération des categories sur l'API
        const resp = await fetch("http://localhost:5678/api/categories");
        // Vérification du statut de la réponse
        if (!resp.ok) {
            // Échec avec l'API
            throw new Error(`Erreur HTTP : ${resp.status}`);
        }
        // Conversion des données au format JSON
        categoryListe = await resp.json();
    } catch(error) {
        console.error("Erreur lors de la récupération des travaux :", error);
        // tableau vide en cas d'erreur
        categoryListe = [];
    }
    return categoryListe;
}



// Fonction qui supprime les travaux.
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