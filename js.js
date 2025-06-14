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
    let li = document.createElement('li')
    li.innerHTML=
   `Name: ${contact.name}<br></br> Phone:  ${contact.phone}<br></br> Email: ${contact.email}<br></br>
   <div class="iconButtons">
      <button title="Info"><i class="fas fa-circle-info"></i></button>
      <button title="Edit"><i class="fas fa-pen"></i></button>
      <button title="Delete"><i class="fas fa-trash"></i></button>
    </div>`
    console.log(li)
    ol.append(li)
});