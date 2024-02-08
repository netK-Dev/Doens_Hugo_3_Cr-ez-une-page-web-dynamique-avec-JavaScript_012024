
const galerieTravaux = document.querySelector(".gallery");

window.addEventListener('load', function() {
    const userToken = this.localStorage.getItem('token');
    console.log(userToken);

    if (userToken != null) {
        sessionInit();

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


document.getElementById('btnModifier').addEventListener('click', () => {
    document.getElementById('modale').showModal(); 
});
document.getElementById("fermerModale").addEventListener("click", () => {
    document.getElementById('modale').close();
});