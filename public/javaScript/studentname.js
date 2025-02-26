import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
          // TODO: Replace the following with your app's Firebase project configuration
            // See: https://firebase.google.com/docs/web/learn-more#config-object
            const firebaseConfig = {
              apiKey: "AIzaSyBNNdYK4IfN_45gX2P_op7HGdkancdC5XA",
              authDomain: "havenacademie.firebaseapp.com",
              projectId: "havenacademie",
              messagingSenderId: "344623421086",
              appId: "1:344623421086:web:62019190a8697cd466cd8f",
              databaseURL: "https://havenacademie-default-rtdb.europe-west1.firebasedatabase.app"
            };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log("Firebase Auth Initialized:", auth);




if (!sessionStorage.getItem('studentnameUnlocked')) {
    window.location.replace("login.html");
}
if (sessionStorage.getItem('studentnameUnlocked'), true) {
    if(sessionStorage.getItem('teacherUnlocked') != null); {
    sessionStorage.removeItem('teacherUnlocked');
    }
    if(sessionStorage.getItem('studentUnlocked') != null) {
    sessionStorage.removeItem('studentUnlocked');
    }
    if(sessionStorage.getItem('parentUnlocked') != null) {
    sessionStorage.removeItem('parentUnlocked');
    }
    if(sessionStorage.getItem('providerUnlocked') != null) {
        sessionStorage.removeItem('providerUnlocked');
        }
}


const submit = document.getElementById("submitbutton");

submit.addEventListener('click', writeUserData);



async function writeUserData(event) {
    event.preventDefault(); // Prevents the form from refreshing

    const db = getDatabase(app);

    const emailInput = document.getElementById("email").value.toLowerCase();
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();

    const sanitizedEmail = emailInput.replace(/[.#$[\]@]/g, "_");


            set(ref(db, 'users/students/' + sanitizedEmail), {
                FirstName: firstName,
                LastName : lastName,
                Email: emailInput
            });
            alert("Successfully saved user data!"); 
}