async function log(email, password) {
    const data = { email, password };

    try {
        let respLog = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!respLog.ok) {
            throw new Error(`Erreur ${repLog.status}: ${await repLog.text()}`);
        }

        const user = await respLog.json();
        console.log(user);
        console.log(user.token);

        localStorage.setItem('token', user.token);  // stokage du token dans le localStorage
        // window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
};

const input_email = document.getElementById("emailInput");
const input_password = document.getElementById("passInput");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    const E = input_email.value;        // récupération de l'email
    const P = input_password.value;     // récupération du MDP

    log(E, P);
});
