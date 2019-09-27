let isValid = {
    // Utilisation d'expression régulières pour valider la reservation

    regex:  /^[a-zâäàéèùêëîïôöçñ-]+$/i, 

    // Attributs retournant une valeur booléenne selon la validité des expressions régulières

    isNomOk: '',  
    isPrenomOk: '', 
    isSignatureOk: '', 

    // Méthodes de test de validité du nom et du prénom et de modification de style (UX)

    nomOk: function() {
        nom.style.color = '#306c94';
        this.isNomOk = true; 
    },  

    nomErreur: function() {
        nom.style.color = 'red';
        this.isNomOk = false;
    },

    prenomOk: function() {
        prenom.style.color = '#306c94'; 
        this.isPrenomOk = true; 
    }, 

    prenomErreur: function() {
        prenom.style.color = 'red';
        this.isPrenomOk = false;
    },

    nomEstValide: function () {

        nom.addEventListener('keydown', function() { // A chaque touche préssée par l'utilisateur dans l'input nom
            saisie = isValid.regex.test(nom.value); // La touche fait-elle partie de regex ?
            if (saisie === true) {
                isValid.nomOk(); 
            } else if (saisie === false) {
                isValid.nomErreur(); 
            }
        });

        nom.addEventListener('keyup', function() { // A chaque touche relâchée par l'utilisateur dans l'input nom
            saisie = isValid.regex.test(nom.value); // La touche fait-elle partie de regex ?
            if (saisie === true) {
                isValid.nomOk();
            } else if (saisie === false) {
                isValid.nomErreur();
            }
        });
    },

    // Idem pour le prénom

    prenomEstValide: function() {

        prenom.addEventListener('keydown', function() {
            saisie = isValid.regex.test(prenom.value);
            if (saisie === true) {
                isValid.prenomOk();
            } else if (saisie === false) {
                isValid.prenomErreur(); 
            }
        });
        
        prenom.addEventListener('keyup', function() {
            saisie = isValid.regex.test(prenom.value);
            if (saisie === true) {
                isValid.prenomOk();  
            } else if (saisie === false) {
                isValid.prenomErreur(); 
            }
        });
    },
    
    // Insertion du canevas au clic sur reserver si le nom et le prénom sont valides

    signatureBox: function() {
        
        if (isValid.isNomOk === true && isValid.isPrenomOk === true) {

            document.getElementById('containerSignature').style.visibility="visible";   
            document.getElementById('reserver').setAttribute('disabled', 'true'); // Empêche l'utilisateur de reserver plusieurs vélos à la fois
            nom.setAttribute('disabled', 'true'); // Empêche l'utilisateur de modifier son nom lors de la signature
            prenom.setAttribute('disabled', 'true'); // Empêche l'utilisateur de modifier son prénom lors de la signature

            // Empêche l'utilisateur de cliquer sur une station lors de la signature, préviens les bugs

            station1.removeEventListener('click');
            station2.removeEventListener('click');
            station3.removeEventListener('click');
            station4.removeEventListener('click');
        }; 
    }, 
};