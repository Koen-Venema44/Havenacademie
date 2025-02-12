if (!sessionStorage.getItem('studentnameUnlocked')) {
    window.location.replace("../login.html");
}
if (sessionStorage.getItem('studentnameUnlocked') == true) {
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