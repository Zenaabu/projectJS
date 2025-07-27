'use strict';

// saving the search input in a const
const searchInput = document.querySelector('.searchBar input');

// סינון אנשי קשר לפי מה שהמשתמש מקליד
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); // transfering the name to lower case
    const contactItems = document.querySelectorAll('#contacts li'); // having all the contacts

    contactItems.forEach(li => {
        const name = li.querySelector('strong').textContent.toLowerCase();
        li.style.display = name.includes(query) ? '' : 'none'; // if the contact name includes what the user wrote
        //then - don't change the style (it should be on screen)
        //if not - hide the contact it's not relevant
    });
});
