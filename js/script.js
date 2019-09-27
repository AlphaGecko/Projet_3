// Diaporama

let lectureAutomatique = true; // Permet la lecture automatique

/* Etat initial du diaporama. Mettre des variables en portée globale permet au diaporama
manuel et automatique d'être facilement synchronisés */
let i = 1, j = 2, k = 3, l = 4, m = 5; 

// fonction de diaporama automatique, permet l'utilisation de setInterval et clearInterval

function lancementDiaporama() { 
    if (lectureAutomatique === true) { 
        diaporama.boucle(i, j, k, l, m); 
    }
};

let clicImg; // Variables permettant de calibrer les images cliqués par l'utilisateur et les flèches

// IIFE du diaporama selon la valeur de la variable lectureAutomatique

(function() { 

    switch (lectureAutomatique) {

        case true: 

         /* Remet le valeur des ID à zéro, indispensable lorsque l'utilsateur passe du 
         diaporama manuel au diaporama automatique, et vice versa. Variable globale pour ne pas que 
         la méthode boucle */

        diaporama.rebootID();

        // Boucle

        setInterval(lancementDiaporama, 6000);  

        // Possibilité de faire pause sur l'appui du bouton lorsque le diaporama est en lecture auto

        document.getElementById('pause').addEventListener('click', function() {
            diaporama.pause(); 
        });

        // Pause lorsque l'utilisateur clic sur une image (UX) 

        document.getElementById('container_diaporama_anime').addEventListener('click', function() {
            if (lectureAutomatique === true) {
                diaporama.pause(); 
            }
        });

        // Pause lorsque l'utilisateur utilise la flèche gauche ou droite (UX)

        document.addEventListener('keydown', function(e){
            if (e.which === 37 && lectureAutomatique === true || e.which === 39 && lectureAutomatique === true) {
                diaporama.pause();  
            }
        });

        case false:

        diaporama.selectionManuelle(i, j, k, l, m); // Diaporama manuel

        // Ecoute des images du diaporama au clic

        document.getElementById('image1').addEventListener('click', function() {
            i = 4; 
            j = 5; 
            k = 1; 
            l = 2; 
            m = 3;    
            diaporama.clicImage();
            clicImg = -2; 
        });

        document.getElementById('image2').addEventListener('click', function() {
            i = 3; 
            j = 4; 
            k = 5; 
            l = 1; 
            m = 2;    
            diaporama.clicImage(); 
            clicImg = -1;
        });

        document.getElementById('image3').addEventListener('click', function() {
            i = 2; 
            j = 3; 
            k = 4; 
            l = 5; 
            m = 1;    
            diaporama.clicImage(); 
            clicImg = 0;
        });

        document.getElementById('image4').addEventListener('click', function() {
            i = 1; 
            j = 2; 
            k = 3; 
            l = 4; 
            m = 5;  
            diaporama.clicImage(); 
            clicImg = 1;
        });

        document.getElementById('image5').addEventListener('click', function() {
            i = 5; 
            j = 1; 
            k = 2; 
            l = 3; 
            m = 4;    
            diaporama.clicImage(); 
            clicImg = 2;
        });
        
        // Ecoute des flèches gauche et droite du clavier 
        
        document.addEventListener('keydown', function(e){

            // Flèche gauche

            if (e.which === 37 && lectureAutomatique === false) {
                // calibrage de la fleche gauche 
                if (clicImg === 2) { // décalage de 2 ID sur la droite
                    diaporama.modifAnimation(); 
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg = false;
                    debugFleche = false;
                }

                if (clicImg === -2) { // décalage de 2 ID sur la gauche
                    diaporama.debugFleche();  
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg++;
                    debugFleche = false;
                }

                if (clicImg === -1) { // décalage de 1 ID sur la gauche
                    diaporama.debugFleche();  
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg = false;
                    debugFleche = false;

                } else { // si l'utilisateur n'a pas cliqué sur un image avec d'utiliser la flèche
                    if (debugFleche === true) { // calibrage de la fleche gauche lorsque celle ci est pressée durant le diaporama auto
                        diaporama.debugFleche(); 
                    }
                    diaporama.modifAnimation();
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    diaporama.attributionID();
                    debugFleche = false;
                }     

            // Flèche droite

            } else if (e.which === 39 && lectureAutomatique === false) { 
                // calibrage de la fleche droite lorsque celle ci est pressée après un clic sur une image
                 if (clicImg === -2) { // décalage de 2 ID sur la gauche
                    diaporama.modifAnimation();
                    diaporama.modifAnimation();
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg = false;
                    debugFleche = false;
                }

                if (clicImg === 1) { // décalage de 1 ID sur la droite
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg = false;
                    debugFleche = false;
                }
                
                if (clicImg === 2) { // décalage de 2 ID sur la droite
                    diaporama.modifAnimationFlecheDroite(); 
                    diaporama.modifAnimation();
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    clicImg = 1;
                    debugFleche = false;

                } else { // si l'utilisateur n'a pas cliqué sur un image avec d'utiliser la flèche
                    if (debugFleche === true) { // calibrage de la fleche droite lorsque celle ci est pressée durant le diaporama auto
                        diaporama.debugFleche(); 
                    }
                    diaporama.modifAnimationFlecheDroite();
                    diaporama.attributionID(); 
                    diaporama.animation(); 
                    diaporama.attributionID(); 
                    debugFleche = false; 
                }
            }
        });

        // Possibilité de faire lecture lorsque le diaporama est manuel

        document.getElementById('lecture').addEventListener('click', function() {
            if (lectureAutomatique === false) { // Evite à l'utilisateur de pouvoir lancer la lecture plus d'une fois
                diaporama.lecture(); 
            }
        });
    }
})();

diaporama.lecture(); // Lancement de la lecture à l'ouverture de l'application






// Reservation 





// Insertion de la carte OpenStreetMap dans le div via leafletjs

let myMap = L.map('container_carte').setView([48.6869197241039, 6.17234789239391], 12) // Nancy;

// DOM, utilisés fréquemment dans l'application pour éviter la redondance.

let station1 = L.marker([48.666721193896, 6.16661978303466]).addTo(myMap); // 29
let station2 = L.marker([48.6924654452072, 6.18340055389445]).addTo(myMap); // 1
let station3 = L.marker([48.695420147586, 6.19522861327582]).addTo(myMap); // 6
let station4 = L.marker([48.6869197241039, 6.17234789239391]).addTo(myMap); // 19

// Requête

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWxwaGFnZWNrbyIsImEiOiJjanlxeWRlajIwNTFxM2ltYXNtZDBtbDZkIn0.ls1o80d6YuB730SJNLHwQw'
}).addTo(myMap);

// DOM, utilisés fréquemment dans l'application pour éviter la redondance.

let nom = document.getElementById('nom'); 
let prenom = document.getElementById('prenom'); 

// Calibrage du canevas

canvasSignature.calibrage(canvasSignature.canvas); 

// IIFE reservation

(function() {

    // UX, fait apparaître plus rapidement le timer en cas de reservation en cours lors du rechargement de la page
    
    compteARebours.UXMinutesSecondes(); 

    // Ecoute du clic sur les différentes stations 

    station1.addEventListener("click", function() {
        getStation.station1(); 
    });

    station2.addEventListener("click", function() {
        getStation.station2();
    });

    station3.addEventListener("click", function() {
        getStation.station3();  
    });

    station4.addEventListener("click", function() {
        getStation.station4();
    });

    // Test de validité des prénoms à chaque lettre entrée dans les champs nom et prénom

    nom.addEventListener('keypress', isValid.nomEstValide());
    prenom.addEventListener('keypress', isValid.prenomEstValide());

    // Ecoute de la souris dans le canevas. Défaut = false. 

    canvasSignature.canvas.addEventListener("mousemove", function(e) {
        canvasSignature.positionSouris('positionXY', e);
    }, false); // position souris

    canvasSignature.canvas.addEventListener("mousedown", function(e) {
        canvasSignature.positionSouris('clicSouris', e)
    }, false); // clic sur la souris

    canvasSignature.canvas.addEventListener("mouseup", function(e) {
        canvasSignature.positionSouris('relacheSouris', e)
    }, false); // fin du clic souris

    canvasSignature.canvas.addEventListener("mouseout", function(e) {
        canvasSignature.positionSouris('exterieurCanvas', e)
    }, false);

    // Annulation au clic sur annuler dans le canevas

    document.getElementById('annuler').addEventListener('click', function() {
        canvasSignature.annulerSignature(); 
    });

    // Annulation au clic sur annuler_reservation

    document.getElementById('annuler_reservation').addEventListener('click', function() { 
        compteARebours.annulerReservation();
        sessionStorage.clear(); 
    });

    // Test de validité lors du clic sur reserver

    document.getElementById('reserver').addEventListener('click', function() {
            
        isValid.signatureBox(); // Y'a-t-il une signature ? 

        if (isValid.isNomOk === false) { // Le nom est-il valide ?
            alert('Nom invalide');
        } 
        if (isValid.isPrenomOk === false) { // Le prénom est-il valide ?
            alert('Prénom invalide'); 
        }
    });

    // Ecoute du clic sur valider

    document.getElementById('valider').addEventListener('click', function() {
        let nbVelos = document.getElementById('velosDispo').innerHTML; // Nombre de vélos disponible

        /* Condition qui s'execute si les données sont valides, qu'il y a déjà une reservation 
        et qu'il y a au moins un vélo de disponible */

        if (isValid.isSignatureOk === true && webStorage.isSessionStorageExist[0] === true && nbVelos >= 1) {
            let confirmation = confirm('Votre nouvelle reservation va supprimer l\'ancienne, voulez-vous confirmer ?')
            
            // Si l'utilisateur confirme sa nouvelle reservation : 
            
            if (confirmation === true) {
                compteARebours.annulerReservation(); 
                setTimeout(() => {
                    getStation.confirmationUtilisateur();
                    alert('Votre nouvelle reservation à bien été enregistrée')
                }, 1000); 

            // Si l'utilisateur ne confirme pas sa nouvelle reservation : 

            } else if (confirmation === false) {
                alert('Votre nouvelle reservation n\' a pas été confirmée')
            }


        /* Condition qui s'execute si les données sont valides, qu'il y a pas déjà une reservation 
        et qu'il y a au moins un vélo de disponible */

        } else if (isValid.isSignatureOk === true && webStorage.isSessionStorageExist[0] !== true && nbVelos >= 1) {
            getStation.confirmationUtilisateur(); 
        } else if (isValid.isSignatureOk !== true) { // Si l'utilisateur n'a pas signé
            alert('Veuillez signer pour valider votre reservation'); 
        } else if (nbVelos < 1) { // Si il n'y a pas de vélo de disponible
            alert('Il n\'y a plus de vélos disponible dans cette station, veuillez choisir une autre station');
        }
    });

    // Y'a-t-il déjà une reservation en cours ? 

    webStorage.verificationReservation();
})();


