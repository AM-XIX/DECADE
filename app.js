/* === AVANT PROPOS === */
/* Même si beaucoup d'animations sont permises par le script, la plupart des animations sont conçues d'abord en CSS, et ne sont que déclenchées par le JavaScript. */


/* Ici c'est le champ actif, quand la page est chargée, tout ce qui est actions directes se trouve là. */

$(document).ready(function () {
    /* ----- Display par défaut -----*/
    /* Je m'assure que même par un malheur du clip-path ou de l'overflo hidden du CSS, mes pages n'apparaissent pas tant que je ne les ai pas appelées.*/
    $(".card p").hide();
    $(".page").css("display", "none");
    $(".page2").css("display", "none");

    /* Actionnement du premier bouton "Rewind" (Animation en deux temps, ici c'est la partie JQuery).*/
    $("#action").click(function () {
        $(".page").css("display", "block");
    });

    /* Pour le dépliement des cartes, le défi était de faire en sorte que toutes les cartes ne se déplient pas à la moindre flèche de carte actionnée.
    J'ai dû donc cibler la bonne carte. */
    $(".arrow").click(function () {
        /* ici je prend l'id de la flèche, qui est exactement le même nom que la class de la carte à laquelle elle correspond. */
        var data = $(this).attr("id");
        id = "." + data;

        /* ici je prend l'id du "see more" à faire disparaître au dépliement, qui est le nom de l'id initial, avec une simple lettre L derrière */
        var idL = "." + data + "L";

        /* Dépliement de la carte*/
        $(id).slideToggle();

        /* Si au clic la flèche est déjà tournée vers le bas je...
        - Retourne la flèche vers le haut
        - Fais disparaître le contenu p de la carte
        - Fais réapparaître le label "see more"*/
        if ($(this).hasClass("animArrow")) {
            $(this).removeClass("animArrow");
            $(this).addClass("animArrowBack");
            $(idL).animate({
                opacity: '1'
            }, "fast");
            $(".line").animate({
                height: '-=1%'
            }, 500);
            $("#project").animate({
                marginTop: '-=2vh'
            }, 500);
        }
        /* Si au clic la flèche est tournée vers le HAUT (comme par défaut) je fais tout l'inverse */
        else {
            $(this).removeClass("animArrowBack");
            $(this).addClass("animArrow");
            $(idL).animate({
                opacity: '0'
            }, "fast");
            /* À cause du défilement (et donc de l'augmentation de la taille des cartes dans le flux), j'ai eu un problème : la ligne chronoligque, qui elle est absolute, se faisait largement dépasser dès qu'on ouvrait plus de deux cartes en même temps.
            Donc, ma solution est, à chaque fois qu'une carte est dépliquée :
            - La ligne chrono prend 1% de hauteur en plus
            - Le bouton projet, en-dessous des cartes, prend 2vh de marge en plus.
            
            Au-dessus, cette tendance est inversée à chaque fois qu'on replie une carte. */
            $(".line").animate({
                height: '+=1%'
            }, 500);
            $("#project").animate({
                marginTop: '+=2vh'
            }, 500);
        }
    });

    /* Animation de l'onglet Projet au clic du bouton : la page disparait, l'onglet slide vers gauche. */
    $("#project").click(function () {
        $(".page2").css("display", "block");
        $(".page2").animate({
            left: '0vw'
        }, "slow");
        $(".page").css("display", "none");
    });

    /* Animation du retour vers la page principale depuis l'onglet projet */
    $("#back").click(function () {
        $(".page").css("display", "block");
        $(".page2").animate({
            left: '100vw'
        }, "slow", function () {
            $(".page2").css("display", "none");
        });
    });

});

/* FIN de la partie active */
/* Ici, c'est mon garage à fonctions, qui sont souvent déclenchées dans le HMTL */

/* Animation de l'Intro */
function action() {
    /* Déclenchement de l'animation de chaque lettre */
    document.querySelector(".letterD").classList.add("animD");
    document.querySelector(".letterE").classList.add("animE");
    document.querySelector(".letterC").classList.add("animC");
    document.querySelector(".letterA").classList.add("animA");
    document.querySelector(".letterD2").classList.add("animD");
    document.querySelector(".letterE2").classList.add("animE");

    /* Déclenchement du clip-path de la page principale, de 0% à 100% */
    document.querySelector(".page").classList.add("animEclipse");
    document.querySelector(".word").classList.add("animFinish");

    /* Ces intervals indiquent :
    - La somme des secondes de l'animation des lettres
    - "" + la somme des secondes de l'animation du changement de couleur au DECADE */
    setInterval(animAction, 4000);
    setInterval(disappear, 6000);

    /* À l'arrivée, le titre "#DECADE" de la page principale a une légère animation pour se placer vers le haut, qui est plutôt subtile */
    document.querySelector("h1").classList.add("animh1");
}

function animAction() {
    var elem = document.querySelector("#action");
    elem.style.color = 'var(--decade)';
    elem.style.borderColor = 'var(--decade)';
}

function disappear() {
    var intro = document.querySelector(".introBlock");
    intro.style.display = 'none';
}

/* Je m'assure que le clip-path ne fasse pas des siennes */
function endEclipse() {
    var page = document.querySelector(".page");
    if (page.classList.contains("animEclipse")) {
        page.classList.remove("animEclipse");
        page.classList.add("eclipseBack");
    } else {}
}

/* Comme le bouton "Project" se trouve en bas de la page principale, le cliquer ferait ammener l'utilisatuer en bas de l'onglet projet... où c'est le vide complet.
Pour pallier ça, j'ai cette fonction qui scrolle automatiquement jusqu'en haut quand on passe à l'onglet Projet */
function scrolling() {
    window.scrollTo(0, 0);
}