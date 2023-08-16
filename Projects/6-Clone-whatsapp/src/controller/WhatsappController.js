import {Format} from './../utils/format'
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController';
export class WhatsappController{


    constructor(){

        this.loadElements();
        this.elementsPrototype()
        this.initEvents()
        
    }

    /*
    --------------------------
    PROTOTYPES DECLARATIONS AREA
    --------------------------
    */
    elementsPrototype(){
       Element.prototype.hide = function(){
            this.style.display = 'none'
            return this;
        }

       Element.prototype.show = function(){
        this.style.display = 'block'
        return this;
       }

       Element.prototype.toggle = function(){
        this.style.display = (this.style.display === 'none') ? 'block' : 'none';
        return this;
       }

       Element.prototype.on = function(events, fn){
        events.split(' ').forEach(event => {

            this.addEventListener(event, fn);
        });
        return this;
       }
       Element.prototype.addClass = function(name){
        this.classList.add(name);
        return this
       }
       Element.prototype.removeClass = function(name){
        this.classList.remove(name)
        return this
       }
       Element.prototype.toggleClass = function(name){
        this.classList.toggle(name);
        return this
       }
       Element.prototype.hasClass = function (name){
        return this.classList.contains(name)
       }

       Element.prototype.css = function(styles){

        for(let name in styles){
            this.style[name] = styles[name]
        }
        return this;
       }
       HTMLFormElement.prototype.getForm = function(){
        return new FormData(this);
       }
       HTMLFormElement.prototype.toJSON = function(){
            let json = {}

            this.getForm().forEach((value,key) => {
                json[key] = value
            })
            return json
       }
    }//end method elementsPrototype

    /*
    --------------------------
    END PROTOTYPES DECLARATIONS AREA
    --------------------------
    */


    /*
    --------------------------
    PANEL CONTROL METHODS AREA
    --------------------------
    */
    closeAllMainPanel(){
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open')
    }//end method closeAllMainPanel
    closeMenuAttach(e){

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
        

    }//end method closeMenuAttach
    closeAllLeftPanel(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }//end method closeAllLeftPanel

    /*
    --------------------------
    END OF PANEL CONTROL METHODS AREA
    --------------------------
    */

    /*
    --------------------------------
    USER INPUTS CONTROL AREA
    --------------------------------
    */

    closeRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval)
    }
    startRecordMicrophoneTime(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{
            
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now()- start))
        }, 100)

    }

    /*
    --------------------------------
    END OF USER INPUTS CONTROL AREA
    --------------------------------
    */



    loadElements(){

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            
            this.el[Format.getCamelCase(element.id)] = element;
            

        })
        
    }//End METHOD loadElements

    initEvents(){
        //---------------------------
        //LEFT MENU AREA
        //---------------------------
        this.el.myPhoto.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');    
            }, 300);
            
            
        })
        this.el.btnNewContact.on('click', e=>{
            
            this.closeAllLeftPanel();
            this.el.panelAddContact.show()
            setTimeout(() => {
                this.el.panelAddContact.addClass('open')    
            }, 300);
            

        })
        this.el.btnClosePanelEditProfile.on('click', e=>{
            this.el.panelEditProfile.removeClass('open')
        });
        this.el.btnClosePanelAddContact.on('click', e=>{
            this.el.panelAddContact.removeClass('open')
        })
        this.el.photoContainerEditProfile.on('click', e=>{
            this.el.inputProfilePhoto.click()
        })
        this.el.inputNamePanelEditProfile.on('keypress', e=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        })
        this.el.btnSavePanelEditProfile.on('click', e=>{
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        })
        this.el.formPanelAddContact.on('submit', e=>{
            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact)


        })
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
            item.on('click', e=>{
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                })
            })
        })
        //------------------------------
        //END LEFT PANEL AREA
        //------------------------------

        //------------------------------
        //ATTACH ITEMS AREA
        //------------------------------
        this.el.btnAttach.on('click', e=>{
            e.stopPropagation();
            this.el.menuAttach.addClass('open');

            document.addEventListener('click', this.closeMenuAttach.bind(this))
        })
            //photo attach area
        this.el.btnAttachPhoto.on('click', e=>{
            this.el.inputPhoto.click();
        })
        this.el.inputPhoto.on('change', e=>{
            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file => {
                
                console.log(file);
            })
        })
            //end photo attach area

            //attach camera area
        this.el.btnAttachCamera.on('click', e=>{
        
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.hide()
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height':'calc(100%)'
            })
            this._camera = new CameraController(this.el.videoCamera);
        })

        this.el.btnClosePanelCamera.on('click', e=>{

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            this._camera.stop();
        })
        this.el.btnTakePicture.on('click', e=>{
            let dataUrl = this._camera.takePicture();
            this.el.pictureCamera.src = dataUrl;
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.containerTakePicture.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerSendPicture.show();


        })

        this.el.btnReshootPanelCamera.on('click', e=>{

            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.containerTakePicture.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerSendPicture.hide();

        })
        this.el.btnSendPicture.on('click', e=>{
            console.log(this.el.pictureCamera.src)


        })
            //end attach camera area
        
            //attach document area
        this.el.btnAttachDocument.on('click', e=>{
            
            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100%)'
            })
            this.el.inputDocument.click();
            
        })
        this.el.inputDocument.on('change', e=>{
            console.log('changed')
            if(this.el.inputDocument.files.length){
                let file = this.el.inputDocument.files[0];

                this._documentPreviewController = new DocumentPreviewController(file);
                this._documentPreviewController.getPreviewData().then(result => {
                    console.log('RESULT')
                    console.log(result)
                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();


                }).catch(err =>{
                    
                    switch(file.type){

                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreasheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls'
                            break

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt'
                            break;
                        
                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc'
                            break

                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic'
                            break
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show()

                })
                
            }
            

        })
        this.el.btnClosePanelDocumentPreview.on('click', e=>{
            this.closeAllMainPanel();
        })
        this.el.btnSendDocument.on('click', e=>{
            console.log('send document');
        })
            //end document attach area

            //contacts attach area
        this.el.btnAttachContact.on('click', e=>{
            this.el.modalContacts.show();
        })
        this.el.btnCloseModalContacts.on('click', e=>{
            this.el.modalContacts.hide()
        })
            //end contacts attach area

        //------------------------------
        //END ATTACH ITEMS AREA
        //------------------------------

        //------------------------------
        //USER INPUTS (MESSAGE, EMOJI, MICROPHONE) AREA
        //------------------------------
        
            //microphone events
        this.el.btnSendMicrophone.on('click', e=>{
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

            this._microphoneController = new MicrophoneController();
        })

        this.el.btnCancelMicrophone.on('click', e=>{
            this.closeRecordMicrophone();
        })

        this.el.btnFinishMicrophone.on('click', e=>{
            this.closeRecordMicrophone();
        })
            //end microphone events

            //message inputs text
        this.el.inputText.on('keyup', e=>{
            if(this.el.inputText.innerHTML && this.el.inputText.innerHTML != '<br>'){
                
                this.el.inputPlaceholder.hide()
                this.el.btnSendMicrophone.hide()
                this.el.btnSend.show();

            }
            else{

                this.el.inputPlaceholder.show()
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
                
            }
        });
        this.el.inputText.on('keypress', e=>{

            if(e.key === 'Enter' && !e.crtlKey){

                e.preventDefault();
                this.el.btnSend.click()
            }

        })
            //end message inputs text

            //send message button
        this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML);

        })
            //end send message button

        this.el.btnEmojis.on('click', e=>{
            this.el.panelEmojis.toggleClass('open');
            this.el.panel
        })

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{

            emoji.on('click', e=>{
                console.log(emoji.dataset.unicode);

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode

                emoji.classList.forEach(name => {
                    img.classList.add(name);
                })

                let cursor = window.getSelection();

                if(!cursor.focusNode.id || !cursor.focusNode.id == 'input-text'){
                    this.el.inputText.focus();
                    let cursor = window.getSelection();
                }

                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag = document.createDocumentFragment();

                frag.appendChild(img);
                range.insertNode(frag);

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'))
            })

        })

        //------------------------------
        //END USER INPUTS (MESSAGE, EMOJI, MICROPHONE) AREA
        //------------------------------
    }//end method initEvents
}
