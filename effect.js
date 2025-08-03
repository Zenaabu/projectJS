'use strict';

// save the dark mode button 
const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');

// on click event for the dark mode 
toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // change the theme using css

    const isDark = document.body.classList.contains('dark'); // check if the body class is dark

    // if the class is dark then change the text on the button to 'light mode'
    // if not (the theme is the regular theme) then change the button text to 'dark mode
    toggleDarkModeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode'; 
});
