class User {

    constructor (name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    //Defining getters and setters
    get id(){
        return this._id;
    }
    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    set photo(value) {
        this._photo = value;
    }

    //End getters and setters
    loadFromJSON(json) {

        for (let name in json) {

            switch(name) {
                case '_register':
                    this[name] = new Date(json[name])
                break;
                default:
                    this[name] = json[name];

            }


        }

    }//end method loadFromJson

    static getusersStorage () {

        let users = [];

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users

    }//end method getUsersStorage()


    getNewId(){

        let usersID = parseInt(localStorage.getItem('usersID'))

        if(!usersID) usersID = 0;
        usersID++;

        localStorage.setItem('usersID', usersID)
        return usersID;

    }//end method getNewId()
    save(){
        let users = User.getusersStorage();

        if(this.id > 0){

            users.map(u=>{
                
                if(u._id == this.id){
                
                    Object.assign(u, this);

                }
                return u;
            })
            
        }
        else{
            
            this._id = this.getNewId();
            
            users.push(this)
            
        }

        localStorage.setItem("users", JSON.stringify(users));
        

        
    }//enc method save()
    remove(){
        let users = User.getusersStorage();

        users.forEach((userData, index) => {
            
            if(this._id == userData._id){
                
                users.splice(index, 1);

            }
        });

        localStorage.setItem("users", JSON.stringify(users));
    }//end method remove()

}