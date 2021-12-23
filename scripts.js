window.addEventListener('load', function(){

     class User {
        constructor(data) {
            this.data = {
                id: data.id || 0,
                name: data.name || null,
                email: data.email || null,
                address: data.address || null,
                phone: data.phone || null
            };
        }

        edit(newData) {
           for(let key in newData) if (this.data[key] && newData[key]) this.data[key] = newData[key];
        // this.data = Object.assign(this.data, newData);
        }

        get() {
            return this.data;
        }
    }

    class Contacts {
        constructor() {
            this.data = [];
        }

        add(data) {
            if(!data.name) return;

            let id = 0;

            this.data.forEach((contact) => {
                if(contact.data.id > id) id = contact.data.id;
            });

            id++;
            data.id = id;

            const contact = new User(data);
            this.data.push(contact);
        }

        edit(id, newData) {
            if(!id) return;
            // if(!newData.name) return;

            const contact = this.data.find(contact => {
                return contact.data.id == id;
            });

            contact.edit(newData);
        }

        remove(id) {
            // if(!id) return;

            // let index = null;

            // this.data.forEach((contact, contactIndex) => {
            //     if (contact.data.id == id) index = contactIndex;
            // });

            // if (index === null) return;

            // this.data.splice(index, 1);

            this.data = this.data.filter(contact => {
                return contact.data.id != id;
            });
        }

        get() {
            return this.data; 
        }
    }

    class ContactsUI extends Contacts {
        constructor() {
            super();
            this.init();
        }

        init() {
            const contactsElem = document.createElement('div'); 
            contactsElem.classList.add('contacts');

            const formElem = document.createElement('div');
            formElem.classList.add('contacts__form');

            this.inputElemName = document.createElement('input');
            this.inputElemName.setAttribute('type', 'text');
            this.inputElemName.setAttribute('name', 'name');
            this.inputElemName.setAttribute('placeholder', 'Name');

            this.inputElemEmail = document.createElement('input');
            this.inputElemEmail.setAttribute('type', 'text');
            this.inputElemEmail.setAttribute('name', 'email');
            this.inputElemEmail.setAttribute('placeholder', 'Email');

            this.inputElemAddress = document.createElement('input');
            this.inputElemAddress.setAttribute('type', 'text');
            this.inputElemAddress.setAttribute('name', 'address');
            this.inputElemAddress.setAttribute('placeholder', 'Address');

            this.inputElemPhone = document.createElement('input');
            this.inputElemPhone.setAttribute('type', 'text');
            this.inputElemPhone.setAttribute('name', 'phone');
            this.inputElemPhone.setAttribute('placeholder', 'Phone');

            this.listElem = document.createElement('ul');
            this.listElem.classList.add('contacts__list');

            const btnAdd = document.createElement('button');
            btnAdd.innerHTML = 'Save contact';

            // const btnEdit = document.createElement('button');
            // btnEdit.innerHTML = 'Edit';

            formElem.append(this.inputElemName, this.inputElemEmail, this.inputElemAddress, this.inputElemPhone, btnAdd);
            contactsElem.append(formElem, this.listElem);
            document.body.append(contactsElem);
          
         btnAdd.addEventListener('click', event => {
                this.onAdd(event);
            });
        }
      
      updateList(){
            this.listElem.innerHTML = '';
        
            const data = this.get();

            data.forEach(contact => {
                const li = document.createElement('li');
                li.classList.add('contact');

                const h3 = document.createElement('h3');
                h3.classList.add('contact__name');
                h3.innerHTML = 'Name: ';
                const h3_span = document.createElement('span');

                const contactEmail = document.createElement('div');
                contactEmail.classList.add('contact__email');
                contactEmail.innerHTML = 'Email: ';
                const email_span = document.createElement('span');

                const contactAddress = document.createElement('div');
                contactAddress.classList.add('contact__address');
                contactAddress.innerHTML = 'Address: ';
                const address_span = document.createElement('span');

                const contactPhone = document.createElement('div');
                contactPhone.classList.add('contact__phone');
                contactPhone.innerHTML = 'Phone: ';
                const phone_span = document.createElement('span');
              
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('contact__remove');
                removeBtn.innerHTML = '+';
              
              
                if (contact.data.name) h3_span.innerHTML = contact.data.name;
                if (contact.data.email) email_span.innerHTML = contact.data.email;
                if (contact.data.address) address_span.innerHTML = contact.data.address;
                if (contact.data.phone) phone_span.innerHTML = contact.data.phone;
                
                li.append(h3, contactEmail, contactAddress, contactPhone, removeBtn);
                h3.append(h3_span);
                contactEmail.append(email_span);
                contactAddress.append(address_span);
                contactPhone.append(phone_span);
                this.listElem.append(li);
              
                removeBtn.addEventListener('click', event => {
                  this.onRemove(event, contact.data.id);
                });

                h3_span.addEventListener('dblclick', event => {
                    event.target.setAttribute('contenteditable', true);
                    event.target.focus();
                });

                h3_span.addEventListener('keyup', event => {
                    this.onSave(event, contact.data.id, 'name');
                });

                email_span.addEventListener('dblclick', event => {
                    event.target.setAttribute('contenteditable', true);
                    event.target.focus();
                });

                email_span.addEventListener('keyup', event => {
                    this.onSave(event, contact.data.id, 'email');
                });

                address_span.addEventListener('dblclick', event => {
                    event.target.setAttribute('contenteditable', true);
                    event.target.focus();
                });

                address_span.addEventListener('keyup', event => {
                    this.onSave(event, contact.data.id, 'address');
                });

                phone_span.addEventListener('dblclick', event => {
                    event.target.setAttribute('contenteditable', true);
                    event.target.focus();
                });

                phone_span.addEventListener('keyup', event => {
                    this.onSave(event, contact.data.id, 'phone');
                });
            });
        }

        onAdd(event){
            const inputElemName = this.inputElemName.value;
            const inputElemEmail = this.inputElemEmail.value;
            const inputElemAddress = this.inputElemAddress.value;
            const inputElemPhone = this.inputElemPhone.value;

            const data = {
                name: inputElemName || null,
                email: inputElemEmail || null,
                address: inputElemAddress || null,
                phone: inputElemPhone || null,
            };
          
            this.inputElemName.value = '';
            this.inputElemEmail.value = '';
            this.inputElemAddress.value = '';
            this.inputElemPhone.value = '';

            this.add(data);
            
            this.updateList();
        }

        onSave(event, id, key) {
            if (event.code != 'Enter' || !event.ctrlKey) return;
          
            const data = {};
            data[key] = event.target.textContent;

            this.edit(id, data);
            this.updateList();

            event.target.setAttribute('contenteditable', false);
        }
      
        onRemove(event, id) {
          this.remove(id);
          this.updateList();
        }
    }

    new ContactsUI();

});