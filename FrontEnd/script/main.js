const btnModif = document.getElementById('btnModifier');
const galerieTravaux = document.querySelector(".gallery");
const modale = document.getElementById("modale");
const btnFermerModale = document.getElementById("fermerModale");
const btnAjoutPhoto = document.getElementById("addPic");
const inputIMG = document.getElementById("imageUpload");
const showIMG = document.getElementById("showImg");
const inputIMG_area = document.querySelector(".inputImg-area");
const inputTitle = document.getElementById("title");
const inputCategory = document.getElementById("category");
const btnSubmit = document.querySelector(".submit-button");
const formulaire = document.getElementById("photoUploadForm");

let title = "";
let img = "";
let category = "";

window.addEventListener('load', function() {
    const userToken = this.localStorage.getItem('token');
    console.log(userToken);

    if (userToken != null) {
        sessionInit();
        const btnLogOut = document.getElementById('logout');

        btnModif.addEventListener('click', () => {
            document.getElementById('modale').showModal();
            initModaleGallery();
        });
        modale.addEventListener("click", function(event) {
            if (event.target === this) {
                document.querySelector(".GalleryModale").innerHTML = "";
                document.getElementById('modale').close();
            };
        });
        btnFermerModale.addEventListener("click", () => {
            document.getElementById('modale').close();
        });


        btnAjoutPhoto.addEventListener("click", () => {
            // fonction pour afficher le formulaire.
            console.log("Bouton cliqué..");
            // Désactiver le bouton de soumission initialement
            btnSubmit.setAttribute("type", "");
            checkFormCompletion();
            initAddWork()
        });

        btnLogOut.addEventListener("click", () => {
            this.localStorage.removeItem('token');
            this.window.location.href = "index.html";
        });

        

        inputIMG.addEventListener("change", function() {
            if (this.files && this.files[0]) {
                img = URL.createObjectURL(this.files[0]);
                showIMG.style.backgroundImage = 'url(' + img + ')';
                img = this.files[0];
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


        formulaire.addEventListener("submit", function(event) {
            const data = {title, img, category};
            event.preventDefault();
            sendWork(data);
            initPage();
            console.log("envoyer !");
            formulaire.reset();
            inputIMG_area.style.display = "flex";
            showIMG.style.display = "none";
            title = "";
            img = "";
            category = "";
            btnFermerModale.click();
        });
    };
});
  

initPage()              // initialisation des travaux sur la page
styleFilter()           // ecouteur d'evenement sur les btn filtres pour changer leur style
filterListener()        // ecouteur d'evenement pour appliquer les filtres

