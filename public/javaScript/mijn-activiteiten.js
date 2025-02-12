import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
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
    const db = getDatabase(app);
    const auth = getAuth(app);
    const sanitizedEmail = sessionStorage.getItem('loggedEmail').replace(/[.#$[\]@]/g, "_");
    const studentActivitiesRef = ref(db, 'users/students/' + sanitizedEmail + "/" + id + "/" +'registeredActivities');
    console.log(sessionStorage.getItem('loggedEmail'));

    const registerbutton = document.getElementById("activity-choose");

    registerbutton.addEventListener('click', registerActivity);

    
    get(studentActivitiesRef)
    .then ((snapshot) => {
      if (snapshot.exists()) {
        const studentActivities = snapshot.val();
        displayActivities(studentActivities);
        console.log(studentActivities);
      } else {
        console.log("no activities found")
      }
    })
    .catch ((error) => {
      console.error("Error fetching activities:", error);
    })


function displayActivities(activities) {
  const activityContainer = document.querySelector(".activity-container");
  activityContainer.innerHTML = ""; // Clear previous content

  Object.keys(activities).forEach((id) => {  // Loop through activities
    const activity = activities[id];

    const activityElement = document.createElement("a");
    activityElement.classList.add("activity");
    activityElement.innerHTML = `
      <img class="activity-img" src="../images/voetbal.png" alt="">
      <div class="text-container-activity">
        <h1 class="activity-name">${activity.Name}</h1>
        <div class="line"></div>
        <div class="p-container">
          <p class="p-activity">${activity.TimeStart}</p><p class="p-activity"> ${activity.TimeEnd} </p>
          <p class="p-activity-right">${activity.Location}</p>
        </div>
      </div>
    `;
    // Add click event to show activity details
    activityElement.addEventListener("click", () => {
      showActivityDetails(activity);
    });
    activityContainer.appendChild(activityElement);  // Add to page
  });
}