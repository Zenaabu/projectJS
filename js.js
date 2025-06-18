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


const ol=document.getElementById('contacts')
contacts.forEach(contact => {
    const li = document.createElement('li')
    const strong = document.createElement('strong')
    strong.textContent=contact.name

    const divIconButtons = document.createElement('div')
    divIconButtons.className="iconButtons"

    const iInfo=document.createElement('i')
    iInfo.className="fas fa-circle-info"

    const iEdit=document.createElement('i')
    iEdit.className="fas fa-pen"

    const iDelete=document.createElement('i')
    iDelete.className="fas fa-trash"

    const infoBtn = document.createElement('button')
    infoBtn.setAttribute('title', "Info")
    infoBtn.append(iInfo)

    const editBtn = document.createElement('button')
    editBtn.setAttribute('title', "Edit")
    editBtn.append(iEdit)

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('title', "Delete")
    deleteBtn.append(iDelete)

    divIconButtons.append(infoBtn, editBtn, deleteBtn)
    li.append(strong, divIconButtons)
    ol.append(li)
    

    const modal = document.createElement('div');
    modal.className = 'modal hidden';

    const modalContent = document.createElement('div');
    modalContent.className = 'modalContent';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';

    const alertText = document.createElement('p');
    alertText.id = 'alertText';

    modalContent.append(closeBtn, alertText);
    modal.append(modalContent);
    document.body.append(modal);

    const alertTitle = document.createElement('h2');
    alertTitle.textContent = 'Contact Info';
    alertTitle.className = 'modalTitle';

    modalContent.insertBefore(alertTitle, alertText); 



    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modalOpen');

    });

    infoBtn.addEventListener('click', () =>{
        alertText.textContent = `Name: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`;
        modal.classList.remove('hidden');
        document.body.classList.add('modalOpen');

    })

});