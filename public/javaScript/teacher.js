    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
    import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries

            // Your web app's Firebase configuration
            const firebaseConfig = {
              apiKey: "AIzaSyBNNdYK4IfN_45gX2P_op7HGdkancdC5XA",
              authDomain: "havenacademie.firebaseapp.com",
              databaseURL: "https://havenacademie-default-rtdb.europe-west1.firebasedatabase.app",
              projectId: "havenacademie",
              messagingSenderId: "344623421086",
              appId: "1:344623421086:web:62019190a8697cd466cd8f"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const db = getDatabase(app);    

if (!sessionStorage.getItem('teacherUnlocked')) {
    window.location.replace("../login.html");
}
if (sessionStorage.getItem('teacherUnlocked') == true) {
    if(sessionStorage.getItem('studentUnlocked') != null); {
    sessionStorage.removeItem('studentUnlocked');
    }
    if(sessionStorage.getItem('providerUnlocked') != null) {
    sessionStorage.removeItem('providerUnlocked');
    }
    if(sessionStorage.getItem('parentUnlocked') != null) {
    sessionStorage.removeItem('parentUnlocked');
    }
}



            const studentsRef = ref(db, "users/students");

            async function getStudentsByActivity(activityID) {
                const snapshot = await get(studentsRef);
                if (snapshot.exists()) {
                    let registeredStudents = [];

                    snapshot.forEach(studentSnapshot => {
                        const studentData = studentSnapshot.val();
                        if (studentData.registeredactivities && studentData.registeredactivities[activityID]) {
                            registeredStudents.push({
                                email: studentSnapshot.key,  // Assuming email is the key
                                ...studentData  // Include other student details if needed
                            });
                        }
                    });

                    console.log("Registered Students:", registeredStudents);
                    return registeredStudents;
                } else {
                    console.log("No students found.");
                    return [];
                }
            }
