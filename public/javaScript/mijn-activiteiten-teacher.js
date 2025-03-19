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
    const teacherActivitiesRef = ref(db, 'users/teachers/' + sanitizedEmail + "/" + 'registeredActivities');
    const studentActivitiesRef = ref(db, 'users/students/');
    console.log(sessionStorage.getItem('loggedEmail'));

    get(teacherActivitiesRef)
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

    async function getStudentsByActivity(activityID) {
        const studentsListDiv = document.getElementById("students-list");
        studentsListDiv.innerHTML = ""; // Clear previous content
    
        const snapshot = await get(studentActivitiesRef);
        console.log("studentactivity", snapshot);
        if (snapshot.exists()) {
            let registeredStudents = [];
    
            snapshot.forEach(studentSnapshot => {
                const studentData = studentSnapshot.val();    
                console.log("Registered Activities for student:", studentData);
                if (studentData.registeredActivities) {
                  Object.values(studentData.registeredActivities).forEach(activityEntry => {
                    console.log("activityID", activityID);
                    console.log('activityid', activityEntry.activity.activityId);
                    if (activityEntry.activity.activityId == activityID) {
                        console.log('does this even work');
                        registeredStudents.push({
                            Name: studentSnapshot.key,
                            FirstName: studentData.FirstName,
                            LastName: studentData.LastName,
                            Email: studentData.Email
                        });
                    }
                });
                }
    
            });
    
            // Display students in HTML
            console.log('length', registeredStudents.length);
            if (registeredStudents.length > 0) {
                registeredStudents.forEach(student => {
                    const studentDiv = document.createElement("div");
                    studentDiv.classList.add("student-card");
    
                    studentDiv.innerHTML = `
                        <p><strong></strong> ${student.FirstName || "Unknown"}</p>
                        <p><strong></strong> ${student.LastName || "Unknown"}</p>
                    `;
    
                    studentsListDiv.appendChild(studentDiv);
                });
            } else {
                studentsListDiv.innerHTML = `<p class="nostudents">No students registered for this specific activity.</p>`;
            }
        } else {
            studentsListDiv.innerHTML = `<p class="nostudents">No students registered for this activity.</p>`;
        }
    }
    


    function displayActivities(activities) {
      const activityContainer = document.querySelector(".activiteitenframe");
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
                    <div class="voetbal">${activity.Name}</div>
                    <div class="person-icon-parent">
                    <img class="person-icon" alt="" src="../images/Person Icon.svg">

                    <div class="voetbal">${registeredStudents.length}/30</div>
                    </div>
                </div>
                <img class="info-child" alt="" src="Line 11.svg">

                <div class="onderlijn">
                    <div class="voetbal">${activity.TimeStart} - ${activity.TimeEnd}</div>
                    <div class="bongerdstraat-1">${activity.Location}</div>
                </div>
        `;
        // Add click event to show activity details
        activityElement.addEventListener("click", () => {
          showActivityDetails({...activity, ID : id});
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
              <div class="voetbal20">${activity.Name}</div>
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
                <p class="tijd-1300-">Locatie: ${activity.Location}</p>
                <p class="tijd-1300-">Tijd: ${activity.TimeStart} - ${activity.TimeEnd}</p>
                <p class="tijd-1300-">Datum: ${activity.Date}</p>
                <p class="tijd-1300-">Aanbieder: Voetbalpraktijken</p>
              </div>
            </div>
            <img class="image-4-icon" id="description" alt="" src="../images/voetbalpreview.png">
          </div>
          
          <div class="beschrijving">
            <div class="kom-buiten-met">${activity.Description}</div>
          </div>

          <button class="activity-choose" id="activity-choose"> Bekijk ingeschreven leerlingen </button>
      </div>
        `;

        getStudentsByActivity(activity.ID);
    
        if (window.innerWidth < 1250) {
            descriptionContainer.classList.add("view-preview");
            document.getElementById("activity-container").classList.add("preview-mode");
            document.getElementById("description")?.classList.add("marginbottom0"); // Use optional chaining (?.)
        }
    
        // Ensure that the element exists before adding an event listener
        const backButton = document.getElementById("activity-goback");
        if (backButton) {
            backButton.addEventListener("click", () => {
                descriptionContainer.classList.remove("view-preview");
                document.getElementById("activity-container").classList.remove("preview-mode");
                document.getElementById("description")?.classList.remove("marginbottom0");
            });
        } else {
            console.error("Back button not found in the DOM!");
        }
    }
    