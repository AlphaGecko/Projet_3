let getStation = {
    numeroStationAPI: '', // Attribut correspondant au numéro de la station de l'API JCdecaux
    numeroStationAppli: '', // Attribut correspondant au numéro de la station de l'application
    adresse: '', // Attribut correspondant à l'adresse de la station choisie par l'utilisateur (pour faciliter la récupération dans le sessionStorage)

    // Methodes

        // Méthode permettant d'effectuer une nouvelle requête HTTP

        ajaxGet: function(url, callback) {

            // Nouvelle requête HTTP
    
            let requete = new XMLHttpRequest();
    
            // Demande de ressource
    
            requete.open("GET", url);
    
            // Ecoute du chargement de la ressource
    
            requete.addEventListener("load", function () {
    
                // Si le status de la requête est bon : 
    
                if (requete.status >= 200 && requete.status < 400) {
                    callback(requete.responseText); // OK ou not found
    
                    // Modifie la fenêtre de "Veuillez choisir une station" à la fenêtre d'information
    
                    document.getElementById('choisir').style.display="none";
                    document.getElementById('infoStation').style.visibility="visible";
                    webStorage.champsPreRemplis(); // Va chercher les informations pour le remplissage du localStorage si il y'en a
    
                // Vérification de la validité du contenu déjà présent des champs nom et prénom 
                    
                nomSaisi = isValid.regex.test(nom.value); // test de validité du nom
                prenomSaisi = isValid.regex.test(prenom.value); // test de validité du prénom
    
                if (nomSaisi === true) {
                    isValid.nomOk(); // Apparaît bleu
                } else if (nomSaisi === false) {
                    isValid.nomErreur(); // Apparaît rouge
                }
    
                if (prenomSaisi === true) {
                    isValid.prenomOk(); // Apparaît bleu
                } else if (prenomSaisi === false) {
                    isValid.prenomErreur();  // Apparaît rouge
                }
    
                // Si le status de la requête est inccorect : 
    
                } else {
                    console.error( requete.status + " " +  requete.statusText + " " + url); // Permet d'identifier l'erreur (Developpeur)
                    alert('Erreur ' + requete.status + ' ' + requete.statusText + '. Veuillez réessayer ultérieurement.'); // Permet d'identifier l'erreur (Utilisateur)
                }
            });
    
            // Lorsque la requête est invalide, obtention d'informations sur l'erreur : 
    
            requete.addEventListener("error", function () {
                console.error("Erreur réseau avec l'URL " + url); // Permet d'identifier l'erreur de requête (Developpeur)
                alert('Cette station est actuellement indisponible'); // Affiche une erreur à l'utilisateur
            });
    
            requete.send(null); // Envoi de la requête
        },    

    stationClic: function() {
        this.ajaxGet('https://api.jcdecaux.com/vls/v1/stations/' + this.numeroStationAPI + '?contract=nancy&apiKey=d9322b2b03a24153a676fba45c75ec9eb8fee97d', function (reponse) { 

            let tableauxRetour = new Array(JSON.parse(reponse)), // Parsage des données dans un nouveau tableaux
            adresse = tableauxRetour.map(function(obj) { // Obtention de l'adresse de l'API JCdecaux
                return obj.address;
            });
    
            let tableauxRetour2 = new Array(JSON.parse(reponse)), // Parsage des données dans un nouveau tableaux
            places = tableauxRetour2.map(function(obj) { // Obtention du numéro de station de l'API JCdecaux
                return obj.bike_stands;
            });
    
            let tableauxRetour3 = new Array(JSON.parse(reponse)), // Parsage des données dans un nouveau tableaux
            velosDispo = tableauxRetour3.map(function(obj) {
                return obj.available_bikes; // Obtention des vélos disponibles de l'API JCdecaux
            });
    
            document.getElementById("adresse").innerHTML = adresse; // Ajout des données dans le span adresse
            document.getElementById("places").innerHTML = places; // Ajout des données dans le span places
            getStation.adresse = adresse;
    
            // Si une reservation est déjà en cours dans la session, changement des valeurs de la station choisie par l'utilisateur
    
            if (webStorage.isSessionStorageExist[0] === true && webStorage.isSessionStorageExist[1] === 'station' + getStation.numeroStationAppli) {
                getStation.enleverVeloStation(); 
            } else {
                document.getElementById("velosDispo").innerHTML = velosDispo;
            }
        })
    }, 

    /* Methode changeant les différents attributs, la variables numeroStation et 
    lance la méthode affichant les informations de JC decaux */

    station1: function() { 
        this.numeroStationAppli = 1; 
        this.numeroStationAPI = 29; 
        this.stationClic();
        numeroStation = this.numeroStationAppli; 
    },

    station2: function() {
        this.numeroStationAppli = 2; 
        this.numeroStationAPI = 1; 
        this.stationClic();
        numeroStation = this.numeroStationAppli;  
    },

    station3: function() {
        this.numeroStationAppli = 3; 
        this.numeroStationAPI = 6; 
        this.stationClic();
        numeroStation = this.numeroStationAppli;  
    },

    station4: function() {
        this.numeroStationAppli = 4; 
        this.numeroStationAPI = 19; 
        this.stationClic();
        numeroStation = this.numeroStationAppli;  
    },

    // Requête, création d'un nouveau tableau

    enleverVeloStation: function() {
        this.ajaxGet('https://api.jcdecaux.com/vls/v1/stations/' + this.numeroStationAPI + '?contract=nancy&apiKey=d9322b2b03a24153a676fba45c75ec9eb8fee97d', function(reponseGet) { 

            let modifVelo = new Array(JSON.parse(reponseGet)),
            modifVelosDispo = modifVelo.map(function(obj) {
                obj.available_bikes -- ; // Enlève un vélo du tableau de la réponse de JCdecaux
                return obj.available_bikes;
            });

            // Mise à jour sur l'interface utilisateur

            document.getElementById('velosDispo').innerText = modifVelosDispo; // Affiche le résultat avec le vélo en moins

            // Stockage sur l'API web storage (sessionStorage)

            let stockageVelo = sessionStorage.setItem('Velos disponibles',  modifVelosDispo); 
            if (webStorage.dispoWebStorage('sessionStorage')) {
                return stockageVelo; 
            } else {
                console.log('Votre navigateur ne peut pas stocker les données')
            }
        })  
    }, 

    // Validation de la reservation

    confirmationUtilisateur: function() {

        // Remise du timer à zéro (Utile si une reservation est déjà en cours) et démarrage de celui-ci à 20 minutes

        compteARebours.remiseAZeroTimer();
        compteARebours.timer();

        // Fermeture du div signature et ouverture des infos de reservation

        document.getElementById('info_reservation').style.visibility = "visible"; 
        document.getElementById('containerSignature').style.visibility = "hidden";

        // Ajout de l'adresse selon la station choisie et modification de la valeur de l'attribut isSessionStorageExist

        webStorage.isSessionStorageExist.splice(0, 2);
        webStorage.isSessionStorageExist.unshift(true); 
        webStorage.isSessionStorageExist.push('station' + this.numeroStationAppli);

        // Nouvelle requete HTTP

        this.ajaxGet('https://api.jcdecaux.com/vls/v1/stations/' + this.numeroStationAPI + '?contract=nancy&apiKey=d9322b2b03a24153a676fba45c75ec9eb8fee97d', function (reponse) { 

            let tableauxRetour = new Array(JSON.parse(reponse)),
            adresse = tableauxRetour.map(function(obj) {
                return obj.address;
            });

            document.getElementById("adresse_reservation").innerHTML = adresse;
        })

        // Affichage dynamique du nombre de vélo restant de la station 

        sessionStorage.clear('Velos disponibles'); // Utile si une reservation est déjà en cours
        this.enleverVeloStation(); 

        // Ajout du nom et du prénom dans le div de reservation

        document.getElementById('nom_reservation').innerHTML = localStorage.getItem('nom'); 
        document.getElementById('prenom_reservation').innerHTML = localStorage.getItem('prenom'); 

        // Permet à l'utilisateur de réserver à nouveau 

        nom.removeAttribute('disabled'); 
        prenom.removeAttribute('disabled');  
        document.getElementById('reserver').removeAttribute('disabled');

        station1.addEventListener("click", function() {
            getStation.station1(); 
        })
        station2.addEventListener("click", function() {
            getStation.station2();  
        })
        station3.addEventListener("click", function() {
            getStation.station3(); 
        })
        station4.addEventListener("click", function() {
            getStation.station4();  
        })

        // Ajout des information au session storage de l'API WebStorage

        webStorage.stockageSessionStorage();
    }
};