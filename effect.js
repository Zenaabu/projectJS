'use strict';

// save the dark mode button 
const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');

// on click event for the dark mode 
toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // change the theme using css
});
