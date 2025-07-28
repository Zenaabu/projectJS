'use strict';

const addContactBtn = document.getElementById('addContactBtn'); // save the add contact button

// a function that adds a contact when clicking the button
 addContactBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
     modal.className = 'modal'; // creating our modal (popup)

    const modalContent = document.createElement('div');
    modalContent.className = 'modalContent'; // a wrapper for the modal content

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;'; // close button

     const title = document.createElement('h2');
    title.className = 'modalTitle';
    title.textContent = 'Add New Contact'; // adding atitle to the popup

    // a variable function that gets the label text, input type and placeholder
    // it creates an input field with the label text and the type and the placeholder
    // it creates an error message
    // at the end it returns the wrapprt that contains the label, input field and the error message
    // and returns the input itself so we can check if it's correct. and also returns the error message 
    // so we can edit it
    const createLabeledInput = (labelText, inputType, placeholder) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'inputGroup'; // a wrapper for the input fields

        const label = document.createElement('label');
        label.innerHTML = `${labelText} <span class="required">*</span>`; // creating a lbel text input

        const input = document.createElement('input');
        input.type = inputType; // creating the input
        input.placeholder = placeholder; // adding the placeholder
        input.classList.add('editInput'); 

        const error = document.createElement('div');
        error.className = 'errorMessage'; // adding an error message if the user wrote something wrong

        wrapper.append(label, input, error); // adding all the inputs to our wrapper
        return { wrapper, input, error };
    };

    const nameField = createLabeledInput('Name', 'text', 'Full name'); // creating an input field for the name
    const phoneField = createLabeledInput('Phone', 'text', 'Phone number'); // creating an input field for the phone
    const emailField = createLabeledInput('Email', 'email', 'Email address'); // creating an input field for the email

    // creating a wrapper that includes all the input fields we created
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('editFormWrapper');
    formWrapper.append(nameField.wrapper, phoneField.wrapper, emailField.wrapper);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('confirmDeleteBtn'); // creating a save button 

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancelDeleteBtn'); // creating a cancel button

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('modalButtons');
    buttonsWrapper.append(cancelBtn, saveBtn); // create a wrapper for all the buttons

    // adding the buttons, title, formwrapper(with all input fields) and the close button to the popup
    modalContent.append(closeBtn, title, formWrapper, buttonsWrapper);
    modal.append(modalContent);
    document.body.append(modal);
    document.body.classList.add('modalOpen'); // opening the popup

    // a function that closes the popup
    const closeModal = () => {
        modal.remove();
        document.body.classList.remove('modalOpen');
    };

    // if we click the close button ar the cancel button the popup will close too
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // a function that saves the contact information (listener for the save button)
    saveBtn.addEventListener('click', () => {
        // starting all the error messages with an empty string
        nameField.error.textContent = '';
        phoneField.error.textContent = '';
        emailField.error.textContent = '';

        // saving all the input values in a variables (without spaces at the begining and at the end)
        const name = nameField.input.value.trim();
        const phone = phoneField.input.value.trim();
        const email = emailField.input.value.trim();

        let hasError = false; // a variable that checks if there is an invalid input
            
        // a function that gets the name and checks if its correct
        function isNameValid(name) {
            if (name==null || name.length==0)
                {
                    nameField.error.textContent='Name is required!'
                    return false; // if the name is null or empty it returns false
                } 

            // a loop that checks all the letters in the name
            for (let i = 0; i < name.length; i++) {
                const ch = name[i]; // a variable that saves the char in the name

                //check if the char is an english letter
                const isLetter = (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'); 

                // check if the char has is space
                const isSpace = ch === ' ';

                // if the char is not an english letter, and it's not a space
                // return false
                if (!isLetter  && !isSpace) {
                    nameField.error.textContent='Name must contain english letters only!'
                    return false;
                }
            }
            return true; // if we got here then all the chars are valid and so we return true
        }

        // a function that gets a phone number and return true it it's valid and false if not
        function isPhoneValid(phone) {
            if (phone==null|| phone.length==0)
                {
                    phoneField.error.textContent='Phone is required!';
                    return false; // if the phone is null or empty return false
                } 

            //if the length is not 9 nor 10 then return false
            if (phone.length < 9 || phone.length > 10)
                {
                    phoneField.error.textContent='Phone must be 9-10 digits!'
                    return false;
                } 

            // a loop that checks each digit
            for (let i = 0; i < phone.length; i++) {
                if (phone[i] < '0' || phone[i] > '9') 
                {
                    phoneField.error.textContent='Phone must contain digits only!'
                    return false; // if the char is not a number - return false
                }
            }
            return true;
        }

        // a function that gets an email and returns true if it's valid and false if not
        function isEmailValid(email) {
            if (email==null || email.length==0) 
                {
                    emailField.error.textContent='Email is required!'
                    return false; // if the email is null or empty return false
                }
            if (!email.includes('@')) 
                {
                    emailField.error.textContent='Invalid email format'
                    return false; // if the email does not include @ return false
                }

            const parts = email.split('@'); // spliting the email to parts according to the @
            if (parts.length !== 2) 
            {
                emailField.error.textContent='Invalid email format'
                return false; // if there is no 2 parts return false
            }
                
            // if the last part of the email does not contain a . return false
            const last = parts[1]; 
            if (!last.includes('.')) 
                {
                    emailField.error.textContent='Invalid email format'
                    return false; 
                }

            return true; // if we got here then the email is valid - return true
        }

        // if the name is invalid or the phone is invalid or the email is invalid then do not continue to add the
        //contact
        if (!isNameValid(name) || !isPhoneValid(phone) || !isEmailValid(email)) return;

        // a function that removes all spaces from the name it gets
        function noSpace(name) {
            return name.replace(' ', '').toLowerCase();
        }

        //check all the contacts
        contacts.forEach(contact =>{
            // if you found a contact with the same name change the error message and the flag (hasError) to true
            if(noSpace(contact.name.toLowerCase()) === noSpace(name.toLowerCase()))
            {
                nameField.error.textContent='Contact with the same name already exists!'
                hasError=true;
            }
                
        })

        if(hasError) return; // if the name alresdy exists do not add the contact to the array

        //if we still here then the fields are valis and we need to add the contact
        const newContact = { name, phone, email };
        contacts.push(newContact); // adding the contact to the contacts array
        createContactElement(newContact); // adding the contact to the page
        closeModal(); // close the popup
    });
});

