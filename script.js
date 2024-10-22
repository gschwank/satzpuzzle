// Französische Sätze A1-Niveau - 30 Sätze
const sentences = [
    { sentence: "Je vais à l'école.", words: ["Je", "vais", "à", "l'école."] },
    { sentence: "Il mange une pomme.", words: ["Il", "mange", "une", "pomme."] },
    { sentence: "Nous aimons le chocolat.", words: ["Nous", "aimons", "le", "chocolat."] },
    { sentence: "Elle parle avec son ami.", words: ["Elle", "parle", "avec", "son", "ami."] },
    { sentence: "Tu regardes la télé.", words: ["Tu", "regardes", "la", "télé."] },
    { sentence: "Il lit un livre.", words: ["Il", "lit", "un", "livre."] },
    { sentence: "Nous faisons du sport.", words: ["Nous", "faisons", "du", "sport."] },
    { sentence: "Vous aimez le café.", words: ["Vous", "aimez", "le", "café."] },
    { sentence: "Ils jouent au football.", words: ["Ils", "jouent", "au", "football."] },
    { sentence: "Elle chante une chanson.", words: ["Elle", "chante", "une", "chanson."] },
    { sentence: "Je prends le bus.", words: ["Je", "prends", "le", "bus."] },
    { sentence: "Tu écoutes de la musique.", words: ["Tu", "écoutes", "de", "la", "musique."] },
    { sentence: "Il va au cinéma.", words: ["Il", "va", "au", "cinéma."] },
    { sentence: "Nous mangeons du pain.", words: ["Nous", "mangeons", "du", "pain."] },
    { sentence: "Elle danse bien.", words: ["Elle", "danse", "bien."] },
    { sentence: "Ils vont à Paris.", words: ["Ils", "vont", "à", "Paris."] },
    { sentence: "Je bois du thé.", words: ["Je", "bois", "du", "thé."] },
    { sentence: "Tu lis un journal.", words: ["Tu", "lis", "un", "journal."] },
    { sentence: "Il écoute la radio.", words: ["Il", "écoute", "la", "radio."] },
    { sentence: "Nous aimons les livres.", words: ["Nous", "aimons", "les", "livres."] },
    { sentence: "Vous allez à l'école.", words: ["Vous", "allez", "à", "l'école."] },
    { sentence: "Elle cuisine bien.", words: ["Elle", "cuisine", "bien."] },
    { sentence: "Ils voyagent en train.", words: ["Ils", "voyagent", "en", "train."] },
    { sentence: "Je dessine une maison.", words: ["Je", "dessine", "une", "maison."] },
    { sentence: "Tu joues du piano.", words: ["Tu", "joues", "du", "piano."] },
    { sentence: "Il travaille beaucoup.", words: ["Il", "travaille", "beaucoup."] },
    { sentence: "Nous allons à la plage.", words: ["Nous", "allons", "à", "la", "plage."] },
    { sentence: "Elle aime les animaux.", words: ["Elle", "aime", "les", "animaux."] },
    { sentence: "Ils lisent un magazine.", words: ["Ils", "lisent", "un", "magazine."] },
    { sentence: "Je fais du vélo.", words: ["Je", "fais", "du", "vélo."] }
];

let currentSentence = {};
let draggedElement = null;

// Füge den Ton hinzu
const dropSound = new Audio('drop-sound.mp3'); // Stelle sicher, dass du den Pfad zu deiner Audiodatei richtig setzt

function playSound() {
    dropSound.play();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadPuzzle() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = '';
    const dropZoneContainer = document.getElementById('drop-zone-container');
    dropZoneContainer.innerHTML = '';

    const shuffledWords = shuffle([...currentSentence.words]);

    // Erstelle die Wörter
    shuffledWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = word;
        wordDiv.classList.add('word');
        wordDiv.setAttribute('draggable', true);
        wordDiv.addEventListener('dragstart', dragStart);
        wordDiv.addEventListener('dragend', dragEnd);
        wordsContainer.appendChild(wordDiv);
    });

    // Erstelle die Drop-Zonen
    currentSentence.words.forEach(() => {
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.addEventListener('dragover', allowDrop);
        dropZone.addEventListener('drop', drop);
        dropZoneContainer.appendChild(dropZone);
    });
}

function dragStart(event) {
    draggedElement = event.target;
    setTimeout(() => {
        event.target.style.visibility = 'hidden'; // Mache das gezogene Wort unsichtbar
    }, 0);
}

function dragEnd(event) {
    event.target.style.visibility = 'visible'; // Zeige das Wort wieder an
    draggedElement = null;
}

function allowDrop(event) {
    event.preventDefault(); // Erlaube das Ablegen
}

function drop(event) {
    event.preventDefault();

    // Überprüfe, ob die Drop-Zone leer ist
    if (event.target.classList.contains('drop-zone') && !event.target.firstChild) {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = draggedElement.textContent;
        wordDiv.classList.add('word');
        wordDiv.setAttribute('draggable', true);
        wordDiv.addEventListener('dragstart', dragStart);
        wordDiv.addEventListener('dragend', dragEnd);
        event.target.appendChild(wordDiv);

        // Spiele den Ton ab, wenn das Wort abgelegt wird
        playSound();

        // Entferne das gezogene Wort aus dem ursprünglichen Container
        draggedElement.remove();
    } else if (event.target.classList.contains('word')) {
        // Wenn das Ziel bereits ein Wort enthält, schiebe das Wort in die ursprüngliche Liste zurück
        const wordsContainer = document.getElementById('words');
        wordsContainer.appendChild(event.target);
    }
}

function checkSentence() {
    const feedback = document.getElementById('feedback');
    const dropZoneContainer = document.getElementById('drop-zone-container');
    const dropZones = [...dropZoneContainer.children];
    const formedSentence = dropZones.map(zone => zone.firstChild ? zone.firstChild.textContent : "").join(' ');

    if (formedSentence === currentSentence.words.join(' ')) {
        feedback.textContent = "Richtig!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Falsch, versuche es erneut.";
        feedback.style.color = "red";
    }
}

document.getElementById('check-btn').addEventListener('click', checkSentence);

document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('feedback').textContent = '';
    loadPuzzle();
});

window.onload = loadPuzzle;