
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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

    const auth = getAuth(app);
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);



    // functions 

    // validate functions




      // functions for login

      export function write() {
        
      }