export class CameraController{


    constructor(videoEl){
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{

            this._stream = stream;

            this._videoEl.srcObject = stream;
            this._videoEl.play();
        })
    }

    stop(){

        this._stream.getTracks().forEach(track => {
                track.stop();
        })

    }

    takePicture(mimeType = 'image/type'){
        
        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl);
        canvas.setAttribute('width', this._videoEl);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }
}

