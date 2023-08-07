class UserController {

    constructor (formId, tableId, formIdUpdate){

        this.formEl = document.getElementById(formId);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit()
        this.onEdit();

    }

    onEdit(){
        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', (e)=>{
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener('submit', (e) =>{
            e.preventDefault();

            let btn = this.formUpdateEl.querySelector('[type=submit]');
            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index]
            tr.dataset.user = JSON.stringify(values);

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            
            tr.dataset.user = JSON.stringify(result);

            
            btn.disabled = false;

            this.showPanelCreate();
            
            this.getPhoto(this.formUpdateEl).then(
                (content) => {
                    if(!values.photo){
                        result._photo = userOld._photo;   
                    }
                    else{
                        result._photo = content;
                    }

                    tr.dataset.user = json.stringify(result)
                    
                    tr.innerHTML = `
                        <tr>
                            <td><img src=${values._photo} class="img-circle img-sm"></td>
                            <td>${values._name}</td>
                            <td>${values._email}</td>
                            <td>${(values._admin) ? 'Sim' : 'Não'}</td>
                            <td>${Utils.dateFormat(values._register)}</td>
                            <td>
                                <button type="button" class="btn btn-edit btn-primary btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                            </td>
                        </tr>
                        `;
                    this.addEventsTr(tr)
                    this.updateCount();        

                    this.formUpdateEl.reset();

                    btn.disabled = false;

                }, 
                (e) => {
                    console.error(e)
                }
            );
        })
    }

    addEventsTr(tr){
        tr.querySelector('.btn-edit').addEventListener('click', e=>{
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector('#form-user-update');

            this.formUpdateEl.trIndex = tr.sectionRowIndex;
            for(let name in json){
                let field = form.querySelector('[name='+ name.replace('_', '') + ']')
                
                if(field){

                    switch(field.type){
                        case 'file':
                            continue;
                            break;
                        
                        case 'radio':
                            field = form.querySelector('[name='+ name.replace('_', '') + ']' + '[value=' + json[name] + ']')
                            field.checked = true;
                            break
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                    }
                }
                
            }

            this.formUpdateEl.querySelector('.photo').src = json._photo;
            this.showPanelUpdate();
        })
    }
    onSubmit(){

        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if (!values) return false;

            this.getPhoto(this.formEl).then(
                (content) => {

                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;

                }, 
                (e) => {
                    console.error(e)
                }
            );
        
        });

    }

    getPhoto(formEl){

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => {

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {

                reject(e);

            };

            if(file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }

        });

    }

    getValues(formEl){

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(field, index){

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false

            }

            if (field.name === "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value
                }
    
            } else if(field.name == "admin") {

                user[field.name] = field.checked;

            } else {
    
                user[field.name] = field.value
    
            }
    
        });

        if (!isValid) {
            return false;
        }
    
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }
    
    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <tr>
                <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-edit btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;

        this.addEventsTr(tr);
        this.tableEl.appendChild(tr);

        this.updateCount()

    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;
        })

        document.querySelector("#numberUsers").innerHTML = numberUsers;
        document.querySelector("#numberUsers-Admin").innerHTML = numberAdmin;

    }

    showPanelCreate(){
        document.querySelector('#box-user-create').style.display = 'block';
        document.querySelector('#box-user-update').style.display = 'none';
    }
    showPanelUpdate(){
        document.querySelector('#box-user-create').style.display = 'none';
        document.querySelector('#box-user-update').style.display = 'block';
    }
}