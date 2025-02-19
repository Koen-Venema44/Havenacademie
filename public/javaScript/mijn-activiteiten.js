import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
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
    const studentActivitiesRef = ref(db, 'users/students/' + sanitizedEmail + "/" + 'registeredActivities/');
    console.log(sessionStorage.getItem('loggedEmail'));

    get(studentActivitiesRef)
    .then ((snapshot) => {
      if (snapshot.exists()) {
        const activities = snapshot.val();
        displayActivities(activities);
        console.log(activities);
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
        console.log(activity);

        const activityElement = document.createElement("a");
        activityElement.classList.add("activity");
        activityElement.innerHTML = `
          <img class="activity-img" src="../images/voetbal.png" alt="">
          <div class="text-container-activity">
            <h1 class="activity-name">${activity.activity.Name}</h1>
            <div class="line"></div>
            <div class="p-container">
              <p class="p-activity">${activity.activity.TimeStart}</p><p class="p-activity"> ${activity.activity.TimeEnd} </p>
              <p class="p-activity-right">${activity.activity.Location}</p>
            </div>
          </div>
        `;
        // Add click event to show activity details
        activityElement.addEventListener("click", () => {
          showActivityDetails(activity);
          const registerbutton = document.getElementById("activity-choose");
          registerbutton.addEventListener('click', (e) => {
            e.preventDefault();

            const activity = activities[id];
              set(ref(db, 'users/students/' + sanitizedEmail + "/" + id + "/" +'registeredActivities'), {
                activity
              }); alert('succesfull');
          });
        });
        activityContainer.appendChild(activityElement);  // Add to page

        if (Object.keys(activities).length <= 4) {
          activityContainer.classList.add("activity-container-less");
          activityElement.classList.add("activity-less");
        }
        
      });
    }

    function showActivityDetails(activity) {
      const descriptionContainer = document.querySelector(".activity-description-container");
      descriptionContainer.innerHTML = `
          <h1 class="description-h2"> ${activity.activity.Name}</h1>
          <div class="details-img-container">
              <div class="details-container">
                  <p class="details-p" id="details-p">Details:</p>
                  <p class="location-p" id="location-p">${activity.activity.Location}</p>
                  <p class="time-p" id="time-p">${activity.activity.TimeStart} - ${activity.activity.TimeEnd}</p>
                  <p class="date-p" id="date-p">${activity.activity.Date}</p>
                  <p class="aanbieder-p" id="aanbieder-p"></p>
              </div>
              <img src="../images/voetbalpreview.png" alt="" class="preview-img">
          </div>
          <div class="description" id="description">
              <p class="description-p" id="description-p">${activity.Description}</p>
          </div>
          <button class="activity-choose" id="activity-choose"> Inschrijven </button>
          <button class="activity-goback" id="activity-goback">Terug</button>`; 

          if (window.innerWidth < 1250) {
      document.getElementById("activity-description-container").classList.add("view-preview");
      document.getElementById("activity-container").classList.add("preview-mode");
      document.getElementById("activity-goback").classList.add("showgoback");
      document.getElementById("description").classList.add("marginbottom0");
          
      
  } else {
      const descriptionContainer = document.querySelector(".activity-description-container");
      descriptionContainer.innerHTML = `
          <h1 class="description-h2"> ${activity.Name}</h1>
          <div class="details-img-container">
              <div class="details-container">
                  <p class="details-p" id="details-p">Details:</p>
                  <p class="location-p" id="location-p">${activity.activity.Location}</p>
                  <p class="time-p" id="time-p">${activity.activity.TimeStart} - ${activity.activity.TimeEnd}</p>
                  <p class="date-p" id="date-p">${activity.activity.Date}</p>
                  <p class="aanbieder-p" id="aanbieder-p"></p>
              </div>
              <img src="../images/voetbalpreview.png" alt="" class="preview-img">
          </div>
          <div class="description" id="description">
              <p class="description-p" id="description-p">${activity.activity.Description}</p>
          </div>
          <button class="activity-choose" id="activity-choose"> Inschrijven </button>
          <button class="activity-goback" id="activity-goback">Terug</button>`;
  }

  document.getElementById("activity-goback").addEventListener('click', () => {
          document.getElementById("activity-description-container").classList.remove("view-preview");
          document.getElementById("activity-container").classList.remove("preview-mode");
          document.getElementById("activity-goback").classList.remove("showgoback");
          document.getElementById("description").classList.remove("marginbottom0");
      }); 
}