class UserController {

    constructor (formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();

    }

    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]")

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;
            console.log('Value of dataset.trIndex', index)


            let tr = this.tableEl.rows[index];
            console.log('Value of TR::', tr)

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            this.getPhoto(this.formUpdateEl).then(
                (content) => {

                    if (!values.photo){ 
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;
                    }
                    let user = new User();

                    user.loadFromJSON(result);

                    user.save();

                    tr = this.getTr(user, tr)

                    this.updateCount();

                    this.formUpdateEl.reset();
            
                    this.showPanelCreate();

                    btn.disabled = false;

                }, 
                (e) => {
                    console.error(e)
                }
            );

        });

    }//end method onEdit()

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

                    values.save();

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;

                }, 
                (e) => {
                    console.error(e)
                }
            );
        
        });

    }//end method onSubmit()

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

    }//end method getPhoto()

    getValues(formEl){

        console.log('getValues analizing form')
        if(formEl === this.formEl){
            console.log('form: create');
        }
        else if(formEl === this.formUpdateEl){
            console.log('form: update')
        }


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
        console.log('Values get from getValues')
            console.log(user)
            console.log('form: object')
            console.log(formEl)
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

    }//end method getValues()

    getusersStorage () {

        let users = [];

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users

    }//end method getUsersStorage()

    selectAll() {
       
        let users = User.getusersStorage();
        
        users.forEach(dataUser => {

            let user = new User();

            user.loadFromJSON(dataUser);
        
            this.addLine(user);

        })

    }//end method selectAll()
    
    getTr(dataUser, tr = null){

        if(tr === null)tr = document.createElement('tr')
    tr.dataset.user = JSON.stringify(dataUser);        
        tr.innerHTML = `
            
                <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                </td>
            
        `;
        this.addEventsTr(tr);
        return tr;

    }//end method getTr()

    addLine(dataUser) {

        let tr = this.getTr(dataUser)

        this.tableEl.appendChild(tr);

        this.updateCount();

    }//end method addLine()

    addEventsTr(tr) {

        tr.querySelector(".btn-delete").addEventListener("click", (e) => {

            if(confirm("Deseja relamente excluir?")) {
                
                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user))
                user.remove()
                tr.remove();

                this.updateCount();

            }

        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {

                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;
                            
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                        break;

                        case 'checkbox':
                            field.checked = json[name];
                        break;

                        default:
                            field.value = json[name];

                    }

                    field.value = json[name];
                }

            }

            this.formUpdateEl.querySelector(".photo").src = json._photo
            
            this.showPanelUpdate();

        });

    }//end method addEventsTr()

    showPanelCreate(){

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }//end method showPanelCreate()

    showPanelUpdate(){

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }//end method showPanelUpdate()

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;
        })

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }//end method updateCount()
}