
const galerieTravaux = document.querySelector(".gallery");

window.addEventListener('load', function() {
    const userToken = this.localStorage.getItem('token');
    console.log(userToken);

    if (userToken != null) {
        sessionInit();

        this.document.getElementById('btnModifier').addEventListener('click', () => {
            document.getElementById('modale').showModal();
            initModaleGallery();
        });
        this.document.getElementById("modale").addEventListener("click", function(event) {
            if (event.target === this) {
                document.querySelector(".GalleryModale").innerHTML = "";
                document.getElementById('modale').close();
            };
        });
        this.document.getElementById("fermerModale").addEventListener("click", () => {
            document.getElementById('modale').close();
        });

        const btnLogOut = this.document.getElementById('logout');
        btnLogOut.addEventListener("click", () => {
            this.localStorage.removeItem('token');
            this.window.location.href = "index.html";
        });
    };
  });
  


initPage()              // initialisation des travaux sur la page
styleFilter()           // ecouteur d'evenement sur les btn filtres pour changer leur style
filterListener()        // ecouteur d'evenement pour appliquer les filtres
