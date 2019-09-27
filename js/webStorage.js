let webStorage = {

    // Création d'un attribut pour définir si un sessionStorage de l'API web storage existe. 

    isSessionStorageExist: [false, ' '], 

    // Vérification de la disponibilité du web storage. Code "tout fait" trouvé sur la documentation de l'API

    dispoWebStorage: function(type) {

        try {
            let storage = window[type], x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        
        catch(e) {
            /* code 22 = tout sauf Firefox || code 1014 = Firefox || 
            test des champs, aucun code ne devrait être présent 
            QuotaExceededErrortout = tout sauf Firefox Firefox || NS_ERROR_DOM_QUOTA_REACHED = Firefox
            storage.length !== 0 Reçoit QuotaExceededError seulement si quelquechose est déjà stocké */ 
            return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0;
        }
    },

    // Enregistrement du nom dans le localstorage de l'API web storage

    stockageNom: nom.addEventListener("input", function(e) {

        let nomUtilisateur = e.target.value;

        document.getElementById('valider').addEventListener('click', function() {
            let stockageNom = localStorage.setItem('nom', nomUtilisateur);

            if (webStorage.dispoWebStorage('localStorage')) {
                return stockageNom;
            } else {
                console.log('Votre navigateur ne peut pas stocker les données')
            }

             let nomReservation = sessionStorage.setItem('Prenom reservation', nomReservation); 
        if (webStorage.dispoWebStorage('sessionStorage')) {
            return nomReservation; 
        } else {
            console.log('Votre navigateur ne peut pas stocker les données')
        }
        })

       
    }),

    // Enregistrement du prenom dans le localstorage et le cession storage de l'API web storage

    stockagePrenom: prenom.addEventListener("input", function(e) {

        let prenomUtilisateur = e.target.value;

        document.getElementById('valider').addEventListener('click', function() {
            let stockagePrenom = localStorage.setItem('prenom', prenomUtilisateur);
            if (webStorage.dispoWebStorage('localStorage')) {
                return stockagePrenom;
            } else {
                console.log('Votre navigateur ne peut pas stocker les données')
            }
        })
    }),

    stockageSessionStorage: function() {
    let prenomStockage = localStorage.getItem('nom');
    let nomStockage = localStorage.getItem('prenom');
    let adresseStockage = getStation.adresse;
    let stationStockage = webStorage.isSessionStorageExist[1];

    let prenomReservation = sessionStorage.setItem('Prénom', prenomStockage); 
    let nomReservation = sessionStorage.setItem('Nom', nomStockage); 
    let adresseReservation = sessionStorage.setItem('Adresse', adresseStockage); 
    let stationReservation = sessionStorage.setItem('Station', stationStockage); 
    let reservationEncours = sessionStorage.setItem('Reservation', true); 
        if (webStorage.dispoWebStorage('sessionStorage')) {
            return prenomReservation, nomReservation, adresseReservation, stationReservation, reservationEncours; 
        } else {
            console.log('Votre navigateur ne peut pas stocker les données')
        }
    }, 

    // Méthode de remplissage automatique du nom et du prénom de l'utilisateur lors de son arrivée sur l'application web

    champsPreRemplis: function() {

        // Appel des éléments stockés

        if (webStorage.dispoWebStorage('localStorage')) {
            let nomPrecCesssion = localStorage.getItem('nom');
            let prenomPrecCesssion = localStorage.getItem('prenom');
            
            // Appel au DOM 

            document.getElementById('nom').value = nomPrecCesssion; 
            document.getElementById('prenom').value = prenomPrecCesssion; 

            // Ajout du texte dans les champs 

            if (nomPrecCesssion !== null) {
                document.getElementById('nom').setAttribute('placeholder', nomPrecCesssion);
            }

            if (prenomPrecCesssion !== null) {
                document.getElementById('prenom').setAttribute('placeholder', prenomPrecCesssion);
            }
        }
    },

    verificationReservation: function() {
        if (this.dispoWebStorage('sessionStorage') && sessionStorage.getItem('Reservation')) {
            webStorage.isSessionStorageExist.splice(0, 2);
            webStorage.isSessionStorageExist.unshift(true); 
            webStorage.isSessionStorageExist.push('station' + sessionStorage.getItem('Station'));

            if (sessionStorage.getItem('Station') === 'station1') {
                getStation.station1(); 
            } else if (sessionStorage.getItem('Station') === 'station2') {
                getStation.station2(); 
            } else if (sessionStorage.getItem('Station') === 'station3') {
                getStation.station3(); 
            } else if (sessionStorage.getItem('Station') === 'station4') {
                getStation.station4(); 
            }
            getStation.confirmationUtilisateur();
        }
    }
}; 