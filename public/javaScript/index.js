if (!sessionStorage.getItem('studentUnlocked')) {
    window.location.replace("../login.html");
}
if (sessionStorage.getItem('studentUnlocked', true)) {
    if(sessionStorage.getItem('teacherUnlocked') != null); {
    sessionStorage.removeItem('teacherUnlocked');
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





