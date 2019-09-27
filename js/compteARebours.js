let compteARebours = {
    
    // Création du compte à rebours

    minutes: '',
    secondes: '', 

    UXMinutesSecondes: function() {
        if (webStorage.dispoWebStorage('sessionStorage') && sessionStorage.getItem('Reservation')) {
            this.minutes = sessionStorage.getItem('Minutes');
            this.secondes = sessionStorage.getItem('Secondes');
            document.getElementById('minutes').innerHTML = this.minutes; 
            document.getElementById('secondes').innerHTML = this.secondes; 
        }
    },

    remiseAZeroTimer: function() { // Depart du timer de 20 minutes
        if (webStorage.dispoWebStorage('sessionStorage') && sessionStorage.getItem('Reservation')) {
            this.minutes = sessionStorage.getItem('Minutes');
            this.secondes = sessionStorage.getItem('Secondes');
        } else {
            this.minutes = 20; 
            this.secondes = 0;
            document.getElementById('minutes').innerHTML = this.minutes; 
            document.getElementById('secondes').innerHTML = this.secondes; 
        }   
    },

    timer: function() {

        let departTimer = setInterval(function() {

            // Si la reservation est annulée par l'utilisateur
        
            if (webStorage.isSessionStorageExist[0] === false && compteARebours.minutes === 0 && compteARebours.secondes === 0) {
                alert('Votre reservation a bien été annulée');  
                clearInterval(departTimer); 

            // Si le timer arrive à 0

            } else if (webStorage.isSessionStorageExist[0] === true && compteARebours.minutes === 0 && compteARebours.secondes === 0) {
                alert('Votre reservation a expirée'); 
                clearInterval(departTimer); 
                compteARebours.annulerReservation();
                sessionStorage.clear(); 

            // -1 seconde

            } else {
                timerMoins();
            }

            function timerMoins() { // Enlève une seconde au timer
                compteARebours.secondes--;   
                if (compteARebours.secondes < 0) { // Si seconde = -1
                    compteARebours.minutes --; // -1 minute
                    compteARebours.secondes = 59; // Retour à 59 secondes
                }       
                let timerReservationMinutes = sessionStorage.setItem('Minutes', compteARebours.minutes);
                let timerReservationSecondes = sessionStorage.setItem('Secondes', compteARebours.secondes);  
                if (webStorage.dispoWebStorage('sessionStorage')) {
                    return timerReservationMinutes, timerReservationSecondes; 
                } else {
                    console.log('Votre navigateur ne peut pas stocker les données')
                }
            }

            document.getElementById('minutes').innerHTML = compteARebours.minutes; 
            document.getElementById('secondes').innerHTML = compteARebours.secondes;

        }, 1000); // Boucle toutes les secondes 
    },

    // fonction d'annulation de la reservation 

    annulerReservation: function() { // Mise à zéro du timer lors de l'annulation par l'utilisateur
        this.minutes = 0; 
        this.secondes = 0; 
        document.getElementById('info_reservation').style.visibility = "hidden";
        sessionStorage.clear('Velos disponibles'); // Le session storage est effacé
        webStorage.isSessionStorageExist.splice(0, 2); // Remise à zéro de l'attribut session storage
        webStorage.isSessionStorageExist.unshift(false); 
        webStorage.isSessionStorageExist.push(' '); 

        setTimeout(() => { // Décalage d'une seconde pour correspondre à la boucle du timer, préviens les bugs
        this.MAJStation();  
        }, 1000); 
    },

    // Fonction de mise à jour des informations des stations suite à l'annulation

    MAJStation: function() { // Remise des données initiale de l'API JCdecaux selon la station choisie
        switch (getStation.numeroStationAppli) {
            case 1 : 
            getStation.station1();
            break;
            case 2 : 
            getStation.station2();
            break;
            case 3 : 
            getStation.station3();
            break;
            case 4 : 
            getStation.station4();
            break;
        }
    }
};