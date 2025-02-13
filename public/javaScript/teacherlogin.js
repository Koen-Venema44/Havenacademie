if (!sessionStorage.getItem('teacherUnlocked')) {
    window.location.replace("../login.html");
}
if (sessionStorage.getItem('teacherUnlocked'), true) {
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

console.log("parent" , sessionStorage.getItem('parentUnlocked'));
console.log("teacher" ,sessionStorage.getItem('teacherUnlocked'));
console.log("student",sessionStorage.getItem('studentUnlocked'));
console.log("provider", sessionStorage.getItem('providerUnlocked'));