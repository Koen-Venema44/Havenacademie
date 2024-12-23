const buttons = document.querySelectorAll('.popup-button');

// Voeg een klik-eventlistener toe aan elke knop
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Haal de ID van het doelmodaal op
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Toon het modaal
        }
    });
});

// Sluiten van modals
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Verberg het modaal
    });

    // Sluiten als je buiten het modaal klikt
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
