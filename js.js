'use strict'
const contacts=[
    {
        name:"Alice Jason",
        phone:"0524163789",
        email:"alice@gmail.com"
    },
    {
        name:"Tom Hanks",
        phone:"0541237896",
        email:"tom123@law.co.il"
    },
    {
        name:"Eran Zahavi",
        phone:"0531278964",
        email:"eranza11@yahoo.com"
    },
]


const ol=document.getElementById('contacts') // creating the ol (list)

// for each contact in the contacts array do:
contacts.forEach(contact => {
    const li = document.createElement('li') // create a new li (a roe for each contact in the list)
    const strong = document.createElement('strong') // create an element for the contact name
    strong.textContent=contact.name

    const divIconButtons = document.createElement('div') // create a wrapper for the buttons (info, edit, delete)
    divIconButtons.className="iconButtons" 

    const iInfo=document.createElement('i') // creating the icon for the info button
    iInfo.className="fas fa-circle-info"

    const iEdit=document.createElement('i') // creating the icon for the edit button
    iEdit.className="fas fa-pen"

    const iDelete=document.createElement('i') // creating the icon for the delete button
    iDelete.className="fas fa-trash"

    const infoBtn = document.createElement('button') // creating the info button
    infoBtn.setAttribute('title', "Info")
    infoBtn.append(iInfo)

    const editBtn = document.createElement('button') // creating the edit button
    editBtn.setAttribute('title', "Edit")
    editBtn.append(iEdit)

    const deleteBtn = document.createElement('button') // creating the delete button
    deleteBtn.setAttribute('title', "Delete")
    deleteBtn.append(iDelete)

    divIconButtons.append(infoBtn, editBtn, deleteBtn) // adding the buttons to their wrapper
    li.append(strong, divIconButtons) // adding the name of the contact & the buttons wrapper to the li
    ol.append(li) // adding the li to the list (ol)
    

    const modal = document.createElement('div'); // creating a new wrapper for the popup message
    modal.className = 'modal hidden';

    const modalContent = document.createElement('div'); // creating a wrapper inside the popup wrapper
    modalContent.className = 'modalContent';

    const closeBtn = document.createElement('span'); // creating a closing button for the popup
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';

    const alertText = document.createElement('p'); // creating a popuptext inside the content wrapper in the popup
    alertText.id = 'alertText';

    modalContent.append(closeBtn, alertText); // adding the text and the button to the contact wrapper
    modal.append(modalContent); // adding the contact wrapper to the popup wrapper
    document.body.append(modal); // adding the popup to the body

    const alertTitle = document.createElement('h2'); // creating a title for the popup
    alertTitle.textContent = 'Contact Info'; 
    alertTitle.className = 'modalTitle'; 

    modalContent.insertBefore(alertTitle, alertText);  // adding the title to the popup


    // close popup button
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modalOpen');

    });

    // contact information
    infoBtn.addEventListener('click', () =>{
        alertTitle.style.display = 'block';
        alertText.textContent = `Name: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`;
        modal.classList.remove('hidden');
        document.body.classList.add('modalOpen');

    })

    // delete contact
    deleteBtn.addEventListener('click', () => {
   
        alertTitle.style.display = 'none';  // hide title "Contact Info"

        alertText.textContent = `Are you sure you want to delete ${contact.name}?`; // update the alert text      

        // create a delete button
        const deleteContact = document.createElement('button');
        deleteContact.textContent = 'Yes, delete';
        deleteContact.classList.add('confirmDeleteBtn');

        // create a cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancelDeleteBtn');

        // Wrapping the buttons in a wrapper (div)
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add('modalButtons');
        buttonsWrapper.append(cancelBtn, deleteContact);

        // adding the buttons with their wrapper under the alert text
        alertText.appendChild(buttonsWrapper);

        // show the popup
        modal.classList.remove('hidden');
        document.body.classList.add('modalOpen');

        // delete the contact when clicking on delete button
        deleteContact.addEventListener('click', () => {
            li.remove();
            modal.classList.add('hidden');
            document.body.classList.remove('modalOpen');
        });

        // cancel the process when clicking the cancel button
        cancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.classList.remove('modalOpen');
        });
    });
});