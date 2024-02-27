// Fonction pour réinitialiser les erreurs
function resetErrors() {
    errorEmail.style.display = "none";
    errorPass.style.display = "none";
}



// Fonction pour se connecter
async function log(email, password) { 
    const data = { email, password };

    // Envoie de la requete avec les informations de l'utilisateur
    try {
        let respLog = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Si mot de passe incorecte
        if (respLog.status == 401) {
            errorPass.style.display = "inline";
        } 
        // Si email introuvable
        else if (respLog.status == 404) {
            errorEmail.style.display = "inline";
        }

        if (!respLog.ok) {
            throw new Error(`Erreur ${ respLog.status }: ${ await respLog.text() }`);
        }

        const user = await respLog.json();

        // stokage du token dans le localStorage
        localStorage.setItem('token', user.token);
        // Retour sur index.html
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
};


// Récupération des éléments du DOM
const errorPass = document.getElementById("wrongPass");
const errorEmail = document.getElementById("wrongEmail");
const input_email = document.getElementById("emailInput");
const input_password = document.getElementById("passInput");
const Submit = document.getElementById("btnSubmit");


Submit.addEventListener("click", (event) => {
    // Empêche le formulaire de se soumettre normalement
    event.preventDefault();
    // Réinitialise les erreurs
    resetErrors()
    // récupération de l'email
    const E = input_email.value;
    // récupération du mot de passe
    const P = input_password.value;

    // Tentative de connexion
    log(E, P);
});
