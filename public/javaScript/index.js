const buttons = document.querySelectorAll('.popup-button');

// Voeg een klik-eventlistener toe aan elke knop
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Haal de ID van het doelmodaal op
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Toon het modaal
        }
    });
});

// Sluiten van modals
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Verberg het modaal
    });

    // Sluiten als je buiten het modaal klikt
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});


// database

const firebaseConfig = {
    apiKey: "AIzaSyBNNdYK4IfN_45gX2P_op7HGdkancdC5XA",
    authDomain: "havenacademie.firebaseapp.com",
    databaseURL: "https://havenacademie-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "havenacademie",
    storageBucket: "havenacademie.firebasestorage.app",
    messagingSenderId: "344623421086",
    appId: "1:344623421086:web:62019190a8697cd466cd8f"
  };

    var app = initializeApp(firebaseConfig);

  var database = firebase.database();

  submit = document.getElementById("submitbutton");

  submit.addEventListener('click', save());

  function save() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    database.ref('users/' + username).set ({
        username : username,
        email : email
    })

    alert('saved');
  }
