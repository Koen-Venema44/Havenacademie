if (!sessionStorage.getItem('isUnlocked', true)) {
    window.location.replace("login.html");
}