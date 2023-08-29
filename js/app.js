
const contactsForm = document.querySelector('#contact'),
      contactList = document.querySelector('#contact-list tbody'),
      inputSearch = document.querySelector('#search');


eventListeners();

function eventListeners(){

    // When form (add/edit) is executing
    contactsForm.addEventListener('submit', readForm);

    // Listener to delete Btn
    if(contactList){
        contactList.addEventListener('click', deleteContact);
    }

    // Listener input Search
    inputSearch.addEventListener('input', searchContact);
}

function readForm(e){
    e.preventDefault();
    
    // Read inputs
    
    const name = document.querySelector('#name').value,
          company = document.querySelector('#company').value,
          phone = document.querySelector('#phone').value,
          action = document.querySelector('#action').value;


    if(name === '' || company === '' || phone === ''){

        // Message and class
        showNotificacion('All fields are required', 'error');
    }else{

        // Create call to Ajax
        const contactInfo = new FormData();
        contactInfo.append('name', name); 
        contactInfo.append('company', company); 
        contactInfo.append('phone', phone);
        contactInfo.append('action', action);
        
        if(action == 'create'){
            // Create new cmontact

            insertBD(contactInfo)
        }else{
            // Edit contact
            // Read Id
            const idContact = document.querySelector('#id').value;
            contactInfo.append('id', idContact);
            updateContact(contactInfo);
        }
    }
}

// Insert on DB AJAX
function insertBD(datos){

    // call ajax

    // create object
    const xhr = new XMLHttpRequest();


    // open conection
    xhr.open('POST', 'includes/functions/create-contact.php', true);

    // pass data
    xhr.onload = function(){
        if(this.status === 200){

            // read answer from PHP
            const answer = JSON.parse(xhr.responseText);

            // Insert new element on table
            const newContact = document.createElement('tr');

            newContact.innerHTML = `

                <td>${answer.data.name}</td>
                <td>${answer.data.company}</td>
                <td>${answer.data.phone}</td>
            
            `;

            // Create container for btns
            const actionContainer = document.createElement('td');

            // Create edit icon
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-pen-square');

            // Create a
            const editBtn = document.createElement('a');
            editBtn.classList.add('btn', 'btn-edit')
            editBtn.appendChild(editIcon);
            editBtn.href = `edit.php?id=${answer.data.id_inserted}`;

            // Create delete icon
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash-alt');

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.appendChild(deleteIcon);
            deleteBtn.setAttribute('data-id', answer.data.id_inserted);
            deleteBtn.classList.add('btn', 'btn-delete');

            // Add to father
            actionContainer.appendChild(editBtn);
            actionContainer.appendChild(deleteBtn);

            // Add to Tr
            newContact.appendChild(actionContainer);

            // Add to table
            contactList.appendChild(newContact);

            // Form Reset
            document.querySelector('form').reset();

            // Show notification
            showNotificacion('Contact created successfully', 'success');

            numberSearch();

        }
    }

    // send data
    xhr.send(datos);
}

function updateContact(data){
    
    // Call ajax
    // Create object
    const xhr = new XMLHttpRequest();

    // Open conection
    xhr.open('POST', 'includes/functions/edit-contact.php', true);

    // Read
    xhr.onload = function(){
        if(this.status === 200){
            const result = JSON.parse(xhr.responseText);

            if(result.answer === 'success'){
                showNotificacion('Contact edited successfully', 'success');
            }else{
                showNotificacion('There was an error', 'error')
            }

            setTimeout(()=>{
                window.location.href = 'index.php';
            }, 2000);
        }
    }

    // Send
    xhr.send(data);
}


// Delete Contact

function deleteContact(e){
    
    if(e.target.parentElement.classList.contains('btn-delete')){
        // Get Id
        const id = e.target.parentElement.getAttribute('data-id');
        
        // Ask
        const answer = confirm('Are you sure?');

        if(answer){

            // Call Ajax
            // Create object
            const xhr = new XMLHttpRequest();

            // Open conection
            xhr.open('GET', `includes/functions/delete-contact.php?id=${id}&action=delete`, true)

            // Read answer
            xhr.onload = function() {
                if(this.status === 200){
                    const result = JSON.parse(xhr.responseText);

                    console.log(result);

                    if(result.answer === 'succesfully'){
                        // Delete contact from DOM

                        e.target.parentElement.parentElement.parentElement.remove(); 

                        // Show notificacion
                        showNotificacion('Contact deleted', 'success')
                    } else{
                        // Show notification
                        showNotificacion('There was an error', 'error')
                    }
                }

                numberSearch();

            }

            // Send
            xhr.send();
        }
    }
}


// Notificacion 

function showNotificacion(message, classs){
    
    const notificacion = document.createElement('div');
    notificacion.classList.add(classs, 'notificacion', 'shadow');
    notificacion.textContent = message;


    // Form

    contactsForm.insertBefore(notificacion, document.querySelector('form legend')); 

    // Hide and show notificacion

    setTimeout(()=>{
        notificacion.classList.add('show');

            setTimeout(()=>{
                notificacion.classList.remove('show');
                notificacion.remove();
            }, 3000)
    }, 100)
}

// Search Contact

function searchContact(e){
    const expresion = new RegExp(e.target.value, "i" );
          registers = document.querySelectorAll('tbody tr');

          registers.forEach(register => {
               register.style.display = 'none';

               if(register.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
                    register.style.display = 'table-row';
               }
          numberSearch();

          })
}

// Number search contacts

function numberSearch(){
    const totalContacts = document.querySelectorAll('tbody tr'),
          numberContainer = document.querySelector('.total-contacts span');

     let total = 0;

     totalContacts.forEach(contact => {
          if(contact.style.display === '' || contact.style.display === 'table-row'){
               total++;
          }
     });
     
     numberContainer.textContent = total;
}