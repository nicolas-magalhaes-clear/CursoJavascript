export class MicrophoneController{


    constructor(){
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{

            this._stream = stream;

            let audio = new Audio();
            audio.srcObject = stream
            audio.play()  
        })
    }

}