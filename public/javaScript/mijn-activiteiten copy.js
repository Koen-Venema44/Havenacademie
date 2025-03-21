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
  .then((snapshot) => {
    if (snapshot.exists()) {
      const activities = snapshot.val();
      displayActivities(activities);
      console.log(activities);
    } else {
      console.log("no activities found")
    }
  })
  .catch((error) => {
    console.error("Error fetching activities:", error);
  })


function displayActivities(activities) {
  const activityContainer = document.querySelector(".activiteiten");
  activityContainer.innerHTML = ""; // Clear previous content

  Object.keys(activities).forEach((id) => {  // Loop through activities
    const activity = activities[id];
    console.log(activity);

    const activityElement = document.createElement("a");
    activityElement.classList.add("activity");
    activityElement.innerHTML = `
          <div class="icon">
							<img class="voetbal-icon" alt="" src="../images/Voetbal.png">
					</div>
					<div class="info">
						<div class="bovenlijn">
							<div class="voetbal">${activity.activity.Name}</div>
							<div class="person-icon-parent">
								<img class="person-icon" alt="" src="../images/Person Icon.svg">

								<div class="voetbal">27/30</div>
							</div>
						</div>
						<img class="info-child" alt="" src="../images/Line 11.svg">

						<div class="onderlijn">
							<div class="voetbal">${activity.activity.TimeStart} - ${activity.activity.TimeEnd}</div>
							<div class="bongerdstraat-1">${activity.activity.Location}</div>
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
        set(ref(db, 'users/students/' + sanitizedEmail + "/" + id + "/" + 'registeredActivities'), {
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
  const descriptionContainer = document.querySelector(".beschrijvingframe");
  descriptionContainer.innerHTML = `
          <div class="titel">
            <div class="logo">
              <img class="voetbal-icon" alt="" src="../images/voetbal.png">
            </div>
            <div class="voetbal-parent">
              <div class="voetbal20">${activity.activity.Name}</div>
              <div class="deelnemers">
                <img class="person-icon" alt="" src="../images/Person Icon.svg">
                <div class="voetbal">27/30</div>
              </div>
            </div>
			  	</div>

          <div class="details-plaatje">
            <div class="details">
              <div class="voetbal">
                <p class="tijd-1300-">
                  <b class="details2">Details</b>
                  <span>:</span>
                </p>
                <p class="tijd-1300-">Locatie: ${activity.activity.Location}</p>
                <p class="tijd-1300-">Tijd: ${activity.activity.TimeStart} - ${activity.activity.TimeEnd}</p>
                <p class="tijd-1300-">Datum: ${activity.activity.Date}</p>
                <p class="tijd-1300-">Aanbieder: Voetbalpraktijken</p>
              </div>
            </div>
            <img class="image-4-icon" id="description" alt="" src="../images/voetbalpreview.png">
          </div>
          
          <div class="beschrijving">
            <div class="kom-buiten-met">${activity.activity.Description}</div>
          </div>

          <button class="activity-choose" id="activity-choose"> Uitschrijven </button>
          <button class="activity-goback" id="activity-goback">Terug</button>`;

  if (window.innerWidth < 1442) {
    document.getElementById("activity-description-container").classList.add("view-preview");
    document.getElementById("activity-container").classList.add("preview-mode");
    document.getElementById("activity-goback").classList.add("showgoback");
    document.getElementById("description").classList.add("marginbottom0");


  } else {
    const descriptionContainer = document.querySelector(".beschrijvingframe");
    descriptionContainer.innerHTML = `
          <div class="titel">
            <div class="logo">
              <img class="voetbal-icon" alt="" src="../images/voetbal.png">
            </div>
            <div class="voetbal-parent">
              <div class="voetbal20">${activity.activity.Name}</div>
              <div class="deelnemers">
                <img class="person-icon" alt="" src="../images/Person Icon.svg">
                <div class="voetbal">27/30</div>
              </div>
            </div>
			  	</div>

          <div class="details-plaatje">
            <div class="details">
              <div class="voetbal">
                <p class="tijd-1300-">
                  <b class="details2">Details</b>
                  <span>:</span>
                </p>
                <p class="tijd-1300-">Locatie: ${activity.activity.Location}</p>
                <p class="tijd-1300-">Tijd: ${activity.activity.TimeStart} - ${activity.activity.TimeEnd}</p>
                <p class="tijd-1300-">Datum: ${activity.activity.Date}</p>
                <p class="tijd-1300-">Aanbieder: Voetbalpraktijken</p>
              </div>
            </div>
            <img class="image-4-icon" alt="" src="../images/voetbalpreview.png">
          </div>
          
          <div class="beschrijving">
            <div class="kom-buiten-met">${activity.activity.Description}</div>
          </div>

          <button class="activity-choose" id="activity-choose"> Uitschrijven </button>
          `;
  }

  document.getElementById("activity-goback").addEventListener('click', () => {
    document.getElementById("activity-description-container").classList.remove("view-preview");
    document.getElementById("activity-container").classList.remove("preview-mode");
    document.getElementById("activity-goback").classList.remove("showgoback");
    document.getElementById("description").classList.remove("marginbottom0");
  });
}