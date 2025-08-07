'use strict'

// contacts array (list)
const contacts=[
    {
        name:"Alice Jason",
        phone:"0524163789",
        email:"alice@gmail.com",
        address:"דיזנגוף 99, תל אביב",
        freeText:"hi, i like cats",
        isFavorite: false
    },
    {
        name:"Tom Hanks",
        phone:"0541237896",
        email:"tom123@law.co.il",
        address:"שדרות הנשיא 103, חיפה",
        freeText:"I'm a lawyer",
        isFavorite: false
    },
    {
        name:"Eran Zahavi",
        phone:"0531278964",
        email:"eranza11@yahoo.com",
        address:"רחוב יפו 97, ירושלים",
        freeText:"playing games is my habbit",
        isFavorite: false
    },
    {
        name:"Percy Jackson",
        phone:"0501298736",
        email:"percyj@gmail.com",
        address:"הרצל 12, ראשון לציון",
        freeText:"my parents named me after reading the book percy jackson!",
        isFavorite: false
    }
]


const ol=document.getElementById('contacts') // creating the ol (list)

// a function that load the list sorted as favorites and names
function renderContacts() {
    // sort the list as the favorites contacts and as the names
    contacts.sort((a, b) => {
        if (b.isFavorite !== a.isFavorite) {
        return b.isFavorite - a.isFavorite;
        }
        return a.name.localeCompare(b.name);
    });

    ol.innerHTML = ''; // clear the list
    // show the contacts on the screen
    contacts.forEach(contact => {
        createContactElement(contact);
    }); 
    
}

// sort and show the list on the screen
renderContacts() 

// a function that creates the list
function createContactElement(contact){
    const li = document.createElement('li') // create a new li (a row for each contact in the list)
    const namePhone = document.createElement('strong') // create an element for the contact name and phone
    namePhone.textContent=`${contact.name} - ${contact.phone} `

    // add hover when mouseover
    li.addEventListener('mouseover', () => {
        li.classList.add('hoverEffect');
    });
    // remove the hover when mouseout
    li.addEventListener('mouseout', () => {
        li.classList.remove('hoverEffect');
    });

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

    const starBtn = document.createElement('button') // create the star button for the favorite contacts
    starBtn.innerHTML = '★';
    starBtn.className = 'starBtn';

    // if the star button is favorite then change it's color
    if (contact.isFavorite) {
        starBtn.classList.add('starFav');
    }
    starBtn.setAttribute('title', "Favorite" )

    // a wrapper for the star button and the name and the phone so the star will be next to the name
    const nameWrapper = document.createElement('div');
    nameWrapper.className = 'nameWrapper';
    nameWrapper.appendChild(starBtn);
    nameWrapper.appendChild(namePhone);


    divIconButtons.append(infoBtn, editBtn, deleteBtn) // adding the buttons to their wrapper
    li.append(nameWrapper, divIconButtons) // adding the name of the contact & the buttons wrapper to the li
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

        // the popup content
        // if the email/address/freeText doesn't exist then don't show them on the popup
        alertText.textContent = `Name: ${contact.name}\n Phone: ${contact.phone}`
        if(contact.email!=null && contact.email!='')
            alertText.textContent+=`\n Email: ${contact.email} `
        if(contact.address!=null && contact.address!='')
            alertText.textContent+=`\n Address:  ${contact.address}`
        if(contact.freeText!=null && contact.freeText!='')
            alertText.textContent+=`\n Free text: ${contact.freeText}`

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

    // edit contact
    editBtn.addEventListener('click', () => {
        alertTitle.textContent = 'Edit Contact'; 
        alertTitle.style.display = 'block';

        // creating the input elements
        const createLabeledInput = (labelText, value) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'inputGroup'; // input wrapper

            const label = document.createElement('label');

            // if it's an address or a free text or an email then don't add the class required
            if(labelText==='Address' || labelText==='Free text' || labelText==='Email')
                label.innerHTML = labelText; // creating a lbel text input for the address/ the free text
            else
                label.innerHTML = `${labelText} <span class="required">*</span>`; // creating a lbel text input

            const input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            input.classList.add('editInput'); // creating the input field

            const error = document.createElement('div');
            error.className = 'errorMessage'; // creating the reeor message

            // creating and returning a wrapper with the label, input and the error message
            wrapper.append(label, input, error);
            return { wrapper, input, error }; 
        };

        const nameField = createLabeledInput('Name', contact.name); // creating the name input
        const phoneField = createLabeledInput('Phone', contact.phone); // creating the phone input
        const emailField = createLabeledInput('Email', contact.email); // creating the email input
        const addressField = createLabeledInput('Address', contact.address); // creating the address input
        const freeTextField = createLabeledInput('Free text', contact.freeText); // creating the free text input

        const formWrapper = document.createElement('div'); // creating a wrapper for the form
        formWrapper.classList.add('editFormWrapper');
        formWrapper.append(nameField.wrapper, phoneField.wrapper, emailField.wrapper,addressField.wrapper, freeTextField.wrapper); // adding all the inputs to the form wrapper

        // creating the save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('confirmDeleteBtn');

        // creating the cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancelDeleteBtn');

        // creating a wrapper to all buttons
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('modalButtons');
        buttonWrapper.append(cancelBtn, saveBtn);

        alertText.innerHTML = ''; // starting the text with an empty text
        alertText.append(formWrapper, buttonWrapper); // add the form and the buttons to the wrapper (alert popup)

        modal.classList.remove('hidden');
        document.body.classList.add('modalOpen'); // open the edit popup

        // cancel button
        cancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.classList.remove('modalOpen'); // close the popup
        });

        // save button
        saveBtn.addEventListener('click', () => {
            // starting all the error messages with an empty text
            nameField.error.textContent = '';
            phoneField.error.textContent = '';

            // saving all the input values in a variables (without spaces at the begining and at the end)
            const name = nameField.input.value.trim();
            const phone = phoneField.input.value.trim();
            const email = emailField.input.value.trim();
            const address = addressField.input.value.trim();
            const freeText = freeTextField.input.value.trim();

            let hasError = false; // the flag that checks if there is an error

            //a function that gets the name and returns true if it's valid name and false if not
            function isNameValid(name) {
                // if the user did not write anything
                if (name==null || name.length==0) {
                    nameField.error.textContent = 'Name is required!';
                    return false;
                }
                for (let i = 0; i < name.length; i++) {
                    const ch = name[i];
                    const isLetter = (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
                    const isSpace = ch === ' ';
                    if (!isLetter && !isSpace) {
                        nameField.error.textContent = 'Name must contain English letters only!';
                        return false;
                    }
                }
                return true;
            }

            // a function that gets a phone number and returns true if it's valid number and false if not
            function isPhoneValid(phone) {
                // if the user did not write anything
                if (phone==null || phone.length==0) {
                    phoneField.error.textContent = 'Phone is required!';
                    return false;
                }
                if (phone.length < 9 || phone.length > 10) {
                    phoneField.error.textContent = 'Phone must be 9–10 digits!';
                    return false;
                }
                for (let i = 0; i < phone.length; i++) {
                    if (phone[i] < '0' || phone[i] > '9') {
                        phoneField.error.textContent = 'Phone must contain digits only!';
                        return false;
                    }
                }
                return true;
            }

            // a function that gets an email and returns true if the email is valid and false if not
            function isEmailValid(email) {
                // if the user did not write anything
                if (email==null || email.length==0) {
                    return true; // it's not required
                }
                if (!email.includes('@')) {
                    emailField.error.textContent = 'Invalid email format';
                    return false;
                }
                const parts = email.split('@');
                if (parts.length !== 2 || !parts[1].includes('.')) {
                    emailField.error.textContent = 'Invalid email format';
                    return false;
                }
                return true;
            }

            // if the name or the phone or the email is not valid then we don't change the name
            if (!isNameValid(name) || !isPhoneValid(phone)|| !isEmailValid(email)) return;

            // save the current name to check if the user types another name that are already exists
            const currentName = contact.name;
            const currentPhone= contact.phone;

            // a function that removes all spaces from the name it gets
            function noSpace(name) {
                return name.replace(' ', '').toLowerCase();
            }


            //check if the name already exists (not including the current one)
            contacts.forEach(contact =>{
                // if you found a contact with the same name change the error message and the flag (hasError) to true
                // (this works only if the name is for another contact and not the current one)
                if(noSpace(contact.name)!= noSpace(currentName) &&
                noSpace(contact.name) === noSpace(name))
                {
                    nameField.error.textContent='Contact with the same name already exists!'
                    hasError=true;
                }

                // if you found a contact (other than the current one) with the same phone
                // then change the flag (hasError) to true and change the reeor message
                if(contact.phone!=currentPhone && contact.phone === phone)
                {
                    phoneField.error.textContent='Contact with the same phone already exists!'
                    hasError=true;
                }
                    
            })

            if(hasError) return; // if the name alresdy exists do not add the contact to the array

            // edit the contact information
            contact.name = name;
            contact.phone = phone;
            contact.email = email;
            contact.address= address;
            contact.freeText = freeText;
            contact.isFavorite = contact.isFavorite;

            modal.classList.add('hidden');
            document.body.classList.remove('modalOpen');

            renderContacts(); // sort the list and show it again at the screen
        
        });
    
    });

    // star button click event (favorite contact)
    starBtn.addEventListener('click', () => {
        // switch the favorite attribute (true chnages to false and false changes to true)
        contact.isFavorite = !contact.isFavorite; 
            if (contact.isFavorite) {
                starBtn.classList.add('starFav'); // change the color to gold
            } 
            else {
                starBtn.classList.remove('starFav'); // return the color to the regular style
            }

        renderContacts(); // sort the list and show it again at the screen
    });

}








