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
    const teacherActivitiesRef = ref(db, 'users/teachers/' + sanitizedEmail + "/" + 'registeredActivities/');
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
        console.log("Fetching students for activity ID:", activityID);
        const studentsListDiv = document.getElementById("students-list");
        studentsListDiv.innerHTML = ""; // Clear previous content
    
        const snapshot = await get(studentActivitiesRef);
        console.log(snapshot.val());
        if (snapshot.exists()) {
            let registeredStudents = [];
            snapshot.forEach(studentSnapshot => {
                const studentData = studentSnapshot.val();
                console.log(studentData);
                if (studentData.registeredactivities && studentData.registeredactivities[activityID]) {
                    registeredStudents.push({
                        Name: studentSnapshot.key,  // Assuming email is the key
                        ...studentData  // Include other student details if needed
                    });
                }

                console.log(registeredStudents);
            });
    
            // Loop through the array and create HTML elements
            registeredStudents.forEach(student => {
                const studentDiv = document.createElement("div");
                studentDiv.classList.add("student-card"); // Optional CSS class
    
                studentDiv.innerHTML = `
                    <p><strong>Email:</strong> ${student.Email}</p>
                    <p><strong>Name:</strong> ${student.FirstName || "Unknown"}</p>
                    <p><strong>Name:</strong> ${student.LastName || "Unknown"}</p>
                `;
    
                studentsListDiv.appendChild(studentDiv);
            });
    
        } else {
            studentsListDiv.innerHTML = "<p>No students registered for this activity.</p>";
        }
    }


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
        const descriptionContainer = document.querySelector(".activity-description-container");
        descriptionContainer.innerHTML = `
            <div class="details-img-container">
                <div class="details-container">
                    <p class="details-p" id="details-p">Details:</p>
                    <p class="location-p" id="location-p">${activity.Location}</p>
                    <p class="time-p" id="time-p">${activity.TimeStart} - ${activity.TimeEnd}</p>
                    <p class="date-p" id="date-p">${activity.Date}</p>
                    <p class="aanbieder-p" id="aanbieder-p"></p>
                </div>
            </div>
            <div class="students-list" id="students-list">

            </div>
            <button class="activity-goback" id="activity-goback">Terug</button>
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
    