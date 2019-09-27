let canvasSignature = {

    // Attributs des tracés de traits par l'utilisateur
    clicCanvas: false,
    pointTrace: false,

    // Attributs de position de la souris 

    precedentePosX: 0, 
    actuelPosX: 0, 
    precedentePosY: 0,
    actuelPosY: 0,

    // Attributs canevas et contexte

    canvas: document.getElementById('signature'), 
    ctx: document.getElementById('signature').getContext('2d'), // Retourne un contexte de dessin sur le canevas

    // Methodes du canevas

    // Calibrage du canevas

    calibrage: function(el) {
        el.width = el.clientWidth; 
        el.height = el.clientHeight; 
    },

    dessiner: function() {
        this.ctx.beginPath(); // Départ du dessin
        this.ctx.moveTo(canvasSignature.precedentePosX, canvasSignature.precedentePosY); // Début du déplacement
        this.ctx.lineTo(canvasSignature.actuelPosX, canvasSignature.actuelPosY); // Fin du déplacement
        this.ctx.strokeStyle = 'black'; // Trait noir
        this.ctx.lineWidth = 2; // Epaisseur
        this.ctx.stroke(); // Dessine sur le déplacement défini plus haut
        this.ctx.closePath(); // Fin du dessin
        isValid.isSignatureOk = true; // La signature est valide
    },

    // Remise à zero au clic sur le bouton effacer

    effacer: function() { // Remise à zéro du canevas
        document.getElementById('effacer').addEventListener('click', function() {
            canvasSignature.ctx.clearRect(0, 0, canvasSignature.canvas.width, canvasSignature.canvas.height);
            isValid.isSignatureOk = false; 
        })
    },

    // Annulation

    annuler: function() { // Remise en place de la reservation et remise à zéro du canevas
        document.getElementById('annuler').addEventListener('click', function() {
            canvasSignature.ctx.clearRect(0, 0, canvasSignature.canvas.width, canvasSignature.canvas.height);
            document.getElementById('containerSignature').style.visibility="hidden";
            document.getElementById('reserver').removeAttribute('disabled');
            nom.removeAttribute('disabled'); 
            prenom.removeAttribute('disabled'); 
            isValid.isSignatureOk = false; 

            // Remise en place de l'écoute des stations au clic 

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
        })
    }, 

    annulerSignature: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.getElementById('containerSignature').style.visibility="hidden";
        document.getElementById('reserver').removeAttribute('disabled');
        nom.removeAttribute('disabled'); 
        prenom.removeAttribute('disabled'); 
        isValid.isSignatureOk = false; 

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
        })
    },

    positionSouris: function(reponse, e) {

        // Action selon l'action de la souris sur le canevas

        if (reponse === 'clicSouris') { // Lors du clic gauche
            canvasSignature.precedentePosX =  canvasSignature.actuelPosX;
            canvasSignature.precedentePosY = canvasSignature.actuelPosY;
            canvasSignature.actuelPosX = e.offsetX - canvasSignature.canvas.offsetLeft;
            canvasSignature.actuelPosY = e.offsetY - canvasSignature.canvas.offsetTop;

            canvasSignature.clicCanvas = true; // Le dessin peut commencer
            canvasSignature.pointTrace = true; // Le trait peut se dessiner

            if (canvasSignature.pointTrace) { // Si le trait peut se dessiner
                canvasSignature.ctx.beginPath();
                canvasSignature.ctx.fillStyle = "black";
                canvasSignature.ctx.fillRect(canvasSignature.actuelPosX, canvasSignature.actuelPosY, 2, 2); // Remplissage du déplacement
                canvasSignature.ctx.closePath();
                canvasSignature.pointTrace = false; // Le trait ne peut plus se dessiner
            }
        }

        // Si le clic gauche est relâché où que le curseur est à l'extérieur du canevas

        if (reponse === 'relacheSouris' || reponse === "exterieurCanvas") {
            canvasSignature.clicCanvas = false;
            /* Etant donné qu'il y a forcément un dessin à ce moment là, autorisation 
            d'effacer pour l'utilisateur */
            canvasSignature.effacer();
        }

        // Detection de la position de la souris à l'intérieur du canevas

        if (reponse === 'positionXY') {
            if (canvasSignature.clicCanvas) {
                canvasSignature.precedentePosX = canvasSignature.actuelPosX;
                canvasSignature.precedentePosY = canvasSignature.actuelPosY;
                canvasSignature.actuelPosX = e.offsetX - canvasSignature.canvas.offsetLeft;
                canvasSignature.actuelPosY = e.offsetY - canvasSignature.canvas.offsetTop;
                canvasSignature.dessiner(); // Permet de dessiner une fois que la position de la souris est detectée
            }
        }
    }
};