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
    const userToken = this.localStorage.getItem('token');
    console.log(userToken);

    // vérifie si le token existe
    if (userToken != null) {
        // si il existe, on initialise la session
        sessionInit();
        const btnLogOut = document.getElementById('logout');

        btnEdit.addEventListener('click', () => {
            document.getElementById('modale').showModal();
            initModalGallery();
        });
        modal.addEventListener("click", function(event) {
            if (event.target === this) {
                document.querySelector(".GalleryModale").innerHTML = "";
                document.getElementById('modale').close();
            };
        });
        btnCloseModal.addEventListener("click", () => {
            document.getElementById('modale').close();
        });


        btnAddPhoto.addEventListener("click", () => {
            btnSubmit.setAttribute("type", "");
            checkFormCompletion();
            initAddWork()
        });

        btnLogOut.addEventListener("click", () => {
            this.localStorage.removeItem('token');
            this.window.location.href = "index.html";
        });

        

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


        form.addEventListener("submit", function(event) {
            const data = {title, image, category};
            event.preventDefault();
            sendWork(data);
            initPage();
            console.log("Sent!");
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

// Initialize works on the page
initPage()
// Event listener for filter buttons to change their style
styleFilter()
// Event listener to apply filters
filterListener()
