var dict = {
    en: {
        'Home': 'Home',
        'About': 'About',
        'Projects': 'Projects',
        'Contacts': 'Contacts',
        'Language' : 'Language',
        'Italian' : 'Italian',
        'English' : 'English',
        'Hi' : "Hi, I'm Federico Guidazzi",
        'Intro' : "I'm a software engineer, with passion for coding and almost all the tech world.",
        'Intro2' : "Currently I work as Software Engineer at GFT.",
        'AboutMe' : "About Me",
        'Description1' : "The passion for technology, in particular for informatics, has been with me throughout my life, this can be testified by the university studies that I have chosen.",
        'Description2' : "I find beautiful how IT can be used in any area of ​​our lives, enriching it, facilitating it and giving it an irresistible charm, from my point of view.",
        'Description3' : "I am very interested by the technologies in development and how they are exponentially advancing all the areas in which they are used, hemlping me to stay updated on new technologies.",
        'Description4' : "In conclusion, I specify, that writing code and solving problems are activities that I find very rewarding and satisfying, especially if the difficulties that are solved can change everyone's life, even if only in a small part, thus taking a small step towards a better world.",
        'Description5' : "I'm open to Job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.",
        'Skills':'Skills',
        'Projects':'Projects',
        'Contacts':'Contacts',
        'BookaMeli' : "BookaMeli was an university project i did with another student, the objective of the project was to create a complete e-commerce website for a library, where the clients can buy books and the owner can manage all the aspects of the website, starting from add, remove and modify books to add new cathegories of objects or manage those that already exists.",
        'MenuManager':'A simple android application to manage all the aspect of a weekly menu, you can create receipts, add ingredients to the shopping list and even watch recipt of other users.',
        "Esp32_OpenDoorProject":"A collection of solutions that allows to open door and gate from remote using a Esp32 device and a relay.",
        "MushroomsEdible":"In this project i used used some mushrooms characteristics to classified them as edibles or not, using a dataset conteining more than 8000 mushrooms. The final accuracy was 100%.",
        "ContactsDescription" : "Feel free to contact me whenever you want, the followings are the links to my social networks."
    },
    it: {
        'Home': 'Home',
        'About': 'Chi Sono',
        'Projects': 'Progetti',
        'Contacts': 'Contatti',
        'Language' : 'Lingua',
        'Italian' : 'Italiano',
        'English' : 'Inglese',
        'Hi' : "Ciao, Sono Federico Guidazzi",
        'Intro' : "Sono un ingegnere informatico, appassionato di programmazione e quasi tutto quello che fa parte del mondo tecnologico.",
        'Intro2' : "Attualmente lavoro come ingegnere informatico presso GFT.",
        'AboutMe' : "Chi Sono",
        'Description1' : "La passione per la tecnologia, in particolare per l'informatica, mi ha accompagnato da sempre nel corso della mia vita, questo può essere testimoniato dal percorso di studi universitari che ho scelto.",
        'Description2' : "Trovo bellissimo come l'informatica si possa sposare con qualsiasi ambito della nostra vita, arricchendolo, facilitandolo e donandogli un fascino irresistibile, dal mio punto di vista.",
        'Description3' : "Sono molto incuriosito dalle tecnologie informatiche in sviluppo e di come queste stiano facendo avanzare in modo esponenziale tutti gli ambiti in cui esse trovano utilizzo, facendomi così rimanere al passo coi tempi.",
        'Description4' : "Concludo, specificando, che scrivere codice e risolvere problemi è un'attività che trovo molto ripagante e soddisfacente, sopratutto se le difficoltà che si vanno a risolvere possono cambiare, anche se solo in piccola parte, la vita di tutti, facendo così un piccolo passo verso un mondo migliore.",
        'Description5' : "Sono aperto a nuove offerte lavorative a cui possa contribuire, imparare e crescere. Se hai un'opportunità lavorativa che incontra le mie competenze e esperienza non esitare a contattarmi.",
        'Skills':'Competenze',
        'Projects':'Progetti',
        'Contacts':'Contatti',
        'BookaMeli' : "BookaMeli è stato un progetto universitario che ho fatto insieme a un altro studente, l'obbiettivo del progetto era quello di creare un sito e-commerce per una libreria, dove i clienti possono comprare libri e il proprietario può gestire tutti gli aspetti del sito, a partire dall'aggiunta, rimozione e modifica dei libri fino all'aggiunta di nuove categorie di oggetti o la gestione di quelle già esistenti.",
        'MenuManager': "Una semplice applicazione android che permette di gestire tutti gli aspetti di un menu settimanale, si ha la possibilità di creare ricette, aggiungere ingredienti alla lista della spesa e anche consultare ricette degli altri utenti.",
        "Esp32_OpenDoorProject":"Una collezioni di soluzione che permettono di aprire portone e cancello da remoto autilizzando un Esp32 e un relè.",
        "MushroomsEdible":"In questo progetto ho utilizzato alcune caratteristiche dei funghi per classificarli in commestibili o no, utilizzando un dataset contenente più di 8000 funghi. L'accuratezza finale è del 100%.",
        "ContactsDescription" : "Sentiti libero di contattarmi quando vuoi, i seguenti sono i links ai miei social networks."
    },
    
}

function translate(dict, lang, word) {
    return dict[lang][word];
}

function translateAll(lang){
    var tmpl = $('.template');
    $.each(tmpl, (key, value)=> {
        var html = translate(dict, lang, $(value).attr('id'));
        value.innerText = html;
    });
}


$(document).ready(function(){
    let bool = true;

    translateAll('it');

    $(".dropdownIcon").click(()=>{
        if(bool){
            $(".dropdownIcon").attr("src", "./resources/x-lg.svg");
        } else {
            $(".dropdownIcon").attr("src", "./resources/list.svg");
        }
        bool = !bool;
    });

    $('.dropdown-menu>li').click(function(){
        var lang;
        if($(this).attr('id') == 'Italian'){
            lang = 'it';
        } else if($(this).attr('id') == 'English'){
            lang = 'en';
        }
        translateAll(lang);
    })

    const observer = new IntersectionObserver((entities)=>{
        entities.forEach((entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        }));
    });

    const hiddenElements = document.querySelectorAll('.nascosto');
    hiddenElements.forEach((el)=>observer.observe(el));

    setInterval(function () {
        const observer = new IntersectionObserver((entities)=>{
            entities.forEach((entry=>{
                var center = window.innerHeight / 2;
                if(entry.target.getBoundingClientRect().top<=center && entry.target.getBoundingClientRect().bottom>=center){
                    var string = $(entry.target).attr("id").charAt(0).toUpperCase() + $(entry.target).attr("id").slice(1);
                    $('#'+string).css('color', 'black');
                } else {
                    var string = $(entry.target).attr("id").charAt(0).toUpperCase() + $(entry.target).attr("id").slice(1);
                    $('#'+string).css('color', 'var(--bs-nav-link-color)');
                }
            }));
        });
        
        const hiddenElements = document.querySelectorAll('.nascosto');
        hiddenElements.forEach((el)=>observer.observe(el));
        
    }, 1000);

    $('#email').click(function(event){
        event.preventDefault();
        window.open('mailto:guidazzi.federico@gmail.com');
    });
});