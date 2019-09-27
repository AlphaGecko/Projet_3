let diaporama = {

    // Variables permettant d'affecter un nombre aux identifiants des images

    image1: '', 
    image2: '', 
    image3: '', 
    image4: '', 
    image5: '', 

    // Methodes

    animation: function() { // Lance une animation selon l'ID de l'image
        document.getElementById('image1').setAttribute('style', 'left: 82%; width: 15%; -webkit-animation: rotate0To300 1s 1 forwards; -moz-animation: rotate0To300 1s 1 forwards; -o-animation: rotate0To300 1s 1 forwards; animation: rotate0To300 1s 1 forwards; z-index: 0');
        document.getElementById('image2').setAttribute('style', 'left: 0; width: 15%; -webkit-animation: rotate300To60 1s 1 forwards; -moz-animation:  rotate300To60 1s 1 forwards; -o-animation: rotate300To60 1s 1 forwards; animation: rotate300To60 1s 1 forwards; z-index: 0');
        document.getElementById('image3').setAttribute('style', 'left: 7.5%; width: 25%; -webkit-animation: rotate0To60 1s 1 forwards; -moz-animation: rotate0To60 1s 1 forwards; -o-animation: rotate0To60 1s 1 forwards; animation: rotate0To60 1s 1 forwards; z-index: 5');
        document.getElementById('image4').setAttribute('style', 'left: 30.5%; width: 35%; -webkit-animation: rotate300To0 1s 1 forwards; -moz-animation: rotate300To0 1s 1 forwards; -o-animation: rotate300To0 1s 1 forwards; animation: rotate300To0 1s 1 forwards; z-index: 10');
        document.getElementById('image5').setAttribute('style', 'left: 63.5%; width: 25%; -webkit-animation: rotate0To300 1s 1 forwards; -moz-animation: rotate0To300 1s 1 forwards; -o-animation: rotate0To300 1s 1 forwards; animation: rotate0To300 1s 1 forwards; z-index: 5');
    },

    lecture: function() { // UX, permet également à l'utilisateur de cliquer sur pause
        document.querySelector('#container_play_pause .lecture').id = 'stopLecture';
        document.querySelector('.lecture i').style.color = 'green'; 
        document.getElementById('pause').id = 'pause';
        document.querySelector('.pause i').style.color = 'black';
        lectureAutomatique = true; 
        debugFleche = true;
        // Fonction permettant d'enlever 1 pour que les flèches fonctionnent du premier coup
    },

    pause: function() { // UX, permet également à l'utilisateur de cliquer sur lecture
        document.querySelector('#container_play_pause .lecture').id = 'lecture';
        document.querySelector('.lecture i').style.color = 'black'; 
        document.getElementsByClassName('pause').id = 'stopPause'; 
        document.querySelector('.pause i').style.color = 'red';
        lectureAutomatique = false;
    },

    attributionID: function() { // Attribut les ID selon les variables i, j, k, l et m
        document.querySelector('#gauche img').id = 'image' + i;
        document.querySelector('#gaucheMilieu img').id = 'image' + j;
        document.querySelector('#milieu img').id = 'image' + k;
        document.querySelector('#droiteMilieu img').id = 'image' + l;
        document.querySelector('#droite img').id = 'image' + m; 
    },

    rebootID: function() { // Remise des ID de 1 à 5, obligatoire pour le diaporama manuel
        i = 1; 
        j = 2; 
        k = 3; 
        l = 4; 
        m = 5; 
        diaporama.attributionID();
    },

    modifAnimation: function() { // Modifie la valeur des variables pour la prochaine animation
        i --; 
        j --; 
        k --; 
        l --; 
        m --; 
    
        if (i === 0) {
            i = 5; 
        }  else if (j === 0) {
            j = 5;
        } else if (k === 0) {
            k = 5;
        } else if (l === 0) {
            l = 5;
        } else if (m === 0) {
            m = 5;
        };
    }, 

    modifAnimationFlecheDroite: function() { // Modifie la valeur des variables pour la prochaine animation, spécifique à la flèche droite (animation vers la droite)
        for (n = 0; n <= 3; n++) {
            i --; 
            j --; 
            k --; 
            l --; 
            m --; 

            if (i === 0) {
                i = 5; 
            }  else if (j === 0) {
                j = 5;
            } else if (k === 0) {
                k = 5;
            } else if (l === 0) {
                l = 5;
            } else if (m === 0) {
                m = 5;
            };
        };  
    }, 

    debugFleche: function () { // Debug de la flèche lorsque celle-ci est pressée lors du diaporama auto
        i ++; 
        j ++; 
        k ++; 
        l ++; 
        m ++; 

        if (i === 6) {
            i = 1; 
        }  else if (j === 6) {
            j = 1;
        } else if (k === 6) {
            k = 1;
        } else if (l === 6) {
            l = 1;
        } else if (m === 6) {
            m = 1;
        }
    },

    clicImage: function() { // Attribution des ID et animation lors du clic sur une image
        diaporama.attributionID(); 
        diaporama.animation(); 
        diaporama.rebootID(); 
    },

    // Diaporama auto

    boucle: function (image1, image2, image3, image4, image5) { // Diaporama automatique
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.image5 = image5;
        lectureAutomatique = true;
        this.lecture(); 
        this.animation(); 
        this.modifAnimation(); 
        this.attributionID();
    }, 

    // Diaporama manuel

    selectionManuelle: function (image1, image2, image3, image4, image5) { // Diaporama manuel
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.image5 = image5;
        diaporama.rebootID();
        this.pause(); 
    },
}; 
