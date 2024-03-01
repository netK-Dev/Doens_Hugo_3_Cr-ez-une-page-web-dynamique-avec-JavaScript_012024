// Récupération des éléments du DOM
const btnEdit = document.getElementById('btnModifier');
const galleryWorks = document.querySelector(".gallery");
const modal = document.getElementById("modale");
const btnCloseModal = document.getElementById("fermerModale");
const btnAddPhoto = document.getElementById("addPic");
const inputImage = document.getElementById("imageUpload");
const displayImage = document.getElementById("showImg");
const inputImageArea = document.querySelector(".inputImg-area");
const inputTitle = document.getElementById("title");
const inputCategory = document.getElementById("category");
const btnSubmit = document.querySelector(".submit-button");
const form = document.getElementById("photoUploadForm");

let title = "";
let image = "";
let category = "";



// Ecouteur de l'évènement load sur la page
window.addEventListener('load', function() {

    // Initialisation de la page au chargement
    initPage();
    filterListener();


    // vérifie si le token existe
    const userToken = this.localStorage.getItem('token');
    if (userToken != null) {
        // si il existe, on initialise la session
        sessionInit();

        // Pour gérer la déconnection
        const btnLogOut = document.getElementById('logout');
        btnLogOut.addEventListener("click", () => {
            this.localStorage.removeItem('token');
            this.window.location.href = "index.html";
        });

        // Bouton pour afficher la modale
        btnEdit.addEventListener('click', () => {
            document.getElementById('modale').showModal();
            initModalGallery();
        });

        // Pour gérer la fermeture de la modale
        btnCloseModal.addEventListener("click", () => {
            document.getElementById('modale').close();
        });
        modal.addEventListener("click", function(event) {
            if (event.target === this) {
                // Si on clique hors de la modale, on la ferme
                document.getElementById('modale').close();
            };
        });

        // Bouton pour ajouter une photo
        btnAddPhoto.addEventListener("click", () => {
            // Vérifie l'état du formulair
            checkFormCompletion();
            // Affiche le formulaire
            initAddWork();
        });

        
        
        // Formulaire d'ajout
        inputImage.addEventListener("change", function() {
            if (this.files && this.files[0]) {
                image = URL.createObjectURL(this.files[0]);
                displayImage.style.backgroundImage = 'url(' + image + ')';
                image = this.files[0];
                displayImage.style.backgroundSize = 'cover';
                displayImage.style.backgroundPosition = 'center';
                inputImageArea.style.display = "none";
                displayImage.style.display = "block";
            } else {
                inputImageArea.style.display = "flex";
                displayImage.style.display = "none";
                image = "";
            }
            // vérification de l'états du formulaire
            checkFormCompletion();
        });
    
        inputTitle.addEventListener("change", () => {
            title = inputTitle.value.trim();
            console.log(title);
            // vérification de l'états du formulaire
            checkFormCompletion(); 
        });
    
        inputCategory.addEventListener("change", () => {
            category = inputCategory.value;
            console.log(category);
            // vérification de l'états du formulaire
            checkFormCompletion(); 
        });


        // Gérer l'envoie du formulaire
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const data = {title, image, category};
            // Envoie de la requete
            sendWork(data);
            // Réinitialise le formulair
            form.reset();
            inputImageArea.style.display = "flex";
            displayImage.style.display = "none";
            title = "";
            image = "";
            category = "";
            btnCloseModal.click();
        });
    };
});