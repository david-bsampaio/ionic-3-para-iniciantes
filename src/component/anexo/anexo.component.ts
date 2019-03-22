import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'usi-anexo',
    templateUrl: 'anexo.component.html'
})
export class AnexoComponent {

    @Input() camera: boolean = true; // Indicador se pode tirar foto (default true)

    @Input() biblioteca: boolean = true; // Indicador se pode escolher arquivo (default true)

    @Input() extensions: string; // String com a lista de extensoes permitidas

    @Input() limite: number; // Limite de arquivos

    @ViewChild('fileInput') fileInput: ElementRef;

    @Output() filesEvent = new EventEmitter<any>(); // Emitir evento

    files: { file: File, preview: any }[] = new Array; // Lista de arquivos

    slidesPerView: number; // Número de arquivos exibidos no slide
    showPager: boolean = false; // Indicador se exibe os pontinhos de paginação

    constructor(private _platform: Platform, private _alertCtrl: AlertController, private _camera: Camera) {

        if (this._platform.width() > 1200) this.slidesPerView = 5;
        else if (this._platform.width() > 768) this.slidesPerView = 4;
        else if (this._platform.width() > 400) this.slidesPerView = 2;
        else this.slidesPerView = 1;

    }

    isMobile(): boolean {
        return this._platform.is('mobile');
    }

    abrirCamera() {

        const options: CameraOptions = {
            quality: 100,
            destinationType: this._camera.DestinationType.FILE_URI,
            encodingType: this._camera.EncodingType.JPEG,
            mediaType: this._camera.MediaType.PICTURE
        }

        this._camera.getPicture(options).then((imageFileUri) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //let base64Image = 'data:image/jpeg;base64,' + imageData;

            console.log(imageFileUri);

            window['resolveLocalFileSystemURL'](imageFileUri,
                entry => {
                    entry['file'](file => this.readFile(file));
                });

        }, (err) => {
            // Handle error
            console.log("ERRO", err);
            let alertPopup = this._alertCtrl.create({
                title: 'ERRO',
                message: err,
                buttons: ['OK']
            });

            alertPopup.present();
        });

    }

    private readFile(file: any) {
        const reader = new FileReader();
        reader.onloadend = () => {

            console.log(file);

            const imgBlob = new Blob([reader.result], { type: file.type });

            let fileToUpload = new File([imgBlob], "IMG_" + Date.now() + ".jpeg", { type: "octet/stream" });

            this.files.push({ file: fileToUpload, preview: "/assets/imgs/logo.png" });

        };
        reader.readAsArrayBuffer(file);
    }

    next(slideFiles: any) {
        slideFiles.slideNext(500);
    }

    prev(slideFiles: any) {
        slideFiles.slidePrev(500);
    }

    /**
     * Inclusão de arquivo(s) na lista
     * @param $event 
     */
    changeListener($event): void {

        for (let file of $event.target.files) {

            if (this.limite && this.limite == this.files.length) {

                let alertPopup = this._alertCtrl.create({
                    title: 'AVISO',
                    message: `O limite de anexos é de ${this.limite} arquivos.`,
                    buttons: ['OK'],
                    cssClass: "my-custom-alert my-alert-alerta"
                });

                alertPopup.present();

                break;
            }

            let index = this.files.push({ file: file, preview: "/assets/imgs/logo.png" }) - 1;

            if (file.name.indexOf(".png") > 0 || file.name.indexOf(".jpg") > 0 || file.name.indexOf(".jpeg") > 0) {

                let reader = new FileReader();
                reader.onload = (_event) => {
                    this.files[index].preview = reader.result;
                }
                reader.readAsDataURL(file);

            }
            else if (file.name.indexOf(".pdf") > 0) this.files[index].preview = "/assets/imgs/download.png";

        }

        this.filesEvent.emit(this.files);

        this.showPager = true;

    }

    /**
     * Remove arquivo da lista.
     * @param index Index no array
     */
    remover(index: number) {

        this.files.splice(index, 1);

        this.filesEvent.emit(this.files);

        if (this.files.length == 0) this.showPager = false;

    }

}