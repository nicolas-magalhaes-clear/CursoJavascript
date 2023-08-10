class DropBoxController{


    constructor(){


        this.inputFilesEl = document.querySelector('#files');
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.initEvents();
    }


    initEvents(){


        this.btnSendFileEl.addEventListener('click', event =>{

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event => {
            
            console.log(event.target.file);

            this.snackModalEl.style.display = 'block';
        })
    }
}