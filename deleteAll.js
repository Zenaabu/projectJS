'use strict';


const deleteAllBtn = document.getElementById('deleteAllBtn'); // get the delete all button

// onclick event for deleteAll button
deleteAllBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal'; // create our modal (popup)

    const modalContent = document.createElement('div');
    modalContent.className = 'modalContent'; // create a wrapper for the content in the popup

    // create the close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';

    // add a title for the popup
    const title = document.createElement('h2');
    title.className = 'modalTitle';
    title.textContent = 'Delete All Contacts';

    // add a warning message before deleting all contacts
    const text = document.createElement('p');
    text.textContent = 'Are you sure you want to delete all contacts?';

    // add a confirm button to delete the contacts
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Yes, delete all';
    deleteBtn.classList.add('confirmDeleteBtn');

    // add a cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancelDeleteBtn');

    // create a wrapper for the buttons
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'modalButtons';
    buttonsWrapper.append(cancelBtn, deleteBtn);

    // add the buttonwrapper with the warning message and the title to the contant wrapper in the popup
    modalContent.append(closeBtn, title, text, buttonsWrapper);
    modal.append(modalContent); // add the content wrapper to the popup
    document.body.append(modal); // add the popup to the body page
    document.body.classList.add('modalOpen'); // open the popup

    // if the user closes the popup then remove the popup (close it)
    const closeModal = () => {
        modal.remove();
        document.body.classList.remove('modalOpen');
    };

    // add the function of closing the popup for the close button and the cancel button
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // if the user confirms deleting all contgacts then delete them
    deleteBtn.addEventListener('click', () => {
        // Clear the array
        contacts.length = 0;

        // Remove all contacts from the list (ol is already exists in the main file)
        ol.innerHTML = '';

        // Close modal (popup)
         closeModal();
    });
});

